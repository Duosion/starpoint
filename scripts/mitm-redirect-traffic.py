from mitmproxy import http

API_HOST = "localhost"
API_PORT = 8000
API_SCHEME = 'http'

prefixes = ["/openapi", "/infodesk", "", '/patch', "/"]

# hostname: prefix_index
hosts = {
    # openapi
    "openapi-zinny3.game.kakao.com": 0,
    "gc-openapi-zinny3.kakaogames.com": 0,

    # infodesk
    "gc-infodesk-zinny3.kakaogames.com": 1,

    # na server
    "na.wdfp.kakaogames.com": 2,

    # patch
    "patch.wdfp.kakaogames.com": 3
}

def request(flow: http.HTTPFlow) -> None:
    prefix_type = hosts.get(flow.request.pretty_host)
    if prefix_type != None:
        flow.request.host = API_HOST
        flow.request.port = API_PORT
        flow.request.scheme = API_SCHEME

        prefix = prefixes[prefix_type]
        if prefix != "":
            flow.request.path = f"{prefix}{flow.request.path}"