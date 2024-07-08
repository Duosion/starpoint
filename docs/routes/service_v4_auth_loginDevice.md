# /service/v4/auth/loginDevice
                       
## Request
### Headers
```
playerId: 584521137895
txNo: -82001986
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
Content-Type: application/json;charset=UTF-8
requestedBy: android
DLS: 8;tLgYYnFf7UR4LsD56+TB2/7M3NK6j0ClXd7/Jerm3tQ=
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 1066
```

### Body
```
{
  "idpId": "2eeba3a3-9e7b-49b9-acff-99a813a8dc92",
  "accessToken": "<redacted>",
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
  "deviceAppKey": "<redacted>",
  "androidId": "583de1fa3c5c425f",
  "usimCountry": "zz",
  "appId": "561429",
  "appSecret": "8a4421148b884608bb96862f3988d832",
  "appVer": "0.0.81",
  "market": "googlePlay",
  "country": "us",
  "lang": "en",
  "sdkVer": "3.14.14",
  "telecom": "unknown",
  "deviceModel": "samsung SM-T860",
  "os": "android",
  "osVer": "12",
  "network": "wifi",
  "deviceId": "2eeba3a3-9e7b-49b9-acff-99a813a8dc92",
  "clientTime": 1717786048702,
  "timezoneOffset": -21600000,
  "adid": "06f0e655-07cc-4a10-873a-7ade0411e754",
  "whiteKey": "<redacted>",
  "gsiToken": true,
  "serialNo": "android"
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 1345
Connection: close
Date: Fri, 07 Jun 2024 18:47:26 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1717786046970
seq: 39925747
Access-Control-Allow-Origin: *
reqTime: 1717786046970
backendReqTime: 1717786046970
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1717786046990
elapsed: 20
X-Cache: Miss from cloudfront
Via: 1.1 b11f1b4dc41875efd919e51de5f71ffc.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: deyyu07hOVxBrjUeG_fOdqQMZpEG6m_3ZxH_1DgidXFH_WBybZMeaw==
```

### Body
```
{
  "zatExpiryTime": 1717829246989,
  "zrtExpiryTime": 1720378046989,
  "firstLogin": false,
  "externalToken": "<redacted>",
  "zat": "<redacted>",
  "zrt": "<redacted>",
  "player": {
    "idpId": "6076023319",
    "appId": "561429",
    "lang": "en",
    "playerId": "584521137895",
    "agreement": {
      "E001": "y",
      "E002": "y",
      "E006": "y",
      "N002": "n",
      "N003": "n",
      "timestamp": "1717738674285"
    },
    "pushOption": {
      "night": "n",
      "player": "n"
    },
    "lastLoginTime": 1717738805847,
    "regTime": 1717738673845,
    "idpAlias": "561429:2eeba3a3-9e7b-49b9-acff-99a813a8dc92:android",
    "firstLoginTime": 1717738673881,
    "status": "normal"
  }
}
```

