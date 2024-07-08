# /latest/api/index.php/mission/update_mission_progress
                       
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
PARAM: e7d01edcfb3924da45585b4e2d2803ca3b9e62ad
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
Content-Length: 148
```

### Body
```
{
  "viewer_id": "<redacted>",
  "api_count": 63,
  "mission_param_list": [
    {
      "progress_value": 1,
      "mission_pattern": "home_tap_town_character_count"
    }
  ]
}
```

## Response
### Headers
```
Date: Fri, 05 Jul 2024 00:04:59 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1374
x-result-code: 1
param: 68d91c73af6d180a2972f1294db58c622191360b
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1720137899,
    "result_code": 1
  },
  "data": {
    "mission_info": [
      {
        "mission_category_id": 5,
        "mission_id": 49000,
        "mission_reward_id": 49000001
      }
    ],
    "degree_list": [
      {
        "viewer_id": "<redacted>",
        "degree_id": 49000
      }
    ],
    "mail_arrived": false
  }
}
```

