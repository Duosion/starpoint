# /latest/api/index.php/ex_boost/first_draw
                       
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
PARAM: 26fa90352ed5cf6b3ca24e91c9f52d5af85bead2
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
Content-Length: 84
```

### Body
```
{
  "character_id": 331011,
  "api_count": 123,
  "cost_item_id": 14007,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 20:31:29 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1080
x-result-code: 1
param: aa007e2971a28d26c4db08b1c1e4cb70ac2984d0
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719693089,
    "result_code": 1
  },
  "data": {
    "character_list": [
      {
        "character_id": 331011,
        "viewer_id": "<redacted>",
        "ex_boost": {
          "status_id": 5,
          "ability_id_list": [
            18,
            59
          ]
        },
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-30 05:30:42",
        "join_time": "2024-06-12 14:42:00"
      }
    ],
    "item_list": {
      "14007": 16
    },
    "mail_arrived": false
  }
}
```

