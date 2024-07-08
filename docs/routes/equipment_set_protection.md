# /latest/api/index.php/equipment/set_protection
                       
## Request
### Headers
```
Host: na.wdfp.kakaogames.com
Accept-Encoding: deflate, gzip
Accept: text/xml, application/xml, application/xhtml+xml, text/html;q=0.9, text/plain;q=0.8, text/css, image/png, image/jpeg, image/gif;q=0.8, application/x-shockwave-flash, video/mp4;q=0.9, flv-application/octet-stream;q=0.8, video/x-flv;q=0.7, audio/mp4, application/futuresplash, */*;q=0.5
User-Agent: Mozilla/5.0 (Android; U; en-US) AppleWebKit/533.19.4 (KHTML, like Gecko) AdobeAIR/51.0
x-flash-version: 51,0,1,1
Connection: Keep-Alive
Referer: app:/worldflipper_android_release.swf
Content-Type: application/x-www-form-urlencoded
PARAM: 4af52e668e1c2f09fcfc117a90e1776141016b2a
GAME-APP-ID: 297417490
SHORT_UDID: 461173975
UDID: 0799DBAA-12F2-4085-2577-6674EA30D96D9A28
RES_VER: 2.1.122
COUNTRY_CODE: us
APP_ID: 561429
KAKAO_PID: 984521158255
DEVICE_LANG: en
DEVICE_NAME: SM-S916U 14
APP_VER: 0.0.81
DEVICE: 2
Content-Length: 92
```

### Body
```
{
  "protection": true,
  "api_count": 17,
  "equipment_ids": [
    1010001,
    2010002,
    5030037
  ],
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Fri, 21 Jun 2024 03:30:17 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1036
x-result-code: 1
param: 1bb2ec62524e27f67bc971c387662660c9d8629b
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1718940616,
    "result_code": 1
  },
  "data": []
}
```

