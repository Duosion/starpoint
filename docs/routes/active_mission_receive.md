# /latest/api/index.php/active_mission/receive
                       
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
PARAM: ab4887deac403c6f6249606b480fdeca53eca2e5
GAME-APP-ID: 635343250
SHORT_UDID: 376249241
UDID: 8959A034-38B2-49A9-9F0C-6663706E07DD0521
RES_VER: 2.1.121
COUNTRY_CODE: us
APP_ID: 561429
KAKAO_PID: 12
DEVICE_LANG: en
DEVICE_NAME: SM-T860 12
APP_VER: 0.0.81
DEVICE: 2
Content-Length: 192
```

### Body
```
{
  "viewer_id": "<redacted>",
  "api_count": 14,
  "active_mission_list": [
    {
      "mission_id": 11010,
      "stages": [
        1
      ]
    },
    {
      "mission_id": 11020,
      "stages": [
        1
      ]
    },
    {
      "mission_id": 11070,
      "stages": [
        1
      ]
    },
    {
      "mission_id": 11090,
      "stages": [
        1
      ]
    }
  ]
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 21:07:00 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1613
x-result-code: 1
param: e49621a16b38bfd35cf2ad570ab6e2383d4903fb
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717794420,
    "result_code": 1
  },
  "data": {
    "active_mission_list": [
      {
        "mission_id": 11010,
        "progress_value": 1,
        "stages": [
          {
            "stage": 1,
            "received": true
          }
        ]
      },
      {
        "mission_id": 11020,
        "progress_value": 1,
        "stages": [
          {
            "stage": 1,
            "received": true
          }
        ]
      },
      {
        "mission_id": 11070,
        "progress_value": 2,
        "stages": [
          {
            "stage": 1,
            "received": true
          }
        ]
      },
      {
        "mission_id": 11090,
        "progress_value": 1,
        "stages": [
          {
            "stage": 1,
            "received": true
          }
        ]
      }
    ],
    "user_info": {
      "free_mana": 4528,
      "exp_pool": 1000,
      "exp_pooled_time": 1717794078
    },
    "item_list": {
      "101": 5,
      "100000": 450
    },
    "mail_arrived": false
  }
}
```

