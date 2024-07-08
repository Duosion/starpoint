# /service/v3/promotion/checkUrlPromotion
                       
## Request
### Headers
```
playerId: 594521148625
zat: <redacted>
txNo: 1772263314
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 99
```

### Body
```
{
  "appId": "561429",
  "playerId": "594521148625",
  "referrer": "utm_source=google-play&utm_medium=organic"
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 25
Connection: close
Date: Sun, 09 Jun 2024 02:59:32 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1717901972117
seq: 78929000
Access-Control-Allow-Origin: *
reqTime: 1717901972120
backendReqTime: 1717901972120
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1717901972122
elapsed: 5
X-Cache: Miss from cloudfront
Via: 1.1 41da1cd4a8cffc77bf492a7a01cfa424.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: HluxsQGG5c7KI1_-_dQf_TSr8W7EWrT4LNk1afrDSPg9Nzn2ah2x0w==
```

### Body
```
{
  "result": "NO_PROMOTION"
}
```

