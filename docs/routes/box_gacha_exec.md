# /latest/api/index.php/box_gacha/exec
                       
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
PARAM: b38bd417d589a1bb62c42a6e70e87a84327dd741
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
Content-Length: 116
```

### Body
```
{
  "stop_on_featured_rewards": false,
  "box_gacha_id": 1011,
  "box_id": 1,
  "api_count": 65,
  "viewer_id": "<redacted>",
  "number": 42
}
```

## Response
### Headers
```
Date: Sat, 29 Jun 2024 00:52:37 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1782
x-result-code: 1
param: 889f4c1327ab0c9ca76d0bc265feaa46777dffae
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719622357,
    "result_code": 1
  },
  "data": {
    "drawn_reward_list": [
      {
        "reward_id": 1101101014,
        "number": 9
      },
      {
        "reward_id": 1101101018,
        "number": 3
      },
      {
        "reward_id": 1101101008,
        "number": 1
      },
      {
        "reward_id": 1101101009,
        "number": 3
      },
      {
        "reward_id": 1101101010,
        "number": 4
      },
      {
        "reward_id": 1101101017,
        "number": 3
      },
      {
        "reward_id": 1101101011,
        "number": 10
      },
      {
        "reward_id": 1101101015,
        "number": 7
      },
      {
        "reward_id": 1101101016,
        "number": 1
      },
      {
        "reward_id": 1101101004,
        "number": 1
      }
    ],
    "all_box_info": [
      {
        "box_id": 1,
        "reset_times": 0,
        "all_drawn_reward_list": [
          {
            "reward_id": 1101101003,
            "number": 1
          },
          {
            "reward_id": 1101101004,
            "number": 1
          },
          {
            "reward_id": 1101101008,
            "number": 1
          },
          {
            "reward_id": 1101101009,
            "number": 3
          },
          {
            "reward_id": 1101101010,
            "number": 7
          },
          {
            "reward_id": 1101101011,
            "number": 14
          },
          {
            "reward_id": 1101101012,
            "number": 1
          },
          {
            "reward_id": 1101101013,
            "number": 1
          },
          {
            "reward_id": 1101101014,
            "number": 10
          },
          {
            "reward_id": 1101101015,
            "number": 9
          },
          {
            "reward_id": 1101101016,
            "number": 1
          },
          {
            "reward_id": 1101101017,
            "number": 6
          },
          {
            "reward_id": 1101101018,
            "number": 4
          }
        ],
        "coming_next_reward_list": [
          1101101014,
          1101101011,
          1101101018
        ],
        "is_closed": false
      },
      {
        "box_id": 2,
        "reset_times": 0,
        "all_drawn_reward_list": [],
        "coming_next_reward_list": [
          1101102014,
          1101102011,
          1101102013
        ],
        "is_closed": false
      },
      {
        "box_id": 3,
        "reset_times": 0,
        "all_drawn_reward_list": [],
        "coming_next_reward_list": [
          1101103011,
          1101103010,
          1101103010
        ],
        "is_closed": false
      },
      {
        "box_id": 4,
        "reset_times": 0,
        "all_drawn_reward_list": [],
        "coming_next_reward_list": [
          1101104015,
          1101104015,
          1101104019
        ],
        "is_closed": false
      },
      {
        "box_id": 5,
        "reset_times": 0,
        "all_drawn_reward_list": [],
        "coming_next_reward_list": [
          1101105035,
          1101105021,
          1101105035
        ],
        "is_closed": false
      }
    ],
    "user_info": {
      "free_mana": 177539,
      "exp_pool": 109052,
      "exp_pooled_time": 1719621799
    },
    "item_list": {
      "30132": 4,
      "45": 1,
      "44": 3,
      "11001": 1,
      "47": 189,
      "43": 9,
      "42": 48,
      "46": 237,
      "101": 31
    },
    "mail_arrived": false
  }
}
```

