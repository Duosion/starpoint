# /service/v3/player/heartbeat
                       
## Request
### Headers
```
skipResponse: y
txNo: 1597708323
playerId: 984521158255
zat: <redacted>
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 14; SM-S916U Build/UP1A.231005.007)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 159
```

### Body
```
{
  "seq": 3,
  "appId": "561429",
  "playerId": "984521158255",
  "os": "android",
  "country": "us",
  "market": "googlePlay",
  "heartbeatIntervals": 120000,
  "clientTime": 1719092699253
}
```

## Response
### Headers
```
Content-Length: 2
Connection: close
Date: Sat, 22 Jun 2024 21:44:59 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1719092699910
seq: 28469318
Access-Control-Allow-Origin: *
reqTime: 1719092699910
resTime: 1719092699910
elapsed: 0
X-Cache: Miss from cloudfront
Via: 1.1 a6915ebbfa224ec1c6121d77d0ef96c6.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: ims7B3DAW9X9Fp4_-PSbkC10b0JocxDebfB6gZwEEA3cPcGLt-RCSA==
```

### Body
```
{}
```

