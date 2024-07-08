from subprocess import run
from os import scandir, path, remove, makedirs
from mitmproxy import http
import argparse
import msgpack
import base64
import json
import re

TEMP_FILE = "generate_docs_temp.json"

redacted_values = {
    "viewer_id": True,
    "accessToken": True,
    "deviceAppKey": True,
    "whiteKey": True,
    "zat": True,
    "zrt": True,
    "externalToken": True,
}

host_mappings = {
    # openapi
    "openapi-zinny3.game.kakao.com": 0,
    "gc-openapi-zinny3.kakaogames.com": 0,

    # infodesk
    "gc-infodesk-zinny3.kakaogames.com": 1,

    # na server
    "na.wdfp.kakaogames.com": 2,
}

def redact_dumps(data):
    dumped = json.dumps(data, indent=2)
    for to_redact in redacted_values.keys():
        dumped = re.sub(r'\"' + re.escape(to_redact) + r'\": \S+,', f'"{to_redact}": "<redacted>",', dumped)
    return dumped

def request(flow: http.HTTPFlow) -> None:
    if not flow.request.pretty_host.startswith("patch") and flow.request.pretty_host.find("kakao") != -1:
        combined_flows = {}
        if path.exists(TEMP_FILE):
            with open(TEMP_FILE, 'r') as file:
                combined_flows = json.load(file)

        headers = flow.request.headers
        request_headers_formatted = "\n".join([ f"{name}: {value if not redacted_values.get(name) else '<redacted>'}" for name, value in headers.items() ])
        response_headers_formatted = "\n".join([ f"{name}: {value if not redacted_values.get(name) else '<redacted>'}" for name, value in flow.response.headers.items() ])
        
        content_type = headers.get("Content-Type") or ""
        is_msgpack_communication = content_type == "application/x-www-form-urlencoded"

        # parse request & response body
        request_body_formatted = flow.request.data.content
        if request_body_formatted != None and is_msgpack_communication:
            request_body_formatted = msgpack.unpackb(base64.b64decode(request_body_formatted), strict_map_key=False)

        response_body_formatted = flow.response.data.content
        if response_body_formatted != None and is_msgpack_communication:
            response_body_formatted = msgpack.unpackb(base64.b64decode(response_body_formatted), strict_map_key=False)

        request_body_type = type(request_body_formatted)
        if (request_body_type is dict):
            request_body_formatted = json.dumps(request_body_formatted, indent=2)
        elif (request_body_type is bytes):
            request_body_formatted = request_body_formatted.decode("utf-8")
        
        response_body_type = type(response_body_formatted)
        if (response_body_type is dict):
            response_body_formatted = json.dumps(response_body_formatted, indent=2)
        elif (response_body_type is bytes):
            response_body_formatted = response_body_formatted.decode("utf-8")

        combined_flows[flow.request.pretty_url] = {
            "request_headers": request_headers_formatted,
            "response_headers": response_headers_formatted,
            "request_body": request_body_formatted,
            "response_body": response_body_formatted,
            "host": flow.request.pretty_host,
            "path": flow.request.path
        }

        with open(TEMP_FILE, 'w') as file:
            json.dump(combined_flows, file)

# scan the flows directory and call mitmdump in read mode
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("input_directory", type=str, help="The directory containing the mitmproxy flows.")
    parser.add_argument("output_directory", type=str, help="The directory to output the markdown to.")
    args = parser.parse_args()

    input_dir = args.input_directory
    output_dir = args.output_directory

    if path.exists(TEMP_FILE):
        remove(TEMP_FILE)

    if not path.exists(input_dir):
        raise Exception("Invalid input directory provided.")
    if not path.exists(output_dir):
        raise Exception("Invalid input directory provided.")

    for entry in scandir(input_dir):
        if entry.is_file():
            run(f"mitmdump -r {entry.path} -s generate_docs.py -q")

    urls = {}
    if path.exists(TEMP_FILE):
        with open(TEMP_FILE, 'r') as file:
            urls = json.load(file)

    groups = [
        [],
        [],
        []
    ]

    api_routes_output_url = path.join(output_dir, "routes")
    if not path.exists(api_routes_output_url):
        makedirs(api_routes_output_url)

    for url, data in urls.items():
        group = host_mappings.get(data['host']) or 0

        file_name = data['path'].replace('/latest/api/index.php', '').removeprefix('/')
        query_begin_location = file_name.rfind("?")
        if query_begin_location != -1:
            file_name = file_name[:query_begin_location]
        file_name_safe = file_name.replace('/', '_')

        request_body = redact_dumps(json.loads(data['request_body'])) if data['request_body'] != '' else 'No Request Body'
        response_body = redact_dumps(json.loads(data['response_body'])) if data['response_body'] != '' else 'No Request Body'



        groups[group].append(f"[/{file_name}](./routes/{file_name_safe}.md) | :no_entry:")

        with open(path.join(api_routes_output_url, f"{file_name_safe}.md"), 'w') as file:
            file.write(f'''# {data['path']}
                       
## Request
### Headers
```
{data['request_headers']}
```

### Body
```
{request_body}
```

## Response
### Headers
```
{data['response_headers']}
```

### Body
```
{response_body}
```

''')
    
    api_group_table = '\n'.join(sorted(groups[2]))
    openapi_group_table = '\n'.join(sorted(groups[1]))
    infodesk_group_table = '\n'.join(sorted(groups[0]))

    with open(path.join(output_dir, "routes.md"), 'w') as file:
        file.write(f'''# API Endpoints
                   
### ``na.wdfp.kakaogames.com/latest/api/index.php``
Endpoint | Status
:------- | :-------
{api_group_table}

### ``openapi-zinny3.game.kakao.com/service``
Endpoint | Status
:------- | :-------
{openapi_group_table}

### ``gc-infodesk-zinny3.kakaogames.com``
Endpoint | Status
:------- | :-------
{infodesk_group_table}
''')

    remove(TEMP_FILE)