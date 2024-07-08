# /service/v3/log/writeSdkBasicLog
                       
## Request
### Headers
```
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 2358
```

### Body
```
{
  "code": "androidClientError",
  "tag1": "PlatformLoginError",
  "tag2": "406",
  "logBody": {
    "requestData": "{\"method\":\"POST\",\"header\":{\"txNo\":1381623886,\"openapi_uri\":\"v3\\/zat\\/login\"},\"body\":{\"zat\":\"Ti+AZA8Q+4wmvJ9poGBd\\/loOsD\\/BdjoZocIJ5TISDXajsEpS2sSg0Vl28bHqa2dko2d\\/iL4R\",\"playerId\":\"2\",\"loginType\":\"auto\",\"resume\":false,\"fields\":[\"playerId\",\"customProperty\",\"secureProperty\",\"pushToken\",\"pushOption\",\"agreement\",\"memberKey\",\"lang\",\"firstLoginTime\",\"regTime\"],\"retryNo\":0,\"androidId\":\"583de1fa3c5c425f\",\"usimCountry\":\"zz\",\"appId\":\"561429\",\"appSecret\":\"8a4421148b884608bb96862f3988d832\",\"appVer\":\"0.0.81\",\"market\":\"googlePlay\",\"country\":\"us\",\"lang\":\"en\",\"sdkVer\":\"3.14.14\",\"telecom\":\"unknown\",\"deviceModel\":\"samsung SM-T860\",\"os\":\"android\",\"osVer\":\"12\",\"network\":\"wifi\",\"deviceId\":\"0fdb35fe-5bf3-4bb4-8cd7-cf0e40ed10c4\",\"clientTime\":1717901958730,\"timezoneOffset\":-21600000,\"adid\":\"\",\"whiteKey\":\"\",\"gsiToken\":true},\"uri\":\"auth:\\/\\/v3\\/zat\\/login\"}",
    "savedLoginData": {
      "externalToken": "<redacted>",
      "firstLogin": true,
      "player": {
        "appId": "561429",
        "firstLoginTime": 1717901866102,
        "idpAlias": "561429:0fdb35fe-5bf3-4bb4-8cd7-cf0e40ed10c4:android",
        "idpCode": "zd3",
        "idpId": "6076018502",
        "playerId": "2",
        "pushOption": {
          "night": "n",
          "player": "n"
        },
        "regTime": 1717901866102,
        "status": "normal"
      },
      "zat": "<redacted>",
      "zatExpiryTime": 1717945066102,
      "zrt": "<redacted>",
      "zrtExpiryTime": 1720493866102
    },
    "savedAccount": {
      "idpCode": "zd3",
      "userId": "0fdb35fe-5bf3-4bb4-8cd7-cf0e40ed10c4",
      "accessToken": "<redacted>",
      "ci": "",
      "deviceId": "0fdb35fe-5bf3-4bb4-8cd7-cf0e40ed10c4",
      "expiryTime": 1717905558501
    },
    "extra": null,
    "country": "us",
    "lang": "en",
    "telecom": "unknown",
    "network": "wifi",
    "deviceModel": "SM-T860",
    "os": "android",
    "osVer": "12",
    "deviceId": "0fdb35fe-5bf3-4bb4-8cd7-cf0e40ed10c4",
    "sdkVer": "3.14.14",
    "clientTime": 1717901958919,
    "appId": "561429",
    "appVer": "0.0.81",
    "market": "googlePlay"
  },
  "ttl": -1616567296
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 48
Connection: close
Date: Sun, 09 Jun 2024 02:59:19 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1717901959318
seq: 50695883
Access-Control-Allow-Origin: *
reqTime: 1717901959318
backendReqTime: 1717901959318
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1717901959319
elapsed: 1
X-Cache: Miss from cloudfront
Via: 1.1 48d44df2a05cf5d4e8d9356fee976800.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: 9VNV3e0YtiVnYt5pR377_vKReHt9FdH-lJLVxy0Pbrgu263T_uS4lg==
```

### Body
```
{
  "logId": "43f22363-260c-11ef-ba6b-d5b4dba0cb80"
}
```

