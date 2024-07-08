# /service/v3/zat/login
                       
## Request
### Headers
```
playerId: 984521158255
txNo: 1717815162
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 14; SM-S916U Build/UP1A.231005.007)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 1019
```

### Body
```
{
  "zat": "<redacted>",
  "playerId": "984521158255",
  "loginType": "auto",
  "resume": false,
  "fields": [
    "playerId",
    "customProperty",
    "secureProperty",
    "pushToken",
    "pushOption",
    "agreement",
    "memberKey",
    "lang",
    "firstLoginTime",
    "regTime"
  ],
  "retryNo": 0,
  "androidId": "869169ccbdb93fd9",
  "usimCountry": "us",
  "mcc": "310",
  "mnc": "26",
  "appId": "561429",
  "appSecret": "8a4421148b884608bb96862f3988d832",
  "appVer": "0.0.81",
  "market": "googlePlay",
  "country": "us",
  "lang": "en",
  "sdkVer": "3.14.14",
  "telecom": "T-Mobile",
  "deviceModel": "samsung SM-S916U",
  "os": "android",
  "osVer": "14",
  "network": "wifi",
  "deviceId": "958b7dfb-5cc0-423c-9e0b-4edba4309b80",
  "clientTime": 1719092458350,
  "timezoneOffset": -21600000,
  "adid": "714b6aad-9e3c-40a0-a025-4ef9a8245154",
  "whiteKey": "<redacted>",
  "gsiToken": true
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 1161
Connection: close
Date: Sat, 22 Jun 2024 21:40:58 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1719092458896
seq: 28404951
Access-Control-Allow-Origin: *
reqTime: 1719092458896
backendReqTime: 1719092458896
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1719092458910
elapsed: 14
X-Cache: Miss from cloudfront
Via: 1.1 48d44df2a05cf5d4e8d9356fee976800.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: 8heB-PZq491PWjdX6wwCZLUs0RJ2cqhl7GjxK9jHvYKJsOJSCZLHBw==
```

### Body
```
{
  "zatExpiryTime": 1719135658909,
  "firstLogin": false,
  "externalToken": "<redacted>",
  "zat": "<redacted>",
  "player": {
    "idpId": "104425574296791483012",
    "appId": "561429",
    "lang": "en",
    "playerId": "984521158255",
    "idpCode": "google",
    "agreement": {
      "E001": "y",
      "E002": "y",
      "E006": "y",
      "N002": "n",
      "N003": "n",
      "timestamp": "1718058798079"
    },
    "memberKey": "hkXkBHNOr8E2BlMKptPWaY_m9hHr3Mfz-Xxg52QwEoMOE5XqEYD--A00",
    "pushOption": {
      "night": "n",
      "player": "n"
    },
    "lastLoginTime": 1719087071717,
    "regTime": 1718058797498,
    "idpAlias": "104425574296791483012",
    "firstLoginTime": 1718058797543,
    "status": "normal"
  }
}
```

