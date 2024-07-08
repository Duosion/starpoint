# /latest/api/index.php/payment/item_list
                       
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
PARAM: fa0e1207cb84d9ab22e737394ccb7ad6ce5d9235
GAME-APP-ID: 297417490
SHORT_UDID: 461173975
UDID: FD191144-2525-4EA6-09AA-667DDBC584BA111A
RES_VER: 2.1.122
COUNTRY_CODE: us
APP_ID: 561429
KAKAO_PID: 984521158255
DEVICE_LANG: en
DEVICE_NAME: SM-S916U 14
APP_VER: 0.0.81
DEVICE: 2
Content-Length: 24
```

### Body
```
{
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 00:54:19 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.0971
x-result-code: 1
param: 08934744f44e122f2bf2566b381b2d37ea74651a
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719622459,
    "result_code": 1
  },
  "data": {
    "payment_item_list": []
  }
}
```

