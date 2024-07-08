# /latest/api/index.php/multi_battle_quest/create_room
                       
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
PARAM: 1456932d9647d34c48e50b68eff7d2e5417b4f49
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
  "viewer_id": "<redacted>",
  "api_count": 17,
  "quest_id": 1001001,
  "party_id": 11,
  "category": 2
}
```

## Response
### Headers
```
Date: Thu, 04 Jul 2024 23:20:54 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1009
x-result-code: 1
param: 3d0e956310ca6cec791bc12bca554ec029d0ce6b
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1720135253,
    "result_code": 1
  },
  "data": {
    "room_number": "368851",
    "room_url": "https://na.wdfp.kakaogames.com/latest/api/index.php/multi_invitation/join?k=7RYinsU6PoMnsnJYdPa8yvVtzMewomSKlYF9MvIwegA"
  }
}
```

