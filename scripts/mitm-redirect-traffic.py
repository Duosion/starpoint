from mitmproxy import http, dns
import ipaddress
import logging

API_HOST = "localhost"
# 198.51.100.0/24 subnet reserved for documentation, so it will never be used for anything else
#We can black-hole this address because it will be discarded.
API_DNS_REDIRECT_HOST = ipaddress.IPv4Address("198.51.100.140")
DNS_TTL= 600
API_PORT = 8000
API_SCHEME = 'http'
MAGIC_DOMAIN_SUFFIX = ".mitm.it"

prefixes = ["/openapi", "/infodesk", "", '/patch']

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

def dns_request(flow: dns.DNSFlow):
    if not flow.request.query or flow.request.questions is None: return
    #logging.info(f"[INFO] DNS request for {flow.request.questions}")
    for question in flow.request.questions:
        name = question.name
        prefix_type = hosts.get(name) if question.type == 1 else None
        if prefix_type != None: #Type is 1 when asking for an A record
            #logging.info(f"[INFO] Matched DNS request for {question.name}")
            flow.response.answers = [answer for answer in flow.response.answers if answer.name != question.name]
            domain_redirect = f'{question.name}{MAGIC_DOMAIN_SUFFIX}'
            #TODO: Are the CNAME records still useful in this configuration? Might be better to remove them and the host_redirects altogether....
            cname_rec = dns.ResourceRecord.CNAME(question.name, domain_redirect, ttl=DNS_TTL)
            a_rec = dns.ResourceRecord.A(domain_redirect, API_DNS_REDIRECT_HOST, ttl=DNS_TTL)
            flow.response.answers.append(cname_rec)
            flow.response.answers.append(a_rec)
    #logging.info(f"[INFO] Answered with {flow.response.answers}")

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