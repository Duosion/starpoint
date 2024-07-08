# /latest/api/index.php/expod/inject_exp
                       
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
PARAM: 96c87fd7bc1086bd34f4383a78763bec67ce7089
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
Content-Length: 68
```

### Body
```
{
  "viewer_id": "<redacted>",
  "character_id": 1,
  "api_count": 1,
  "exp": 75881
}
```

## Response
### Headers
```
Date: Sat, 22 Jun 2024 21:41:38 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.5751
x-result-code: 1
param: d735f6c70233bf2d85b65b805913b0e92edee20f
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719092498,
    "result_code": 1
  },
  "data": {
    "add_exp_list": [
      {
        "character_id": 1,
        "add_exp": 75881,
        "after_exp": 76272,
        "add_exp_pool": 0
      }
    ],
    "character_list": [
      {
        "character_id": 1,
        "exp": 76272,
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-23 06:41:38",
        "join_time": "2024-06-11 07:33:19",
        "exp_total": 76272
      }
    ],
    "user_info": {
      "exp_pool": 383990,
      "exp_pooled_time": 1719091999,
      "free_vmoney": 1725
    },
    "mission_info": [
      {
        "mission_category_id": 1,
        "mission_id": 9,
        "mission_reward_id": 9007
      }
    ],
    "active_mission_list": [
      {
        "mission_id": 12030,
        "progress_value": 70,
        "stages": []
      }
    ],
    "mail_arrived": false
  }
}
```

