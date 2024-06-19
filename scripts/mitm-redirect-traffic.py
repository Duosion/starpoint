from mitmproxy import http

API_HOST = "localhost"
API_PORT = 8000
API_SCHEME = 'http'

prefixes = ["/openapi", "/infodesk", ""]

# hostname: prefix_index
hosts = {
    # openapi
    "openapi-zinny3.game.kakao.com": 0,
    "gc-openapi-zinny3.kakaogames.com": 0,
    "3.35.189.170": 0,
    "15.164.132.131": 0,
    "18.160.60.78": 0,
    "18.160.60.56": 0,
    "18.160.60.41": 0,
    "18.160.60.124": 0,

    # infodesk
    "gc-infodesk-zinny3.kakaogames.com": 1,
    "18.64.155.6": 1,
    "18.64.155.47": 1,
    "18.64.155.84": 1,
    "18.64.155.74": 1,

    # na server
    "na.wdfp.kakaogames.com": 2,
    "3.210.14.73": 2,
    "3.222.140.107": 2,
    "52.44.29.229": 2,
    "3.229.21.155": 2
}

def request(flow: http.HTTPFlow) -> None:
    prefix_type = hosts.get(flow.request.host)
    if prefix_type != None:
        flow.request.host = API_HOST
        flow.request.port = API_PORT
        flow.request.scheme = API_SCHEME

        prefix = prefixes[prefix_type]
        if prefix != "":
            flow.request.path = f"{prefix}{flow.request.path}"