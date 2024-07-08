# /latest/api/index.php/mail/receive_all
                       
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
PARAM: 1b6c31f29d66840377b42ec6a62a6f7c6f25481a
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
Content-Length: 144
```

### Body
```
{
  "api_count": 51,
  "mail_ids": [
    2413989,
    2413988,
    2413987,
    2413986,
    2413985,
    2413984,
    2413983,
    2413982,
    2413981,
    2413980,
    2413979,
    2413978,
    2413977,
    2413976
  ],
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 19:28:09 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.4972
x-result-code: 1
param: 96ecf38bc9de65b58ddccc43601e181a531e1872
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719689289,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "free_mana": 411223,
      "exp_pool": 496260,
      "exp_pooled_time": 1719688999,
      "free_vmoney": 485
    },
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 131122,
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
        "update_time": "2024-06-30 04:28:09",
        "join_time": "2024-06-30 04:28:09"
      }
    ],
    "mail_ids": [
      2413989,
      2413988,
      2413987,
      2413986,
      2413985,
      2413984,
      2413983,
      2413982,
      2413981,
      2413980,
      2413979,
      2413978,
      2413977,
      2413976
    ],
    "deleted_mail_count": 0,
    "already_mail_count": 0,
    "outdated_mail_count": 0,
    "dispose_expired_mail_count": 0,
    "auto_sale_expired_mail_count": 0,
    "max_overed_mail_count": 0,
    "total_count": 0,
    "item_list": {
      "99": 686,
      "12": 42,
      "11": 100,
      "10": 180,
      "9": 254,
      "49": 66,
      "48": 199,
      "47": 398,
      "46": 449
    },
    "encyclopedia_info": {
      "113112201": {
        "read": false
      }
    },
    "mission_info": [
      {
        "mission_category_id": 1,
        "mission_id": 40,
        "mission_reward_id": 40007
      }
    ],
    "mail_arrived": false
  }
}
```

