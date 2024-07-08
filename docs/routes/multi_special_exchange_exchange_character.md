# /latest/api/index.php/multi_special_exchange/exchange_character
                       
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
PARAM: a0e1817984695d97c668ddf48e86401ed13e48bd
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
Content-Length: 104
```

### Body
```
{
  "viewer_id": "<redacted>",
  "character_id": 111015,
  "ticket_item_id": 980007,
  "api_count": 44,
  "campaign_id": 5
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 19:27:37 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.4310
x-result-code: 1
param: e781f0f8eec4f76e22543b478554f4ffab1b4ffc
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719689257,
    "result_code": 1
  },
  "data": {
    "multi_special_exchange_campaign_list": [
      {
        "campaign_id": 5,
        "status": 4
      }
    ],
    "user_info": {
      "free_mana": 184743,
      "exp_pool": 188284,
      "exp_pooled_time": 1719688999,
      "free_vmoney": 480
    },
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 111015,
        "entry_count": 1,
        "exp": 0,
        "exp_total": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1,
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-30 04:27:37",
        "join_time": "2024-06-30 04:27:37"
      }
    ],
    "item_list": {
      "1": 674,
      "2": 499,
      "3": 260,
      "4": 90,
      "99": 624,
      "980007": 0
    },
    "encyclopedia_info": {
      "111101501": {
        "read": false
      }
    },
    "mission_info": [
      {
        "mission_category_id": 1,
        "mission_id": 40,
        "mission_reward_id": 40006
      }
    ],
    "mail_arrived": true
  }
}
```

