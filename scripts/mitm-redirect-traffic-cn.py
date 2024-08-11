from mitmproxy import http
import logging

API_HOST = "localhost"
API_PORT = 8000
API_SCHEME = 'http'

prefixes = ["/leiting/cfgsdk", "/biligame", "/leiting/update", '/leiting/prophet', '/leiting/ossskyeye', '/cnpatch']

# hostname: prefix_index
hosts = {
    # leiting cfg sdk
    "cfgsdk.leiting.com": 0,

    # biligame
    "api.biligame.net": 1,
    "api.bilibili.com": 1,
    "api.vc.bilibili.com": 1,
    "grpc.biliapi.net": 1,
    "app.bilibili.com": 1,
    "line1-sdk-app-api.biligame.net": 1,
    "p.biligame.com": 1,
    "static.biligame.net": 1,
    "line1-log.biligame.net": 1,
    "line1-sdkcenter-login.bilibiligame": 1,
    "line1-sdkcenter-login.bilibiligame.net": 1,

    # leiting update
    "update.leiting.com": 2,

    # leiting prophet
    "prophet.leiting.com": 3,

    # leiting ossskyeye
    "ossskyeye.leiting.com": 4,

    # CDN
    "sdk-hot-deploy.biligame.net": 5,
    "i0.hdslb.com": 5
}

def request(flow: http.HTTPFlow):
    logging.info(f"[INFO] {flow.request.pretty_host}")
    prefix_type = hosts.get(flow.request.pretty_host)
    if prefix_type != None:
        flow.request.host = API_HOST
        flow.request.port = API_PORT
        flow.request.scheme = API_SCHEME

        prefix = prefixes[prefix_type]
        if prefix != "":
            flow.request.path = f"{prefix}{flow.request.path}"