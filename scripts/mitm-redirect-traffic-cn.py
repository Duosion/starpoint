from mitmproxy import http
import logging

API_HOST = "localhost"
API_PORT = 8000
API_SCHEME = 'http'

prefixes = [
    "/leiting/cfgsdk", 
    "/leiting/sdklog", 
    "/leiting/update", 
    '/leiting/prophet', 
    '/leiting/ossskyeye', 
    "/sobot",
    "/tencent",
    "/leiting/member",
    "/leiting/logmonitor",
    "/leiting/loginwf",
    "/leiting/leitsdkshushu"
]

# hostname: prefix_index
hosts = {
    # leiting cfg sdk
    "cfgsdk.leiting.com": 0,

    # sdklog
    "sdklog.leiting.com": 1,

    # leiting update
    "update.leiting.com": 2,

    # leiting prophet
    "prophet.leiting.com": 3,

    # leiting ossskyeye
    "ossskyeye.leiting.com": 4,

    # sobot
    "api.sobot.com": 5,

    # tencent
    "nsv.tencentcloudapi.com": 6,

    # member
    "member.leiting.com": 7,
    "account.leiting.com": 7,

    # logmonitor
    "logmonitor.leiting.com": 8,

    # loginwf
    "loginwf.leiting.com": 9,
    "paywfauth.leiting.com": 9,
    "loginali.leiting.com": 9,

    # leitsdkshushu
    "leitsdkshushu.leiting.com:19083": 10,
    "leitsdkshushu.leiting.com": 10
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