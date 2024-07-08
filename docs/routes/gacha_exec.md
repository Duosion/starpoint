# /latest/api/index.php/gacha/exec
                       
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
PARAM: a3ef42e274a67784378901e635c8485711aebd2c
GAME-APP-ID: 635343250
SHORT_UDID: 376249241
UDID: 8959A034-38B2-49A9-9F0C-6663706E07DD0521
RES_VER: 2.1.121
COUNTRY_CODE: us
APP_ID: 561429
KAKAO_PID: 12
DEVICE_LANG: en
DEVICE_NAME: SM-T860 12
APP_VER: 0.0.81
DEVICE: 2
Content-Length: 100
```

### Body
```
{
  "api_count": 4,
  "payment_type": 1,
  "number_of_exec": 1,
  "viewer_id": "<redacted>",
  "gacha_id": 157,
  "type": 2
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 21:03:29 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.6559
x-result-code: 1
param: b9d1972176320927dee87a97bc6b1d19fbe7669b
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717794208,
    "result_code": 1
  },
  "data": {
    "draw": [
      {
        "null": 1,
        "character_id": 161007,
        "movie_id": "fes",
        "seed": 10000900,
        "entry_count": 1
      },
      {
        "null": 1,
        "character_id": 351005,
        "movie_id": "fes",
        "seed": 10007952,
        "entry_count": 1,
        "ex_boost_item": {
          "id": 14016,
          "count": 1
        }
      },
      {
        "null": 1,
        "character_id": 131152,
        "movie_id": "fes",
        "seed": 10004045,
        "entry_count": 1
      },
      {
        "null": 1,
        "character_id": 311013,
        "movie_id": "fes",
        "seed": 10007955,
        "entry_count": 1,
        "ex_boost_item": {
          "id": 14001,
          "count": 1
        }
      },
      {
        "null": 1,
        "character_id": 211008,
        "movie_id": "fes",
        "seed": 10009515,
        "entry_count": 1
      },
      {
        "null": 1,
        "character_id": 311012,
        "movie_id": "fes",
        "seed": 10003467,
        "entry_count": 1,
        "ex_boost_item": {
          "id": 14001,
          "count": 1
        }
      },
      {
        "null": 1,
        "character_id": 341002,
        "movie_id": "fes",
        "seed": 10005842,
        "entry_count": 1
      },
      {
        "null": 1,
        "character_id": 211044,
        "movie_id": "fes",
        "seed": 10006734,
        "entry_count": 1
      },
      {
        "null": 1,
        "character_id": 231044,
        "movie_id": "fes_guarantee",
        "seed": 10003390,
        "entry_count": 1
      },
      {
        "null": 1,
        "character_id": 241005,
        "movie_id": "fes",
        "seed": 10007365,
        "entry_count": 1
      }
    ],
    "gacha_info_list": [
      {
        "gacha_id": 157,
        "is_account_first": false,
        "gacha_exchange_point": 20
      }
    ],
    "user_info": {
      "free_vmoney": 980
    },
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 161007,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 131152,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 211008,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 341002,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 211044,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 231044,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 241005,
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
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:03:28",
        "join_time": "2024-06-08 06:03:28"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 351005,
        "stack": 1,
        "exp": 0,
        "exp_total": 0,
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:02:21",
        "join_time": "2024-06-08 06:02:21"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 311013,
        "stack": 1,
        "exp": 0,
        "exp_total": 0,
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:02:21",
        "join_time": "2024-06-08 06:02:21"
      },
      {
        "viewer_id": "<redacted>",
        "character_id": 311012,
        "stack": 1,
        "exp": 0,
        "exp_total": 0,
        "create_time": "2024-06-08 05:41:19",
        "update_time": "2024-06-08 06:02:21",
        "join_time": "2024-06-08 06:02:21"
      }
    ],
    "item_list": {
      "14016": 1,
      "14001": 2
    },
    "encyclopedia_info": {
      "121104401": {
        "read": false
      },
      "116100701": {
        "read": false
      },
      "121100801": {
        "read": false
      },
      "123104401": {
        "read": false
      },
      "124100501": {
        "read": false
      },
      "134100201": {
        "read": false
      },
      "113115201": {
        "read": false
      }
    },
    "mission_info": [
      {
        "mission_category_id": 1,
        "mission_id": 32,
        "mission_reward_id": 32001
      },
      {
        "mission_category_id": 5,
        "mission_id": 2000,
        "mission_reward_id": 2000001
      }
    ],
    "mail_arrived": false
  }
}
```

