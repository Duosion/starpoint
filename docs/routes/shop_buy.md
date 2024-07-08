# /latest/api/index.php/shop/buy
                       
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
PARAM: 1c010e0b03cb5427e430b069823be7daecb50299
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
Content-Length: 88
```

### Body
```
{
  "shop_type": 2,
  "api_count": 64,
  "shop_item_id": 200032,
  "number": 1,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Fri, 05 Jul 2024 00:05:03 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.4999
x-result-code: 1
param: 23af97e7d8a73dbaa2a460f3157d94003a55bf9d
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1720137902,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "free_mana": 445749
    },
    "item_list": {
      "3": 267
    },
    "active_mission_list": [
      {
        "mission_id": 12010,
        "progress_value": 146,
        "stages": []
      }
    ],
    "mail_arrived": false
  }
}
```

