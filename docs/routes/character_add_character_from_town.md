# /latest/api/index.php/character/add_character_from_town
                       
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
PARAM: f09c9c2d9668de7739e6e41330871607157af3ce
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
Content-Length: 60
```

### Body
```
{
  "character_id": 512001,
  "api_count": 33,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Fri, 21 Jun 2024 03:35:11 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1822
x-result-code: 1
param: ab40c1772bb4d5872bd47550183d598494587cde
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1718940911,
    "result_code": 1
  },
  "data": {
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 512001,
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
        "update_time": "2024-06-21 12:35:11",
        "join_time": "2024-06-21 12:35:11"
      }
    ],
    "encyclopedia_info": {
      "151200101": {
        "read": false
      }
    },
    "mail_arrived": false
  }
}
```

