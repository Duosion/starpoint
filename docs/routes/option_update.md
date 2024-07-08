# /latest/api/index.php/option/update
                       
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
PARAM: 2b531d6f31ea163b4fe389048583929ec4b4b025
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
Content-Length: 328
```

### Body
```
{
  "api_count": 9,
  "viewer_id": "<redacted>",
  "option_params": {
    "attention_sound_effect": true,
    "gacha_play_no_rarity_up_movie": false,
    "attention_enable_in_battle": true,
    "number_notation_symbol": true,
    "attention_vibration": false,
    "simple_ability_description": false,
    "room_number_hidden": false,
    "payment_alert": true,
    "auto_play": true
  }
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 20:53:03 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1156
x-result-code: 1
param: b898a552fe7466078b4fd336450e7c162e44e604
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717793583,
    "result_code": 1
  },
  "data": {
    "user_option": {
      "gacha_play_no_rarity_up_movie": false,
      "auto_play": true,
      "number_notation_symbol": true,
      "payment_alert": true,
      "room_number_hidden": false,
      "attention_sound_effect": true,
      "attention_vibration": false,
      "attention_enable_in_battle": true,
      "simple_ability_description": false
    },
    "mail_arrived": false
  }
}
```

