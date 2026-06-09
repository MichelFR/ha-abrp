"""Constants for the ABRP Mate integration."""

from __future__ import annotations

from datetime import timedelta

DOMAIN = "abrp_mate"

# --- ABRP / Iternio endpoints ---
ABRP_HOME_URL = "https://abetterrouteplanner.com/"
NEW_SESSION_URL = "https://api.iternio.com/1/session/new_session"
CONNECT_SESSION_REQUEST_URL = (
    "https://api.iternio.com/1/session/connect_session_request"
)
GET_SESSION_URL = "https://api.iternio.com/1/session/get_session"
GET_TLM_URL = "https://api.iternio.com/1/session/get_tlm"
TLM_EVENTS_URL = "https://api.iternio.com/2/tlm"
ABRP_CONNECT_SESSION_URL_PREFIX = (
    "https://abetterrouteplanner.com/?connect_session_token="
)

# --- Genuinely static values (literal in the ABRP web app) ---
ABRP_CLIENT = "abrp-web"
ABRP_COUNTRY_3 = "DEU"
DEFAULT_PLATFORM = "web"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)

# --- Dynamic values, scraped from the web app at runtime (see metadata.py) ---
# These are extracted from the ABRP web bundle; the values below are the
# last-known-good fallbacks used if scraping fails. Keep them current.
FALLBACK_API_KEY = "f4128c06-5e39-4852-95f9-3286712a9f3a"
FALLBACK_APP_VERSION = "7.1.2"
FALLBACK_APP_BUILD_NUMBER = "5875"

# How long a scraped metadata result stays cached before it is refreshed.
METADATA_TTL = timedelta(hours=6)
# Stop scanning the web bundle after this many bytes (the values sit in the
# first few MB; this caps the download of the ~20 MB bundle).
METADATA_SCAN_LIMIT_BYTES = 8 * 1024 * 1024


def web_request_headers(api_key: str) -> dict[str, str]:
    """Headers shared by the ABRP JSON endpoints."""
    return {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7",
        "authorization": f"APIKEY {api_key}",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "origin": "https://abetterrouteplanner.com",
        "pragma": "no-cache",
        "referer": "https://abetterrouteplanner.com/",
        "user-agent": USER_AGENT,
    }


def stream_headers(api_key: str, app_version: str, session_id: str) -> dict[str, str]:
    """Headers for the /2/tlm realtime server-sent-events endpoint."""
    return {
        "accept": "text/event-stream",
        "cache-control": "no-cache",
        "origin": "https://abetterrouteplanner.com",
        "pragma": "no-cache",
        "referer": "https://abetterrouteplanner.com/",
        "x-abrp-session": session_id,
        "x-abrp-version": app_version,
        "x-api-key": api_key,
        "x-requested-with": "XMLHttpRequest",
    }


# --- Integration config ---
CONF_SESSION_ID = "session_id"
CONF_VEHICLE_ID = "vehicle_id"

PLATFORMS = ["sensor", "binary_sensor", "device_tracker"]

# How often the coordinator polls get_tlm as a baseline. The realtime SSE
# stream pushes updates more frequently when the vehicle is active.
DEFAULT_POLL_INTERVAL = timedelta(seconds=30)

# Number of times the config flow polls get_session while waiting for the
# user to approve the connect link, and the delay between polls.
# Runs in the background, so a generous window (90 * 2s = 3 min) is fine.
SESSION_POLL_ATTEMPTS = 90
SESSION_POLL_INTERVAL_SECONDS = 2
