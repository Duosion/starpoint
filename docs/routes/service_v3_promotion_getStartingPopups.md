# /service/v3/promotion/getStartingPopups
                       
## Request
### Headers
```
playerId: 984521158255
zat: <redacted>
txNo: -602898380
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 14; SM-S916U Build/UP1A.231005.007)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 162
```

### Body
```
{
  "appId": "561429",
  "playerId": "984521158255",
  "market": "googlePlay",
  "deviceId": "958b7dfb-5cc0-423c-9e0b-4edba4309b80",
  "adid": "714b6aad-9e3c-40a0-a025-4ef9a8245154"
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 60
Connection: close
Date: Sat, 22 Jun 2024 21:41:10 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1719092470619
seq: 28372352
Access-Control-Allow-Origin: *
reqTime: 1719092470619
backendReqTime: 1719092470619
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1719092470620
elapsed: 1
X-Cache: Miss from cloudfront
Via: 1.1 b11f1b4dc41875efd919e51de5f71ffc.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: mDWfYYlI7s7qvQoX2_1kt9rbrFXrc13qnZ-IHeC66901pWwiVR_Asw==
```

### Body
```
{
  "promotions": [],
  "appId": "561429",
  "playerId": "984521158255"
}
```

