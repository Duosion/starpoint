# /latest/api/index.php/multi_battle_quest/start
                       
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
PARAM: 16743a4aa93b49357a8986e08e3b4304499205a5
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
Content-Length: 448
```

### Body
```
{
  "client_battle_party": {
    "unison_character_ids": [
      251007,
      251008,
      251065
    ],
    "ability_soul_ids": [
      null,
      null,
      null
    ],
    "character_ids": [
      151165,
      151129,
      251035
    ],
    "equipment_ids": [
      null,
      null,
      null
    ]
  },
  "api_count": 59,
  "use_boss_boost_point": false,
  "quest_id": 500009002,
  "viewer_id": "<redacted>",
  "party_id": 40,
  "play_id": "CB716CEE-1A15-4020-F745-667F5A7B7879212E",
  "category": 19,
  "use_boost_point": false,
  "mate_player_ids": [
    1,
    2
  ],
  "room_number": "126523",
  "is_auto_start_mode": true
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 00:51:08 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1734
x-result-code: 1
param: b41fa11ea541d3743955d06a951aebb1a4e6a494
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719622268,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "stamina": 208,
      "stamina_heal_time": 1719622268
    },
    "category_id": 19,
    "is_multi": "multi",
    "start_time": 1719622268,
    "quest_name": "U \ud0c0\ub85c\uc2a4\uad70\u221e ::quest_rank::",
    "mail_arrived": false
  }
}
```

