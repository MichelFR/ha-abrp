"""Discover ABRP web-app metadata at runtime.

A few values the ABRP API expects (the API key, the app version sent as
``x-abrp-version``, and the app build number sent as the ``version`` field)
are baked into the ABRP web bundle and change over time. Rather than hardcode
them, we scrape the current values from the live web app and cache them, with
last-known-good fallbacks if the site is unreachable or its layout changes.

The same bundle also lists the car-brand logos ABRP shows (since 7.1.8) as
content-hashed asset paths; those are scraped separately and less often.
"""

from __future__ import annotations

import asyncio
import logging
import re
import time
import unicodedata
from collections.abc import AsyncIterator
from contextlib import aclosing
from dataclasses import dataclass

import aiohttp

from .const import (
    ABRP_HOME_URL,
    FALLBACK_API_KEY,
    FALLBACK_APP_BUILD_NUMBER,
    FALLBACK_APP_VERSION,
    METADATA_SCAN_LIMIT_BYTES,
    METADATA_TTL,
    OEM_ICON_SCAN_LIMIT_BYTES,
    OEM_ICONS_RETRY,
    OEM_ICONS_TTL,
    USER_AGENT,
)

_LOGGER = logging.getLogger(__name__)

_BUNDLE_RE = re.compile(r'src="(/_expo/static/js/[^"]+\.js)"')
# Bundles reference their lazy-loaded chunks by URL path (the app code moved
# into an ``App-*.js`` chunk when ABRP split its formerly single bundle).
_CHUNK_RE = re.compile(r"/_expo/static/js/[\w./-]+\.js")
_API_KEY_RE = re.compile(r"API_KEY:'([0-9a-fA-F-]{16,})'")
_VERSION_RE = re.compile(r'version:"(\d+\.\d+\.\d+)",buildNumber:"(\d+)"')
# e.g. "/assets/assets/oem-icons/light/tata-motors-light.<hash>.svg"
_OEM_ICON_RE = re.compile(
    r'"(/assets/assets/oem-icons/(light|dark)/([a-z0-9-]+)-(?:light|dark)'
    r'\.[0-9a-f]+\.svg)"'
)

# Hard cap on how many bundles/chunks one scrape will fetch.
_MAX_BUNDLES = 8


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

# brand key (e.g. "tata_motors") -> {"light": url, "dark": url}
OemIcons = dict[str, dict[str, str]]

_icons: OemIcons | None = None
_icons_next_refresh: float = 0.0
_icons_lock = asyncio.Lock()


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


async def async_get_oem_icons(session: aiohttp.ClientSession) -> OemIcons:
    """Return ABRP's car-brand logo URLs, scraping at most once per TTL.

    Never raises: on failure the last known icons (or none) are returned and
    the scrape is retried after a shorter delay.
    """
    global _icons, _icons_next_refresh

    async with _icons_lock:
        if _icons is not None and time.monotonic() < _icons_next_refresh:
            return _icons
        try:
            icons = await _scrape_oem_icons(session)
        except Exception as err:  # noqa: BLE001 - logos are cosmetic
            _LOGGER.debug("ABRP brand logo scrape failed: %s", err)
            _icons = _icons or {}
            _icons_next_refresh = time.monotonic() + OEM_ICONS_RETRY.total_seconds()
        else:
            _LOGGER.debug("ABRP brand logos: %d brands", len(icons))
            _icons = icons
            _icons_next_refresh = time.monotonic() + OEM_ICONS_TTL.total_seconds()
        return _icons


# ABRP's resolveOemIcon: a few names map to a different slug, and a few slugs
# to a differently named logo.
_OEM_NAME_OVERRIDES = {"Mercedes": "mercedes-benz", "Citroën": "Citroen"}
_OEM_KEY_ALIASES = {
    "ego": "e_go",
    "gac": "gac_motor",
    "lucid": "lucid_motors",
    "neta": "neta_auto",
    "sono": "sono_motors",
    "ssangyong": "kgm",
    "tata": "tata_motors",
}


