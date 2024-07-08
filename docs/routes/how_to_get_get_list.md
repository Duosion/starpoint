# /latest/api/index.php/how_to_get/get_list
                       
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
PARAM: 5f1ac16c9abbe402071f8f4ba19830dc60bf5659
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
Content-Length: 36
```

### Body
```
{
  "viewer_id": "<redacted>",
  "item_id": 2
}
```

## Response
### Headers
```
Date: Sat, 22 Jun 2024 21:45:05 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1604
x-result-code: 1
param: 80175bbd06cc87153acb60457c1679668abebc18
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1719092705,
    "result_code": 1
  },
  "data": {
    "box_gacha_id_list": [
      1011
    ],
    "unselected_lineup_shop_sales_list": [],
    "shop_sales_list": [
      {
        "shop_item_id": 200022,
        "stock_quantity": 1,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "shop_type": 3
      },
      {
        "shop_item_id": 600071,
        "stock_quantity": 180,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 180,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 600159,
        "stock_quantity": 180,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 180,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 600183,
        "stock_quantity": 180,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 180,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 600211,
        "stock_quantity": 180,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 180,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 600271,
        "stock_quantity": 180,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 180,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 10000097,
        "stock_quantity": 75,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 75,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 10000246,
        "stock_quantity": 75,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 75,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 4
      },
      {
        "shop_item_id": 200509,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 200609,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 200626,
        "stock_quantity": 50,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 50,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 200533,
        "stock_quantity": 50,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 50,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 203116,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 203117,
        "stock_quantity": 50,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 50,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 10014050,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 10014082,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 10014112,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 10014263,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 10014432,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 202188,
        "stock_quantity": 100,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 100,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 202189,
        "stock_quantity": 50,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "group_info": {
          "group_total_stock_quantity": 50,
          "group_total_purchase_num": 0,
          "multi_stage": false
        },
        "shop_type": 7
      },
      {
        "shop_item_id": 100026,
        "stock_quantity": 3,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "shop_type": 9
      }
    ]
  }
}
```

