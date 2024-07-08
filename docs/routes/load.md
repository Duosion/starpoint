# /latest/api/index.php/load
                       
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
PARAM: 0a0cb7b1ed99c6d9d195f7963f412cec7f06498d
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
Content-Length: 828
```

### Body
```
{
  "viewer_id": "<redacted>",
  "app_admin": "c14e19deb5c734b93a5e65c4d2099e0c",
  "kakao_pid": "984521158255",
  "device_id": 4122805419139.0,
  "app_secret": "8a4421148b884608bb96862f3988d832",
  "keychain": 297417490,
  "storage_directory_path": "/data/user/0/com.kakaogames.wdfp/com.kakaogames.wdfp/Local Store/production---latest",
  "access_token": "fwPla7fQ8ty9+DZT/lD//nyWgEkxiN7JK2IlVXGd11+PkcX4trFepNv89MWRjb3QBMvVNdzC3N3exXCcothFx5uO6n2TmK/SMinDhQbX2NTHAnVP8vl16TuqMoupzd+BG0PS0tDBx0of59jnS6h2au5MbNMORBAFQGVIx9P9rnEGwJuHby4+vtl6PNGWwlMxGdmekU8a35BVDpf0dnyFqlOUU+DFRQOoV03I5rCiJwiCKQZFFpuMoocgGlmAh60W",
  "graphics_device_name": "OpenGL (Baseline Extended)",
  "platform_os_version": "Android 14"
}
```

## Response
### Headers
```
Date: Sat, 22 Jun 2024 21:41:03 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.7012
x-result-code: 1
param: 9d197af41ba4d8536fb7a14c63e5824a2a81c835
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719092463,
    "result_code": 1
  },
  "data": {
    "user_info": {
      "stamina": 140,
      "stamina_heal_time": 1719092463,
      "boost_point": 3,
      "boss_boost_point": 3,
      "transition_state": 0,
      "role": 1,
      "name": "\u30c7\u30e5\u30aa",
      "last_login_time": "2024-06-23 05:11:13",
      "comment": "Nice to meet you.",
      "vmoney": 0,
      "free_vmoney": 1715,
      "rank_point": 252,
      "star_crumb": 0,
      "bond_token": 0,
      "exp_pool": 459871,
      "exp_pooled_time": 1719091999,
      "leader_character_id": 121153,
      "party_slot": 11,
      "degree_id": 1,
      "birth": 19900101,
      "free_mana": 355442,
      "paid_mana": 0,
      "enable_auto_3x": false
    },
    "premium_bonus_list": [],
    "expired_premium_bonus_list": null,
    "user_daily_challenge_point_list": [
      {
        "id": 1,
        "point": 2,
        "campaign_list": [
          {
            "campaign_id": 2023013101,
            "additional_point": 2
          }
        ]
      },
      {
        "id": 251,
        "point": 2,
        "campaign_list": [
          {
            "campaign_id": 2023013102,
            "additional_point": 2
          }
        ]
      },
      {
        "id": 5001,
        "point": 10,
        "campaign_list": []
      },
      {
        "id": 10008,
        "point": 1,
        "campaign_list": []
      }
    ],
    "bonus_index_list": [],
    "premium_bonus_index_list": [],
    "premium_bonus_mailed_item_list": [],
    "user_notice_list": [
      {
        "kind": 1,
        "status": 1
      }
    ],
    "user_triggered_tutorial": [
      4,
      5,
      6,
      8,
      9,
      12,
      13,
      14,
      17,
      18,
      19,
      22,
      51,
      52,
      55,
      57,
      58,
      101
    ],
    "cleared_regular_mission_list": {
      "1": 4,
      "2": 3,
      "3": 3,
      "4": 3,
      "5": 1,
      "6": 2,
      "7": 2,
      "8": 4,
      "9": 6,
      "10": 1,
      "22": 1,
      "23": 1,
      "24": 5,
      "30": 3,
      "32": 11,
      "33": 2,
      "34": 2,
      "35": 2,
      "37": 2,
      "38": 2,
      "40": 5,
      "42": 1,
      "43": 1,
      "44": 1,
      "66": 3,
      "67": 2,
      "68": 1,
      "109": 1,
      "108": 9
    },
    "user_character_list": {
      "1": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718058799,
        "update_time": 1718304236,
        "exp": 391,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "111147": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 1,
        "protection": false,
        "join_time": 1718244925,
        "update_time": 1718941721,
        "exp": 818,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "121002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940384,
        "update_time": 1718940384,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "121087": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940357,
        "update_time": 1719092358,
        "exp": 180,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "121153": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940510,
        "update_time": 1719092358,
        "exp": 180,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "131032": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "131152": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244975,
        "update_time": 1718244975,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "141033": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "141165": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718941721,
        "exp": 1067,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "151129": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1719023392,
        "update_time": 1719023392,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "151147": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718432667,
        "update_time": 1718432667,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "161129": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718597952,
        "update_time": 1718597952,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718941721,
        "exp": 696,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170677,
        "update_time": 1718244692,
        "exp": 401,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940471,
        "update_time": 1718940471,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 2,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718941721,
        "exp": 696,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718941721,
        "exp": 696,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211010": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718597952,
        "update_time": 1718597952,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211011": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 1,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718835341,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211012": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244783,
        "update_time": 1718244783,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211013": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940549,
        "update_time": 1718940549,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211020": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244824,
        "update_time": 1718244824,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211032": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "211050": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718430230,
        "update_time": 1718430230,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "221001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244975,
        "update_time": 1718244975,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "221007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1719092358,
        "exp": 180,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "221028": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1719092358,
        "exp": 180,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1719023392,
        "update_time": 1719023392,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231009": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940406,
        "update_time": 1718940406,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231044": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1719023392,
        "update_time": 1719023392,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231063": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718430230,
        "update_time": 1718430230,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "231093": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244783,
        "update_time": 1718244783,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "241001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "241015": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718835224,
        "update_time": 1718835224,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "241045": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718835224,
        "update_time": 1718835224,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "241051": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718597952,
        "update_time": 1718597952,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "243001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170689,
        "update_time": 1718170689,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940510,
        "update_time": 1718940510,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251005": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 3,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718941625,
        "update_time": 1718941625,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251035": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251047": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251065": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "251071": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718941625,
        "update_time": 1718941625,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940549,
        "update_time": 1718940549,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261005": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718835224,
        "update_time": 1718835224,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261011": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261035": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718430230,
        "update_time": 1718430230,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261047": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940406,
        "update_time": 1718940406,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "261065": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718495650,
        "exp": 37241,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311008": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718835224,
        "update_time": 1718835224,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311009": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244783,
        "update_time": 1718244783,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311011": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311012": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311013": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "311019": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244925,
        "update_time": 1718244925,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321008": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321009": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321010": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1719023392,
        "update_time": 1719023392,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321011": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 4,
        "protection": false,
        "join_time": 1718244783,
        "update_time": 1719092358,
        "exp": 184,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321012": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718597952,
        "update_time": 1719092358,
        "exp": 180,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "321013": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244975,
        "update_time": 1718244975,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244824,
        "update_time": 1718244824,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331005": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244824,
        "update_time": 1718244824,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331010": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331011": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 4,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331012": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244925,
        "update_time": 1718244925,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331013": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940510,
        "update_time": 1718940510,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331014": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1719023392,
        "update_time": 1719023392,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "331020": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244824,
        "update_time": 1718244824,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244783,
        "update_time": 1718244783,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940549,
        "update_time": 1718940549,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341005": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718430230,
        "update_time": 1718430230,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244925,
        "update_time": 1718244925,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341008": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718597952,
        "update_time": 1718597952,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341009": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244975,
        "update_time": 1718244975,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341010": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244783,
        "update_time": 1718244783,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "341011": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718597952,
        "update_time": 1718597952,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940406,
        "update_time": 1718940406,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718430230,
        "update_time": 1718430230,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351005": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718425597,
        "update_time": 1718425597,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718245031,
        "update_time": 1718245031,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351008": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351009": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244867,
        "update_time": 1718244867,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "351021": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718430230,
        "update_time": 1718430230,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244975,
        "update_time": 1718244975,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361002": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 3,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361003": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170949,
        "update_time": 1718170949,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361005": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940510,
        "update_time": 1718940510,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718170920,
        "update_time": 1718170920,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361007": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718229095,
        "update_time": 1718229095,
        "exp": 0,
        "stack": 3,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361008": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244824,
        "update_time": 1718244824,
        "exp": 0,
        "stack": 2,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361009": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244824,
        "update_time": 1718244824,
        "exp": 0,
        "stack": 3,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361021": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244925,
        "update_time": 1718244925,
        "exp": 0,
        "stack": 1,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "361033": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940549,
        "update_time": 1718940549,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "442006": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244566,
        "update_time": 1718244566,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "512001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718940911,
        "update_time": 1718940911,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "532001": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718244692,
        "update_time": 1718244692,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      },
      "532004": {
        "entry_count": 1,
        "evolution_level": 0,
        "over_limit_step": 0,
        "protection": false,
        "join_time": 1718941167,
        "update_time": 1718941167,
        "exp": 0,
        "stack": 0,
        "bond_token_list": [
          {
            "mana_board_index": 1,
            "status": 0
          },
          {
            "mana_board_index": 2,
            "status": 0
          }
        ],
        "mana_board_index": 1
      }
    },
    "user_character_mana_node_list": {
      "111147": [
        222294201
      ],
      "311002": [
        622004201,
        622004202,
        622004203,
        622004204,
        622004205
      ]
    },
    "user_party_group_list": {
      "1": {
        "list": {
          "1": {
            "name": "Party A",
            "character_ids": [
              311002,
              141165,
              111147
            ],
            "unison_character_ids": [
              211004,
              211006,
              211001
            ],
            "equipment_ids": [
              1010001,
              2010002,
              4010014
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": true,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "2": {
            "name": "Party B",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "3": {
            "name": "Party C",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "4": {
            "name": "Party D",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "5": {
            "name": "Party E",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "6": {
            "name": "Party F",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "7": {
            "name": "Party G",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "8": {
            "name": "Party H",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "9": {
            "name": "Party I",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "10": {
            "name": "Party J",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          }
        },
        "color_id": 6
      },
      "2": {
        "list": {
          "11": {
            "name": "Party A",
            "character_ids": [
              121153,
              121087,
              321011
            ],
            "unison_character_ids": [
              221028,
              221007,
              321012
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": true,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "12": {
            "name": "Party B",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "13": {
            "name": "Party C",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "14": {
            "name": "Party D",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "15": {
            "name": "Party E",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "16": {
            "name": "Party F",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "17": {
            "name": "Party G",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "18": {
            "name": "Party H",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "19": {
            "name": "Party I",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "20": {
            "name": "Party J",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          }
        },
        "color_id": 15
      },
      "3": {
        "list": {
          "21": {
            "name": "Party A",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "22": {
            "name": "Party B",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "23": {
            "name": "Party C",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "24": {
            "name": "Party D",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "25": {
            "name": "Party E",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "26": {
            "name": "Party F",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "27": {
            "name": "Party G",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "28": {
            "name": "Party H",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "29": {
            "name": "Party I",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "30": {
            "name": "Party J",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          }
        },
        "color_id": 15
      },
      "4": {
        "list": {
          "31": {
            "name": "Party A",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "32": {
            "name": "Party B",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "33": {
            "name": "Party C",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "34": {
            "name": "Party D",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "35": {
            "name": "Party E",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "36": {
            "name": "Party F",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "37": {
            "name": "Party G",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "38": {
            "name": "Party H",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "39": {
            "name": "Party I",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "40": {
            "name": "Party J",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          }
        },
        "color_id": 15
      },
      "5": {
        "list": {
          "41": {
            "name": "Party A",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "42": {
            "name": "Party B",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "43": {
            "name": "Party C",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "44": {
            "name": "Party D",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "45": {
            "name": "Party E",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "46": {
            "name": "Party F",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "47": {
            "name": "Party G",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "48": {
            "name": "Party H",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "49": {
            "name": "Party I",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "50": {
            "name": "Party J",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          }
        },
        "color_id": 15
      },
      "6": {
        "list": {
          "51": {
            "name": "Party A",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "52": {
            "name": "Party B",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "53": {
            "name": "Party C",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "54": {
            "name": "Party D",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "55": {
            "name": "Party E",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "56": {
            "name": "Party F",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "57": {
            "name": "Party G",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "58": {
            "name": "Party H",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "59": {
            "name": "Party I",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          },
          "60": {
            "name": "Party J",
            "character_ids": [
              1,
              141165,
              211002
            ],
            "unison_character_ids": [
              111147,
              131152,
              231093
            ],
            "equipment_ids": [
              null,
              null,
              null
            ],
            "ability_soul_ids": [
              null,
              null,
              null
            ],
            "edited": false,
            "options": {
              "allow_other_players_to_heal_me": true
            }
          }
        },
        "color_id": 15
      }
    },
    "item_list": {
      "1": 223,
      "2": 165,
      "3": 91,
      "4": 45,
      "5": 664,
      "6": 562,
      "7": 298,
      "8": 76,
      "9": 18,
      "13": 215,
      "14": 98,
      "15": 47,
      "16": 20,
      "42": 34,
      "43": 2,
      "46": 228,
      "47": 179,
      "48": 99,
      "49": 30,
      "50": 10,
      "59": 10,
      "99": 622,
      "101": 24,
      "102": 2024,
      "10001": 0,
      "10003": 1,
      "12002": 4,
      "14001": 7,
      "14002": 9,
      "14003": 100,
      "14004": 9,
      "14006": 103,
      "14007": 14,
      "14009": 100,
      "14010": 8,
      "14011": 1,
      "14012": 100,
      "14013": 18,
      "14014": 3,
      "14015": 100,
      "14016": 3,
      "14017": 6,
      "14018": 100,
      "14037": 110,
      "14040": 9,
      "30028": 4,
      "40000": 30,
      "40020": 4,
      "49100": 80,
      "60007": 4,
      "100000": 875,
      "500000": 3,
      "980006": 0,
      "999005": 0,
      "5030037": 4
    },
    "user_equipment_list": {
      "100001": {
        "level": 1,
        "enhancement_level": 0,
        "protection": false,
        "stack": 0
      },
      "1010001": {
        "level": 1,
        "enhancement_level": 0,
        "protection": true,
        "stack": 3
      },
      "2010002": {
        "level": 1,
        "enhancement_level": 0,
        "protection": true,
        "stack": 2
      },
      "3060007": {
        "level": 1,
        "enhancement_level": 0,
        "protection": false,
        "stack": 0
      },
      "4010014": {
        "level": 1,
        "enhancement_level": 0,
        "protection": false,
        "stack": 0
      },
      "5030037": {
        "level": 5,
        "enhancement_level": 0,
        "protection": true,
        "stack": 0
      }
    },
    "user_character_from_town_history": [
      {
        "character_id": 512001
      }
    ],
    "quest_progress": {
      "1": [
        {
          "quest_id": 1001001,
          "finished": true
        },
        {
          "quest_id": 1001002,
          "finished": true,
          "high_score": 49407,
          "clear_rank": 5,
          "best_elapsed_time_ms": 23528
        },
        {
          "quest_id": 1001003,
          "finished": true
        },
        {
          "quest_id": 1002001,
          "finished": true,
          "high_score": 64917,
          "clear_rank": 5,
          "best_elapsed_time_ms": 27880
        },
        {
          "quest_id": 1002002,
          "finished": true,
          "high_score": 85273,
          "clear_rank": 5,
          "best_elapsed_time_ms": 29189
        },
        {
          "quest_id": 1003001,
          "finished": true
        },
        {
          "quest_id": 1003002,
          "finished": true,
          "high_score": 116044,
          "clear_rank": 5,
          "best_elapsed_time_ms": 29376
        },
        {
          "quest_id": 1004001,
          "finished": true
        },
        {
          "quest_id": 1004002,
          "finished": true,
          "high_score": 91404,
          "clear_rank": 5,
          "best_elapsed_time_ms": 8058
        },
        {
          "quest_id": 1004003,
          "finished": true
        },
        {
          "quest_id": 1005001,
          "finished": true,
          "high_score": 148619,
          "clear_rank": 5,
          "best_elapsed_time_ms": 33592
        },
        {
          "quest_id": 1005002,
          "finished": true,
          "high_score": 184842,
          "clear_rank": 5,
          "best_elapsed_time_ms": 49793
        },
        {
          "quest_id": 1006001,
          "finished": true
        },
        {
          "quest_id": 1006002,
          "finished": true,
          "high_score": 108058,
          "clear_rank": 5,
          "best_elapsed_time_ms": 34986
        },
        {
          "quest_id": 1006003,
          "finished": true,
          "high_score": 129405,
          "clear_rank": 5,
          "best_elapsed_time_ms": 34255
        },
        {
          "quest_id": 1007001,
          "finished": true
        },
        {
          "quest_id": 1007002,
          "finished": true,
          "high_score": 283953,
          "clear_rank": 5,
          "best_elapsed_time_ms": 33711
        },
        {
          "quest_id": 1008001,
          "finished": true
        },
        {
          "quest_id": 1008002,
          "finished": true,
          "high_score": 171829,
          "clear_rank": 5,
          "best_elapsed_time_ms": 37723
        },
        {
          "quest_id": 1008003,
          "finished": true
        },
        {
          "quest_id": 1008004,
          "finished": true
        },
        {
          "quest_id": 2001001,
          "finished": true
        },
        {
          "quest_id": 2001002,
          "finished": true,
          "high_score": 138961,
          "clear_rank": 5,
          "best_elapsed_time_ms": 51846
        },
        {
          "quest_id": 2001003,
          "finished": true,
          "high_score": 180598,
          "clear_rank": 5,
          "best_elapsed_time_ms": 27578
        },
        {
          "quest_id": 2002001,
          "finished": true
        },
        {
          "quest_id": 2002002,
          "finished": true,
          "high_score": 175267,
          "clear_rank": 5,
          "best_elapsed_time_ms": 43639
        },
        {
          "quest_id": 2002003,
          "finished": true
        },
        {
          "quest_id": 2003001,
          "finished": true,
          "high_score": 130381,
          "clear_rank": 5,
          "best_elapsed_time_ms": 43010
        },
        {
          "quest_id": 2003002,
          "finished": true,
          "high_score": 204906,
          "clear_rank": 5,
          "best_elapsed_time_ms": 38828
        },
        {
          "quest_id": 2004001,
          "finished": true,
          "high_score": 301412,
          "clear_rank": 5,
          "best_elapsed_time_ms": 42840
        },
        {
          "quest_id": 2004002,
          "finished": true,
          "high_score": 340732,
          "clear_rank": 5,
          "best_elapsed_time_ms": 49041
        },
        {
          "quest_id": 2004003,
          "finished": true
        },
        {
          "quest_id": 2005001,
          "finished": true,
          "high_score": 144210,
          "clear_rank": 5,
          "best_elapsed_time_ms": 9673
        },
        {
          "quest_id": 2005002,
          "finished": true,
          "high_score": 354019,
          "clear_rank": 5,
          "best_elapsed_time_ms": 58144
        }
      ],
      "2": [
        {
          "quest_id": 1001001,
          "finished": true,
          "high_score": 573469,
          "clear_rank": 5,
          "best_elapsed_time_ms": 107882
        }
      ],
      "3": [
        {
          "quest_id": 101,
          "finished": true
        }
      ],
      "4": [
        {
          "quest_id": 1001001,
          "finished": true,
          "high_score": 295324,
          "clear_rank": 5,
          "best_elapsed_time_ms": 26367
        }
      ],
      "7": [
        {
          "quest_id": 200016001,
          "finished": false
        }
      ],
      "13": [
        {
          "quest_id": 2003,
          "finished": true,
          "high_score": 140116,
          "clear_rank": 5,
          "best_elapsed_time_ms": 18938
        },
        {
          "quest_id": 2006,
          "finished": true,
          "high_score": 246665,
          "clear_rank": 5,
          "best_elapsed_time_ms": 23018
        }
      ],
      "18": [
        {
          "quest_id": 400006001,
          "finished": true
        },
        {
          "quest_id": 400006002,
          "finished": true,
          "high_score": 169855,
          "clear_rank": 5,
          "best_elapsed_time_ms": 53114
        },
        {
          "quest_id": 500009001,
          "finished": true
        }
      ]
    },
    "last_main_quest_id": 1001001,
    "gacha_info_list": [
      {
        "gacha_id": 2,
        "is_daily_first": true,
        "is_account_first": true
      },
      {
        "gacha_id": 4,
        "is_daily_first": true,
        "is_account_first": true
      },
      {
        "gacha_id": 900003,
        "is_daily_first": true,
        "is_account_first": true
      },
      {
        "gacha_id": 157,
        "is_daily_first": true,
        "is_account_first": false,
        "gacha_exchange_point": 190
      },
      {
        "gacha_id": 57,
        "is_daily_first": true,
        "is_account_first": true
      },
      {
        "gacha_id": 5033,
        "is_daily_first": true,
        "is_account_first": false,
        "gacha_exchange_point": 1
      },
      {
        "gacha_id": 900000,
        "is_daily_first": true,
        "is_account_first": true
      },
      {
        "gacha_id": 155,
        "is_daily_first": true,
        "is_account_first": true,
        "gacha_exchange_point": 0
      },
      {
        "gacha_id": 9,
        "is_daily_first": true,
        "is_account_first": true
      }
    ],
    "available_asset_version": "2.1.122",
    "should_prompt_takeover_registration": false,
    "has_unread_news_item": false,
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
    "drawn_quest_list": [
      {
        "category_id": 6,
        "quest_id": 1001,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 1002,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 1003,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 1004,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 1005,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 2001,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 2002,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 2003,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 2004,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 2005,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 3001,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 3002,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 3003,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 3004,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 3005,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 4001,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 4002,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 4003,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 4004,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 4005,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 5001,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 5002,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 5003,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 5004,
        "odds_id": 7
      },
      {
        "category_id": 6,
        "quest_id": 5005,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 6001,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 6002,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 6003,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 6004,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 6005,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 7001,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 7002,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 7003,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 7004,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 7005,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 8001,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 8002,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 8003,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 8004,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 8005,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 9001,
        "odds_id": 7
      },
      {
        "category_id": 6,
        "quest_id": 9002,
        "odds_id": 7
      },
      {
        "category_id": 6,
        "quest_id": 9003,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 9004,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 9005,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 10001,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 10002,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 10003,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 10004,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 10005,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 11001,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 11002,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 11003,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 11004,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 11005,
        "odds_id": 7
      },
      {
        "category_id": 6,
        "quest_id": 12001,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 12002,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 12003,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 12004,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 12005,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 13001,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 13002,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 13003,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 13004,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 13005,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 13006,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 14001,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 14002,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 14003,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 14004,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 14005,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 14006,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 15001,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 15002,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 15003,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 15004,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 15005,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 15006,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 16001,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 16002,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 16003,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 16004,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 16005,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 16006,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 17001,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 17002,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 17003,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 17004,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 17005,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 17006,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 18001,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 18002,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 18003,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 18004,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 18005,
        "odds_id": 3
      },
      {
        "category_id": 6,
        "quest_id": 18006,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 19001,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 19002,
        "odds_id": 7
      },
      {
        "category_id": 6,
        "quest_id": 19003,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 19004,
        "odds_id": 9
      },
      {
        "category_id": 6,
        "quest_id": 19005,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 19006,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 19007,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 19008,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 19009,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 19010,
        "odds_id": 1
      },
      {
        "category_id": 6,
        "quest_id": 19011,
        "odds_id": 8
      },
      {
        "category_id": 6,
        "quest_id": 19012,
        "odds_id": 5
      },
      {
        "category_id": 6,
        "quest_id": 19013,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 19014,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 19015,
        "odds_id": 6
      },
      {
        "category_id": 6,
        "quest_id": 19016,
        "odds_id": 2
      },
      {
        "category_id": 6,
        "quest_id": 19017,
        "odds_id": 4
      },
      {
        "category_id": 6,
        "quest_id": 19018,
        "odds_id": 4
      },
      {
        "category_id": 14,
        "quest_id": 1001,
        "odds_id": 24
      },
      {
        "category_id": 14,
        "quest_id": 1002,
        "odds_id": 14
      },
      {
        "category_id": 14,
        "quest_id": 1003,
        "odds_id": 2
      },
      {
        "category_id": 14,
        "quest_id": 1004,
        "odds_id": 16
      },
      {
        "category_id": 14,
        "quest_id": 1005,
        "odds_id": 24
      },
      {
        "category_id": 14,
        "quest_id": 1006,
        "odds_id": 28
      }
    ],
    "mail_arrived": false,
    "user_periodic_reward_point_list": [
      {
        "id": 2,
        "point": 2
      },
      {
        "id": 3,
        "point": 2
      },
      {
        "id": 10000000,
        "point": 2
      }
    ],
    "all_active_mission_list": {
      "11010": {
        "progress": 1,
        "stages": {
          "1": true
        }
      },
      "11020": {
        "progress": 1,
        "stages": {
          "1": true
        }
      },
      "11030": {
        "progress": 4,
        "stages": {
          "1": true
        }
      },
      "11040": {
        "progress": 1,
        "stages": {
          "1": true
        }
      },
      "11050": {
        "progress": 1,
        "stages": {
          "1": true
        }
      },
      "11070": {
        "progress": 6,
        "stages": {
          "1": true
        }
      },
      "11090": {
        "progress": 1,
        "stages": {
          "1": true
        }
      },
      "11110": {
        "progress": 7,
        "stages": []
      },
      "12030": {
        "progress": 60,
        "stages": {
          "1": false
        }
      },
      "12080": {
        "progress": 1,
        "stages": []
      },
      "12110": {
        "progress": 1,
        "stages": []
      },
      "13040": {
        "progress": 8,
        "stages": {
          "1": false
        }
      },
      "13100": {
        "progress": 3,
        "stages": {
          "1": false
        }
      },
      "13110": {
        "progress": 2,
        "stages": []
      },
      "14050": {
        "progress": 1,
        "stages": {
          "1": false
        }
      },
      "14110": {
        "progress": 1,
        "stages": []
      }
    },
    "cleared_collect_item_event_mission_list": [],
    "box_gacha_list": {
      "1011": [
        {
          "box_id": 1,
          "reset_times": 0,
          "remaining_number": 572,
          "is_closed": false
        },
        {
          "box_id": 2,
          "reset_times": 0,
          "remaining_number": 647,
          "is_closed": false
        },
        {
          "box_id": 3,
          "reset_times": 0,
          "remaining_number": 732,
          "is_closed": false
        },
        {
          "box_id": 4,
          "reset_times": 0,
          "remaining_number": 912,
          "is_closed": false
        },
        {
          "box_id": 5,
          "reset_times": 0,
          "remaining_number": 1401,
          "is_closed": false
        }
      ]
    },
    "gacha_campaign_list": [
      {
        "campaign_id": 19,
        "gacha_id": 157,
        "count": 1
      },
      {
        "campaign_id": 19,
        "gacha_id": 700004,
        "count": 1
      },
      {
        "campaign_id": 19,
        "gacha_id": 155,
        "count": 1
      }
    ],
    "purchased_times_list": {
      "gs.kg.worldflipper.pakage_monthly": 0,
      "gs.kg.worldflipper.pakage_rank": 0,
      "gs.kg.worldflipper.pakage_monthly_90": 0,
      "gs.kg.worldflipper.pakage_monthly_stamina": 0,
      "gs.kg.worldflipper.pakage_monthly_kareido": 0,
      "gs.kg.worldflipper.pakage_monthly_boss": 0,
      "gs.kg.worldflipper.pakage_rank_2": 0,
      "gs.kg.worldflipper.pakage_rank_3_1": 0,
      "gs.kg.worldflipper.pakage_rank_4": 0,
      "gs.kg.worldflipper.pakage_challenge_boost": 0
    },
    "start_dash_exchange_campaign_list": [],
    "multi_special_exchange_campaign_list": [
      {
        "campaign_id": 4,
        "status": 4
      }
    ],
    "associate_token": "dc7ccce9129a0e7243ce2d2a1c9dedc0",
    "config": {
      "attention_recruitment_interval_seconds": 15,
      "attention_recruitment_redeliver_limit": 20,
      "attention_polling_interval_seconds_normal": 10,
      "attention_polling_interval_seconds_battle": 15,
      "multi_attention_lifetime_seconds": 30,
      "contribution_score_rate_to_parasite": 0.25,
      "attention_log_interval_seconds": 600,
      "disable_finish_duration_seconds": 5,
      "disable_decline_count_seconds": 60,
      "disable_decline_count_limit": 14,
      "disable_decline_duration_seconds": 30,
      "disable_intent_disconnect_duration_seconds": 300,
      "disable_unintent_disconnect_duration_seconds": 5,
      "disable_remote_error_duration_seconds": 300,
      "attention_animation_time_seconds": 6,
      "disable_expire_count_limit": 4,
      "disable_expire_duration_seconds": 180,
      "polling_delay_normal_seconds_range_min": 1,
      "polling_delay_normal_seconds_range_max": 10,
      "polling_delay_battle_seconds_range_min": 1,
      "polling_delay_battle_seconds_range_max": 15,
      "return_attention_max_num": 3
    }
  }
}
```

