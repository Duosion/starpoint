# /latest/api/index.php/character/learn_mana_node
                       
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
PARAM: b1c94f17cc317d264ba61a7dd7b25492038bd2dd
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
Content-Length: 100
```

### Body
```
{
  "character_id": 1,
  "mana_node_multiplied_id_list": [
    2218
  ],
  "api_count": 8,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Sat, 22 Jun 2024 21:46:06 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.3796
x-result-code: 1
param: 71a2f7db972fbadbfbe8832dd70bab0b9b330676
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719092765,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "free_mana": 242299
    },
    "item_list": {
      "2": 80,
      "3": 51,
      "4": 39,
      "99": 602
    },
    "character_list": [
      {
        "character_id": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 1
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-23 06:41:57",
        "join_time": "2024-06-11 07:33:19"
      }
    ],
    "user_character_mana_node_list": {
      "1": [
        {
          "mana_node_multiplied_id": 2218
        }
      ]
    },
    "active_mission_list": [
      {
        "mission_id": 11070,
        "progress_value": 29,
        "stages": []
      }
    ],
    "mail_arrived": false
  }
}
```

