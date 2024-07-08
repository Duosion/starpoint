# /latest/api/index.php/single_battle_quest/start
                       
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
PARAM: b7fb4b2177a027c1c8935a6f99f55bfacaf18953
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
Content-Length: 224
```

### Body
```
{
  "use_boost_point": false,
  "api_count": 6,
  "party_id": 11,
  "use_boss_boost_point": false,
  "play_id": "6F555314-0FB2-4DE1-E640-667745E7AB6D1100",
  "viewer_id": "<redacted>",
  "is_auto_start_mode": false,
  "quest_id": 2006,
  "category": 13
}
```

## Response
### Headers
```
Date: Sat, 22 Jun 2024 21:45:12 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1342
x-result-code: 1
param: 77fbc96b5edf36618cd54120187bb07cbe9f146d
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719092712,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "stamina": 128,
      "stamina_heal_time": 1719092712
    },
    "item_list": {
      "500000": 2
    },
    "category_id": 13,
    "is_multi": "single",
    "start_time": 1719092712,
    "quest_name": "\ud754\ub4e4\ub9ac\ub294 \ubbf8\uad81 \ubcf4\ubb3c\uc5ed[\ud654]",
    "mail_arrived": false
  }
}
```

