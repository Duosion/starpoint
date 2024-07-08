# /latest/api/index.php/tutorial/update_step
                       
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
PARAM: a8ca172ce7c254e49daa8eea693924a1663341f3
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
Content-Length: 52
```

### Body
```
{
  "api_count": 4,
  "skip": true,
  "step": 5,
  "viewer_id": 635343250
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 20:51:52 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.7513
x-result-code: 1
param: c1e9b6cbade5fb0b5c2b0d1f7e8bed70659a5f4e
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "force_news": 2,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717793511,
    "result_code": 1
  },
  "data": {
    "bonus_index_list": [
      {
        "bonus_group_id": "goodbye_login",
        "bonus_group_type": "Limited",
        "index": 1
      },
      {
        "bonus_group_id": "normal_2022",
        "bonus_group_type": "Normal",
        "index": 1
      }
    ],
    "login_bonus_received_at": 1717793511,
    "premium_bonus_index_list": [],
    "premium_bonus_mailed_item_list": [],
    "user_info": {
      "free_vmoney": 2150
    },
    "start_dash_exchange_campaign_list": [
      {
        "campaign_id": 1,
        "gacha_id": 157,
        "term_index": 0,
        "status": 1,
        "period_start_time": 1717793511,
        "period_end_time": 1718481599
      }
    ],
    "step": 6,
    "mail_arrived": false,
    "start_time": 1717793511
  }
}
```

