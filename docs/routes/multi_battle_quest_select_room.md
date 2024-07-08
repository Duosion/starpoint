# /latest/api/index.php/multi_battle_quest/select_room
                       
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
PARAM: b07b41696a57269e331ab81b4600d9d9f19efff5
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
Content-Length: 128
```

### Body
```
{
  "api_count": 19,
  "party_id": 11,
  "room_number": "368851",
  "viewer_id": "<redacted>",
  "quest_id": 1001001,
  "accepted_type": 1,
  "category": 2
}
```

## Response
### Headers
```
Date: Thu, 04 Jul 2024 23:20:55 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.3392
x-result-code: 1
param: 207f38044f950a926a153114f9c4c05883284e09
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1720135255,
    "result_code": 1
  },
  "data": {
    "room_number": "368851",
    "category_id": 2,
    "quest_id": 1001001,
    "ip_address": "ec2-34-206-200-143.compute-1.amazonaws.com",
    "port": 18888,
    "application_update_url": "",
    "host_entry_time": 1720135255,
    "raising_state": 1,
    "is_pickup": false,
    "room_sequence": 16852849
  }
}
```

