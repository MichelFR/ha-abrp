"""Constants for the ABRP Mate integration."""

from __future__ import annotations

from datetime import timedelta

DOMAIN = "abrp_mate"

# --- ABRP / Iternio API constants (ported from the ABRP Mate Node project) ---
API_KEY = "f4128c06-5e39-4852-95f9-3286712a9f3a"
V1_AUTHORIZATION_HEADER = f"APIKEY {API_KEY}"

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
ABRP_CLIENT = "abrp-web"
ABRP_VERSION = 5800
ABRP_COUNTRY_3 = "DEU"
ABRP_APP_VERSION = "7.0.5"

DEFAULT_PLATFORM = "web"
DEFAULT_DEVICE_ID = "ad921d60486366258809553a3db49a4a"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)

# Web request headers shared by the ABRP JSON endpoints.
ABRP_WEB_REQUEST_HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7",
    "authorization": V1_AUTHORIZATION_HEADER,
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://abetterrouteplanner.com",
    "pragma": "no-cache",
    "referer": "https://abetterrouteplanner.com/",
    "user-agent": USER_AGENT,
}

# Server-sent-events stream headers (the /2/tlm realtime endpoint).
TLM_STREAM_HEADERS = {
    "accept": "text/event-stream",
    "cache-control": "no-cache",
    "origin": "https://abetterrouteplanner.com",
    "pragma": "no-cache",
    "referer": "https://abetterrouteplanner.com/",
    "x-abrp-version": ABRP_APP_VERSION,
    "x-api-key": API_KEY,
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
SESSION_POLL_ATTEMPTS = 30
SESSION_POLL_INTERVAL_SECONDS = 2
