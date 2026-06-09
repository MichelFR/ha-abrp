"""Constants for the ABRP Mate integration."""

from __future__ import annotations

from datetime import timedelta

DOMAIN = "abrp_mate"

# --- ABRP / Iternio telemetry + settings endpoints ---
ABRP_HOME_URL = "https://abetterrouteplanner.com/"
GET_TLM_URL = "https://api.iternio.com/1/session/get_tlm"
GET_SESSION_URL = "https://api.iternio.com/1/session/get_session"
SET_SETTINGS_URL = "https://api.iternio.com/1/session/set_settings"
SET_VEHICLE_DATA_URL = "https://api.iternio.com/1/vehicles/set_vehicle_data"
TLM_EVENTS_URL = "https://api.iternio.com/2/tlm"

# get_session body needs these alongside the session id.
ABRP_CLIENT = "abrp-web"
ABRP_COUNTRY_3 = "DEU"

# --- ABRP accounts (OAuth2 + QR "remote app" login) ---
# ABRP migrated auth to an OAuth2/OIDC service. Login: open a connect link on a
# device already signed in to ABRP, approve it, exchange the resulting code for
# tokens. The OAuth access_token is then used directly as the iternio
# ``session_id`` for the telemetry API.
ACCOUNTS_BASE_URL = "https://accounts.abetterrouteplanner.com"
OAUTH_AUTHORIZE_URL = f"{ACCOUNTS_BASE_URL}/authorize"
OAUTH_TOKEN_URL = f"{ACCOUNTS_BASE_URL}/token"
LOGIN_ABRP_URL = f"{ACCOUNTS_BASE_URL}/login/abrp"
LOGIN_ABRP_STATUS_URL = f"{ACCOUNTS_BASE_URL}/login/abrp/status"
OAUTH_CLIENT_ID = "app"
OAUTH_REDIRECT_URI = "https://abetterrouteplanner.com/abrpAuthRedirect"
OAUTH_SCOPE = "oidc profile email offline_access"
ABRP_CONNECT_SESSION_URL_PREFIX = (
    "https://abetterrouteplanner.com/?connect_session_token="
)

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
# The long-lived (rotating) OAuth refresh token is what we persist; access
# tokens are short-lived and fetched on demand.
CONF_REFRESH_TOKEN = "refresh_token"

PLATFORMS = ["sensor", "binary_sensor", "device_tracker", "number", "switch", "select"]

# Account-level planning settings exposed as controls.
SETTING_ARRIVAL_SOC = "arrival_soc"
SETTING_CHARGE_STOPS = "charge_stops"
CHARGE_STOPS_OPTIONS = ["optimal", "fewer", "fewest"]
AVOID_SETTINGS = ("avoid_tolls", "avoid_ferries", "avoid_borders", "avoid_motorways")
# Re-fetch account settings from ABRP at most this often during polling.
SETTINGS_REFRESH_INTERVAL = timedelta(minutes=5)

# How often the coordinator polls get_tlm as a baseline. The realtime SSE
# stream pushes updates more frequently when the vehicle is active.
DEFAULT_POLL_INTERVAL = timedelta(seconds=30)

# Number of times the config flow polls login/abrp/status while waiting for the
# user to approve the connect link, and the delay between polls.
# Runs in the background, so a generous window (90 * 2s = 3 min) is fine.
SESSION_POLL_ATTEMPTS = 90
SESSION_POLL_INTERVAL_SECONDS = 2
