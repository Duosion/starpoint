# /latest/api/index.php/expod/stack_to_exp
                       
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
PARAM: 028fa14e91d0d292c27e3d8168b433666fed89e4
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
Content-Length: 72
```

### Body
```
{
  "character_id": 141165,
  "api_count": 32,
  "number": 1,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 19:26:10 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.3366
x-result-code: 1
param: a74fd444edb256a538562177e70149214ee98214
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719689169,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "exp_pool": 34296,
      "exp_pooled_time": 1719688999
    },
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 141165,
        "stack": 0,
        "exp": 2241,
        "exp_total": 2241,
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-30 04:22:28",
        "join_time": "2024-06-12 14:42:29"
      }
    ],
    "converted_exp_info": {
      "add_exp": 10000
    },
    "item_list": {
      "990008": 48
    },
    "mail_arrived": false
  }
}
```

