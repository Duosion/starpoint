# /latest/api/index.php/profile/get_my_profile
                       
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
PARAM: 5f92b9d0b78b09aa9b8a9c291413b1d8221d7e03
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
Date: Fri, 21 Jun 2024 03:34:19 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1925
x-result-code: 1
param: ea1501f1987b0c34d004e360110acbde3395c7c2
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1718940859,
    "result_code": 1
  },
  "data": {
    "profile_info": {
      "owned_character_count": 112,
      "max_owned_character_count": 454,
      "opened_mana_board_second_count": 0,
      "max_opened_mana_board_second_count": 397,
      "owned_degree_count": 7,
      "max_owned_degree_count": 1282
    },
    "profile_settings": {
      "show_owned_character_count": true,
      "show_opened_mana_board_second_count": true,
      "show_owned_degree_count": true
    },
    "user_party_group_list": [
      {
        "party_group_id": 1,
        "party_group_color_id": 7,
        "party_list": [
          {
            "party_id": 1,
            "party_group_id": 1,
            "party_name": "Setting Favorite Units",
            "character_ids": [
              1,
              null,
              null
            ],
            "unison_character_ids": [
              null,
              null,
              null
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "options": {
              "allow_other_players_to_heal_me": true
            },
            "party_edited": false
          }
        ]
      }
    ]
  }
}
```

