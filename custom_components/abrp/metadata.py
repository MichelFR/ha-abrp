"""Discover ABRP web-app metadata at runtime.

A few values the ABRP API expects (the API key, the app version sent as
``x-abrp-version``, and the app build number sent as the ``version`` field)
are baked into the ABRP web bundle and change over time. Rather than hardcode
them, we scrape the current values from the live web app and cache them, with
last-known-good fallbacks if the site is unreachable or its layout changes.
"""

from __future__ import annotations

import asyncio
import logging
import re
import time
from dataclasses import dataclass

import aiohttp

from .const import (
    ABRP_HOME_URL,
    FALLBACK_API_KEY,
    FALLBACK_APP_BUILD_NUMBER,
    FALLBACK_APP_VERSION,
    METADATA_SCAN_LIMIT_BYTES,
    METADATA_TTL,
    USER_AGENT,
)

_LOGGER = logging.getLogger(__name__)

_BUNDLE_RE = re.compile(r'src="(/_expo/static/js/[^"]+\.js)"')
_API_KEY_RE = re.compile(r"API_KEY:'([0-9a-fA-F-]{16,})'")
_VERSION_RE = re.compile(r'version:"(\d+\.\d+\.\d+)",buildNumber:"(\d+)"')


@dataclass(frozen=True)
class AbrpMetadata:
    """Values the ABRP API expects, discovered from the web app."""

    api_key: str
    app_version: str  # sent as the x-abrp-version header (e.g. "7.1.2")
    app_build_number: str  # sent as the get_session "version" field (e.g. "5875")


FALLBACK_METADATA = AbrpMetadata(
    api_key=FALLBACK_API_KEY,
    app_version=FALLBACK_APP_VERSION,
    app_build_number=FALLBACK_APP_BUILD_NUMBER,
)

_cache: AbrpMetadata | None = None
_cache_time: float = 0.0
_lock = asyncio.Lock()


async def async_get_metadata(
    session: aiohttp.ClientSession, *, force: bool = False
) -> AbrpMetadata:
    """Return ABRP metadata, scraping the web app at most once per TTL."""
    global _cache, _cache_time

    async with _lock:
        fresh = _cache is not None and (time.monotonic() - _cache_time) < (
            METADATA_TTL.total_seconds()
        )
        if _cache is not None and fresh and not force:
            return _cache

        try:
            metadata = await _scrape(session)
        except Exception as err:  # noqa: BLE001 - any failure falls back
            _LOGGER.debug("ABRP metadata scrape failed (%s); using fallback", err)
            metadata = _cache or FALLBACK_METADATA
        else:
            _LOGGER.debug(
                "ABRP metadata: app_version=%s build=%s",
                metadata.app_version,
                metadata.app_build_number,
            )

        _cache = metadata
        _cache_time = time.monotonic()
        return metadata


async def _scrape(session: aiohttp.ClientSession) -> AbrpMetadata:
    """Fetch the web app and extract the metadata values."""
    headers = {"user-agent": USER_AGENT}

    async with session.get(ABRP_HOME_URL, headers=headers) as response:
        response.raise_for_status()
        index_html = await response.text()

    match = _BUNDLE_RE.search(index_html)
    if match is None:
        raise ValueError("could not locate the ABRP web bundle URL")
    bundle_url = ABRP_HOME_URL.rstrip("/") + match.group(1)

    api_key: str | None = None
    version: str | None = None
    build: str | None = None
    scanned = 0
    buffer = ""

    async with session.get(bundle_url, headers=headers) as response:
        response.raise_for_status()
        async for chunk in response.content.iter_chunked(256 * 1024):
            scanned += len(chunk)
            # Keep a small overlap so matches that span chunk boundaries survive.
            buffer = buffer[-512:] + chunk.decode("utf-8", errors="replace")

            if api_key is None and (m := _API_KEY_RE.search(buffer)):
                api_key = m.group(1)
            if version is None and (m := _VERSION_RE.search(buffer)):
                version, build = m.group(1), m.group(2)

            if api_key and version and build:
                break
            if scanned >= METADATA_SCAN_LIMIT_BYTES:
                break

    if not (api_key and version and build):
        raise ValueError("metadata values not found in the web bundle")

    return AbrpMetadata(api_key=api_key, app_version=version, app_build_number=build)