def resolve_oem_icon(
    manufacturer: str | None, icons: OemIcons
) -> dict[str, str] | None:
    """The light/dark logo URLs for a manufacturer name, as ABRP resolves it."""
    if not isinstance(manufacturer, str) or not manufacturer:
        return None
    name = _OEM_NAME_OVERRIDES.get(manufacturer, manufacturer)
    # slugify(): transliterate, "&" -> "and", drop ".()", lowercase, "_" joins.
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    name = re.sub(r"[.()]", "", name.replace("&", " and ")).strip().lower()
    key = re.sub(r"\s+", "_", name).replace("-", "_")
    return icons.get(_OEM_KEY_ALIASES.get(key, key))


async def _iter_bundle_text(
    session: aiohttp.ClientSession, scan_limit: int
) -> AsyncIterator[str]:
    """Yield the web app's script bundles as a stream of text windows.

    The values used to sit in a single web bundle; ABRP has since split the
    app into several script bundles plus lazy-loaded chunks (the app code
    lives in an ``App-*.js`` chunk that only the entry bundle references). So
    we walk every script bundle from the index page and follow chunk URLs
    discovered inside them. Each window keeps a small overlap with the
    previous one so matches spanning a chunk boundary survive.
    """
    headers = {"user-agent": USER_AGENT}

    async with session.get(ABRP_HOME_URL, headers=headers) as response:
        response.raise_for_status()
        index_html = await response.text()

    base_url = ABRP_HOME_URL.rstrip("/")
    queue = [base_url + path for path in _BUNDLE_RE.findall(index_html)]
    if not queue:
        raise ValueError("could not locate any ABRP web bundle URL")
    seen = set(queue)

    while queue:
        bundle_url = queue.pop(0)
        scanned = 0
        buffer = ""
        async with session.get(bundle_url, headers=headers) as response:
            response.raise_for_status()
            async for chunk in response.content.iter_chunked(256 * 1024):
                scanned += len(chunk)
                buffer = buffer[-512:] + chunk.decode("utf-8", errors="replace")
                yield buffer

                for path in _CHUNK_RE.findall(buffer):
                    chunk_url = base_url + path
                    if chunk_url not in seen and len(seen) < _MAX_BUNDLES:
                        seen.add(chunk_url)
                        queue.append(chunk_url)

                if scanned >= scan_limit:
                    break


async def _scrape(session: aiohttp.ClientSession) -> AbrpMetadata:
    """Fetch the web app and extract the metadata values."""
    api_key: str | None = None
    version: str | None = None
    build: str | None = None

    async with aclosing(_iter_bundle_text(session, METADATA_SCAN_LIMIT_BYTES)) as text:
        async for buffer in text:
            if api_key is None and (m := _API_KEY_RE.search(buffer)):
                api_key = m.group(1)
            if version is None and (m := _VERSION_RE.search(buffer)):
                version, build = m.group(1), m.group(2)
            if api_key and version and build:
                return AbrpMetadata(
                    api_key=api_key, app_version=version, app_build_number=build
                )

    raise ValueError("metadata values not found in the web bundles")


async def _scrape_oem_icons(session: aiohttp.ClientSession) -> OemIcons:
    """Fetch the web app and collect the brand logo asset URLs.

    The logos are registered back to back, so the scan stops at the first
    window without any once some have been found.
    """
    base_url = ABRP_HOME_URL.rstrip("/")
    icons: OemIcons = {}

    async with aclosing(_iter_bundle_text(session, OEM_ICON_SCAN_LIMIT_BYTES)) as text:
        async for buffer in text:
            matches = _OEM_ICON_RE.findall(buffer)
            if not matches and icons:
                break
            for path, variant, name in matches:
                icons.setdefault(name.replace("-", "_"), {})[variant] = base_url + path

    if not icons:
        raise ValueError("no brand logos found in the web bundles")
    return icons
