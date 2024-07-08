# /latest/api/index.php/mail/receive
                       
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
PARAM: 0d56c4f01c024b647b899795a1728c3f7f200bbf
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
Content-Length: 56
```

### Body
```
{
  "mail_id": 2413975,
  "api_count": 48,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 19:27:59 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1534
x-result-code: 1
param: b7d57164bf28ae0c81cd01122f443fe633bbebb1
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719689279,
    "result_code": 1
  },
  "data": {
    "character_list": [
      {
        "viewer_id": "<redacted>",
        "character_id": 151165,
        "stack": 1,
        "exp": 153988,
        "exp_total": 153988,
        "create_time": "2024-06-11 07:33:19",
        "update_time": "2024-06-29 09:35:14",
        "join_time": "2024-06-29 09:24:51"
      }
    ],
    "dispose_expired_mail": false,
    "auto_sale_expired_mail": false,
    "total_count": 14,
    "item_list": {
      "14018": 103
    },
    "mail_arrived": true
  }
}
```

