# /latest/api/index.php/multi_battle_quest/share_room
                       
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
PARAM: 656013ce0edd0f57be971e0e6a85e123a2e6cdd8
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
Content-Length: 120
```

### Body
```
{
  "api_count": 57,
  "quest_id": 500009002,
  "category": 19,
  "viewer_id": "<redacted>",
  "room_number": "126523",
  "share_type_list": [
    3
  ]
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 00:50:52 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1159
x-result-code: 1
param: ea8bae1398c8fea85429300b9a551f0d39a16845
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719622252,
    "result_code": 1
  },
  "data": {
    "config": {
      "attention_recruitment_interval_seconds": 15,
      "attention_recruitment_redeliver_limit": 20,
      "attention_polling_interval_seconds_normal": 10,
      "attention_polling_interval_seconds_battle": 15,
      "multi_attention_lifetime_seconds": 30,
      "contribution_score_rate_to_parasite": 0.25,
      "attention_log_interval_seconds": 600,
      "disable_finish_duration_seconds": 5,
      "disable_decline_count_seconds": 60,
      "disable_decline_count_limit": 14,
      "disable_decline_duration_seconds": 30,
      "disable_intent_disconnect_duration_seconds": 300,
      "disable_unintent_disconnect_duration_seconds": 5,
      "disable_remote_error_duration_seconds": 300,
      "attention_animation_time_seconds": 6,
      "disable_expire_count_limit": 4,
      "disable_expire_duration_seconds": 180,
      "polling_delay_normal_seconds_range_min": 1,
      "polling_delay_normal_seconds_range_max": 10,
      "polling_delay_battle_seconds_range_min": 1,
      "polling_delay_battle_seconds_range_max": 15,
      "return_attention_max_num": 3
    }
  }
}
```

