# /service/v3/auth/loginGoogle
                       
## Request
### Headers
```
playerId: 984521158255
txNo: -523104058
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 14; SM-S916U Build/UP1A.231005.007)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 1835
```

### Body
```
{
  "idpId": "104425574296791483012",
  "viewer_id": "<redacted>",
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
  "viewer_id": "<redacted>",
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
  "deviceId": "7f84aca1-a8b2-46a1-831c-4c88124d20b2",
  "clientTime": 1718229046737,
  "timezoneOffset": -21600000,
  "adid": "714b6aad-9e3c-40a0-a025-4ef9a8245154",
  "viewer_id": "<redacted>",
  "gsiToken": true
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 1416
Connection: close
Date: Wed, 12 Jun 2024 21:50:47 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1718229047051
seq: 94254649
Access-Control-Allow-Origin: *
reqTime: 1718229047051
backendReqTime: 1718229047051
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1718229047151
elapsed: 100
X-Cache: Miss from cloudfront
Via: 1.1 f47495a264710eda031284d475b7c21e.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: cKj12394yZw8vhDYgC4SOq8sq87DQ4d_iUTGekdIQ4VShIQK9KlgUw==
```

### Body
```
{
  "zatExpiryTime": 1718272247150,
  "zrtExpiryTime": 1720821047150,
  "firstLogin": false,
  "viewer_id": "<redacted>",
  "viewer_id": "<redacted>",
  "viewer_id": "<redacted>",
  "player": {
    "idpId": "104425574296791483012",
    "appId": "561429",
    "lang": "en",
    "idpCode": "google",
    "playerId": "984521158255",
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
    "lastLoginTime": 1718177195495,
    "regTime": 1718058797498,
    "idpAlias": "104425574296791483012",
    "firstLoginTime": 1718058797543,
    "status": "normal"
  }
}
```

