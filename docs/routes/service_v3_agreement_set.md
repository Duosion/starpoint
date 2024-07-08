# /service/v3/agreement/set
                       
## Request
### Headers
```
playerId: 594521148625
zat: <redacted>
txNo: 184324900
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 59
```

### Body
```
{
  "appId": "561429",
  "playerId": "594521148625",
  "agreement": {}
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 57
Connection: close
Date: Sun, 09 Jun 2024 02:59:32 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1717901972122
seq: 50972907
Access-Control-Allow-Origin: *
reqTime: 1717901972124
backendReqTime: 1717901972124
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1717901972126
elapsed: 4
X-Cache: Error from cloudfront
Via: 1.1 9d9abffabe036b0df4ef4c5a731419c2.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: OF9_ShYbMUePtupir6QAEDQ5zJAQ22Xmcun3tU1R1aou7cYvCZO1sQ==
```

### Body
```
{
  "desc": "Invalid request parameter : agreement is empty"
}
```

