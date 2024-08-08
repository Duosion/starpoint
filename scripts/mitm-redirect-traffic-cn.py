from mitmproxy import http
import logging

API_HOST = "localhost"
API_PORT = 8000
API_SCHEME = 'http'

prefixes = ["/leiting/cfgsdk", "/biligame", "/leiting/update", '/leiting/prophet', '/leiting/ossskyeye']

# hostname: prefix_index
hosts = {
    # leiting cfg sdk
    "cfgsdk.leiting.com": 0,

    # biligame
    "api.biligame.net": 1,
    "line1-sdk-app-api.biligame.net": 1,
    "p.biligame.com": 1,
    "static.biligame.net": 1,
    "line1-log.biligame.net": 1,

    # leiting update
    "update.leiting.com": 2,

    # leiting prophet
    "prophet.leiting.com": 3,

    # leiting ossskyeye
    "ossskyeye.leiting.com": 4,
}

def request(flow: http.HTTPFlow):
    #logging.info(f"[INFO] {flow.request.url}")
    prefix_type = hosts.get(flow.request.pretty_host)
    if prefix_type != None:
        flow.request.host = API_HOST
        flow.request.port = API_PORT
        flow.request.scheme = API_SCHEME

        prefix = prefixes[prefix_type]
        if prefix != "":
            flow.request.path = f"{prefix}{flow.request.path}"