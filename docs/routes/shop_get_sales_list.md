# /latest/api/index.php/shop/get_sales_list
                       
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
PARAM: 4a35b3423233abcba6d509a24898531f7c371b43
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
Content-Length: 180
```

### Body
```
{
  "viewer_id": "<redacted>",
  "boss_coin_shop_category_ids": [],
  "equipment_enhancement_shop_category_ids": [],
  "shop_types": [
    2
  ],
  "event_list": [],
  "browse_treasure_flag": true
}
```

## Response
### Headers
```
Date: Fri, 05 Jul 2024 00:05:03 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.0863
x-result-code: 1
param: cf7ddb948109d1dfbca3c1a90fe63d6bcc58470e
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": false,
    "short_udid": 461173975,
    "viewer_id": "<redacted>",
    "servertime": 1720137903,
    "result_code": 1
  },
  "data": {
    "sales_list": [
      {
        "shop_item_id": 200041,
        "stock_quantity": 10,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "discount_id": 1,
        "discount_rate": 0.1,
        "discounted_price": 450,
        "shop_type": 2
      },
      {
        "shop_item_id": 200032,
        "stock_quantity": 9,
        "today_purchase_num": 1,
        "this_month_purchase_num": 1,
        "total_purchase_num": 11,
        "shop_type": 2
      },
      {
        "shop_item_id": 200043,
        "stock_quantity": 30,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 30,
        "shop_type": 2
      },
      {
        "shop_item_id": 200031,
        "stock_quantity": 30,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 30,
        "shop_type": 2
      },
      {
        "shop_item_id": 200034,
        "stock_quantity": 30,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 30,
        "discount_id": 2,
        "discount_rate": 0.3,
        "discounted_price": 140,
        "shop_type": 2
      },
      {
        "shop_item_id": 200037,
        "stock_quantity": 30,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "discount_id": 1,
        "discount_rate": 0.1,
        "discounted_price": 180,
        "shop_type": 2
      },
      {
        "shop_item_id": 200040,
        "stock_quantity": 30,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "shop_type": 2
      },
      {
        "shop_item_id": 200035,
        "stock_quantity": 10,
        "today_purchase_num": 0,
        "this_month_purchase_num": 0,
        "total_purchase_num": 0,
        "discount_id": 1,
        "discount_rate": 0.1,
        "discounted_price": 450,
        "shop_type": 2
      }
    ]
  }
}
```

