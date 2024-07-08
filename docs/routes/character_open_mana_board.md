# /latest/api/index.php/character/open_mana_board
                       
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
PARAM: b48600da4240b8a3e56006c17a00edb6d6e5ac82
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
  "character_id": 331011,
  "api_count": 82,
  "viewer_id": "<redacted>",
  "mana_board_index": 2
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 01:02:29 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.3940
x-result-code: 1
param: 1f2f9599c9144656e3ee57e2988dc79bb4b5260d
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719622948,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "free_vmoney": 1235
    },
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 331011,
        "mana_board_index": 2,
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-29 10:02:17",
        "join_time": "2024-06-12 14:42:00"
      }
    ],
    "mission_info": [
      {
        "mission_category_id": 1,
        "mission_id": 95,
        "mission_reward_id": 95001
      }
    ],
    "mail_arrived": false
  }
}
```

