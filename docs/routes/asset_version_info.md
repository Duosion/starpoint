# /latest/api/index.php/asset/version_info
                       
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
PARAM: e18d759a4407a6d5492839bdaf10b352cbd135bf
GAME-APP-ID: 635343250
SHORT_UDID: 376249241
UDID: 8959A034-38B2-49A9-9F0C-6663706E07DD0521
COUNTRY_CODE: us
APP_ID: 561429
KAKAO_PID: 12
DEVICE_LANG: en
DEVICE_NAME: SM-T860 12
APP_VER: 0.0.81
DEVICE: 2
Content-Length: 52
```

### Body
```
{
  "asset_version": "2.1.121",
  "viewer_id": 635343250
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 20:41:22 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1108
x-result-code: 1
param: c9dcb18762dfee444a34709b45e837c5db54f8b7
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": true,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717792882,
    "result_code": 1
  },
  "data": {
    "base_url": "{$cdnAddress}/en/entities/files/",
    "files_list": "{$cdnAddress}/en/entities/2.1.121-android_medium.csv",
    "total_size": 8846079322,
    "delayed_assets_size": 6919955738
  }
}
```

