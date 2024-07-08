# /service/v4/device/accessToken/create
                       
## Request
### Headers
```
appId: 561429
appSecret: 8a4421148b884608bb96862f3988d832
DLS: 3;X4ETEiKUZ6NgXHv871thRoh3lINUv2qssyHV2jWgJjc=
Content-Type: application/json;charset=UTF-8
requestedBy: android
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-openapi-zinny3.kakaogames.com
Accept-Encoding: gzip
Content-Length: 279
```

### Body
```
{
  "appVer": "0.0.81",
  "sdkVer": "3.14.14",
  "os": "android",
  "market": "googlePlay",
  "deviceId": "2eeba3a3-9e7b-49b9-acff-99a813a8dc92",
  "serialNo": "android",
  "previousDeviceId": "2eeba3a3-9e7b-49b9-acff-99a813a8dc92",
  "previousSerialNo": "android",
  "adid": "06f0e655-07cc-4a10-873a-7ade0411e754"
}
```

## Response
### Headers
```
Content-Type: application/json;charset=UTF-8
Content-Length: 281
Connection: close
Date: Fri, 07 Jun 2024 18:47:26 GMT
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
startTime: 1717786046569
seq: 39659648
Access-Control-Allow-Origin: *
reqTime: 1717786046569
backendReqTime: 1717786046569
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS
resTime: 1717786046570
elapsed: 1
X-Cache: Miss from cloudfront
Via: 1.1 97019997b7cf0778100102dc3dcb2ebe.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL59-P1
X-Amz-Cf-Id: yCQR_SsFhmgr6rKJixtaCU1be5IRdYIu04CkBLNmkEkCwmy7cJsivw==
```

### Body
```
{
  "expiryTime": 1717789646569,
  "accessToken": "fwPla7fQ8ty9+DZT/lD//uWZD4uD6C4lD6gGIIZTLKRGuNm/4dxjunW+oZLasbmApl9733gI3bSzmrKtZKA7mTiN6OOLlwmQCYX90BpdEzgW5+dwac5a+DiP51SwX295spv0Qud0dK5SKYdQWNwYFgQuDVCnehEtBLyH8euQwAr1QWnA8bvDoe72knb/e7kLYPeTyuK5EFR290Q0sIYWNwuEmrgsNZVPjhCqAAy/BFY="
}
```

