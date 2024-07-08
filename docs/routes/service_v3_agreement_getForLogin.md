# /service/v3/agreement/getForLogin
                       
## Request
### Headers
```
playerId: 584521137895
zat: <redacted>
txNo: -1452573091
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 168
```

### Body
```
{
  "appId": "561429",
  "country": "us",
  "lang": "en",
  "idpCode": "zd3",
  "idpId": "6076023319",
  "deviceId": "2eeba3a3-9e7b-49b9-acff-99a813a8dc92",
  "serialNo": "android",
  "os": "android"
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 531
Connection: close
Date: Fri, 07 Jun 2024 18:47:27 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1717786047664
seq: 39943479
Access-Control-Allow-Origin: *
reqTime: 1717786047664
backendReqTime: 1717786047664
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1717786047692
elapsed: 28
X-Cache: Miss from cloudfront
Via: 1.1 771410cef18c0261fb48d1f92756f9e2.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: MvXZ9qQgRqmnfuqLWlQDAEQHBZ2OiEAxwtKshEW8v2BiFHgS0bsCiQ==
```

### Body
```
{
  "country": "us",
  "agreement": {
    "E001": "y",
    "E002": "y",
    "E006": "y",
    "N002": "n",
    "N003": "n",
    "timestamp": "1717738674285"
  },
  "partnerName": "\uc8fc\uc2dd\ud68c\uc0ac \uce74\uce74\uc624\uac8c\uc784\uc988",
  "idpId": "6076023319",
  "appName": "World Flipper (NA)",
  "adAgreementStatus": "n",
  "policyApplyTime": 1630854000000,
  "agreementPopup": "n",
  "kakaoSyncAgreementGetSet": "n",
  "firstAgreement": "n",
  "informationSecurityCountry": "kr",
  "kakaoSyncStatus": "off",
  "plusFriendStatusInfo": null,
  "appId": "561429",
  "context": "login",
  "partnerId": 825,
  "lang": "en",
  "idpCode": "zd3",
  "kakaogameSdkVer": "3.0"
}
```

