# /latest/api/index.php/equipment/upgrade
                       
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
PARAM: 8c94bd7178b7b3e2c2e0c7d5dd2ba0e75a1b0ace
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
Content-Length: 96
```

### Body
```
{
  "upgrade_count": 3,
  "equipment_id": 5030037,
  "api_count": 19,
  "use_stack": true,
  "viewer_id": 297417490
}
```

## Response
### Headers
```
Date: Fri, 21 Jun 2024 03:30:46 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 1.1898
x-result-code: 1
param: 12210c4356129aff31d25c29d1798a84ff23a7ae
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1718940645,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "free_vmoney": 1145
    },
    "equipment_list": [
      {
        "null": 1,
        "viewer_id": "<redacted>",
        "equipment_id": 5030037,
        "protection": true,
        "level": 5,
        "enhancement_level": 0,
        "stack": 0
      }
    ],
    "item_list": {
      "100000": 550,
      "5030037": 4
    },
    "mission_info": [
      {
        "mission_category_id": 1,
        "mission_id": 67,
        "mission_reward_id": 67002
      },
      {
        "mission_category_id": 1,
        "mission_id": 68,
        "mission_reward_id": 68001
      }
    ],
    "active_mission_list": [
      {
        "mission_id": 14050,
        "progress_value": 1,
        "stages": [
          {
            "stage": 1,
            "received": false
          }
        ]
      },
      {
        "mission_id": 11030,
        "progress_value": 4,
        "stages": []
      },
      {
        "mission_id": 14110,
        "progress_value": 1,
        "stages": []
      }
    ],
    "mail_arrived": false
  }
}
```

