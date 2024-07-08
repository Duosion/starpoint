# /latest/api/index.php/party/edit
                       
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
PARAM: ea91d4a20ff82f24a34e09968f22daf2f42e1f4b
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
Content-Length: 388
```

### Body
```
{
  "api_count": 13,
  "ignore_ngword": true,
  "party_info_list": [
    {
      "unison_character_ids": [
        null,
        null,
        null
      ],
      "party_category": 1,
      "party_edited": true,
      "equipment_ids": [
        2010002,
        null,
        null
      ],
      "options": {
        "allow_other_players_to_heal_me": true
      },
      "character_ids": [
        1,
        221017,
        211044
      ],
      "party_name": "Party A",
      "party_id": 1,
      "ability_soul_ids": [
        null,
        null,
        null
      ]
    }
  ],
  "main_party_id": 1,
  "viewer_id": "<redacted>",
  "use_party_group_edit": false
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 21:06:53 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1311
x-result-code: 1
param: 4f0e578df36b1b8b630ca90acba57e2ce5526c54
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717794413,
    "result_code": 1
  },
  "data": {
    "mail_arrived": false
  }
}
```

