# /latest/api/index.php/asset/get_path
                       
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
PARAM: 01713aac1dfcf809d281f11e9e22f9f223245080
GAME-APP-ID: 635343250
SHORT_UDID: 376249241
UDID: 8959A034-38B2-49A9-9F0C-6663706E07DD0521
ASSET_SIZE: shortened
COUNTRY_CODE: us
APP_ID: 561429
KAKAO_PID: 12
DEVICE_LANG: en
DEVICE_NAME: SM-T860 12
APP_VER: 0.0.81
DEVICE: 2
Content-Length: 60
```

### Body
```
{
  "target_asset_version": "2.1.121",
  "viewer_id": 635343250
}
```

## Response
### Headers
```
Date: Fri, 07 Jun 2024 20:41:23 GMT
Content-Type: application/x-msgpack
Transfer-Encoding: chunked
Connection: keep-alive
Server: nginx
x-php-processing-time: 0.1179
x-result-code: 1
param: ebc8954efd18b9a5306e6b64105b1b8c1407eef9
```

### Body
```
{
  "data_headers": {
    "force_update": false,
    "asset_update": true,
    "short_udid": 376249241,
    "viewer_id": "<redacted>",
    "servertime": 1717792883,
    "result_code": 1
  },
  "data": {
    "info": {
      "client_asset_version": "",
      "target_asset_version": "2.1.121",
      "eventual_target_asset_version": "2.1.121",
      "is_initial": true,
      "latest_maj_first_version": "2.1.0"
    },
    "full": {
      "version": "2.1.0",
      "archive": [
        {
          "location": "{$cdnAddress}/en/archive-android-full/s_asset-2.1.0-1-66dc3960.zip",
          "size": 17847606,
          "sha256": "Qo8UuEOTLbqjU5iO4jElDcA/jNYy5ia0Br3Kw1aiD4Y="
        },
        {
          "location": "{$cdnAddress}/en/archive-android_medium-full/s_asset-2.1.0-1-23968116.zip",
          "size": 2335802,
          "sha256": "GruIgInVX0sxKlKNsLIKs3v0niMKygtX3vlCF5CUnnc="
        },
        {
          "location": "{$cdnAddress}/en/archive-android_small-full/s_asset-2.1.0-1-0ad06554.zip",
          "size": 1031819,
          "sha256": "JvctSfeiJ3c5rKrgaKjEpViPQSqnsZcBYTvgGJ1LcfI="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-1-8677d2a1.zip",
          "size": 20791435,
          "sha256": "sozXNrODaUDJ7VankOvTcFIlHJ83VOGeqA0tMUKPek0="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-2-ed2130b8.zip",
          "size": 21143409,
          "sha256": "OcWPgXATq2qR4telPRTjAu35oOrqBWq74gZ7mblQRZk="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-3-8f802a65.zip",
          "size": 20827706,
          "sha256": "x1Pdxq4ops57DQWYtsFIXYKtBElxxfnriSfIyCDsulo="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-4-b414baf6.zip",
          "size": 19348592,
          "sha256": "oMY1ZWL/3HmI1DFKZmtVsR5WScQhxV4C5NTyL0O2Y0A="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-5-c5b1a08a.zip",
          "size": 18588842,
          "sha256": "cYdq293zYDn38rEPdqr/UdcEt2AWy7BH//8b1OL8YNY="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-6-968bce5e.zip",
          "size": 20879092,
          "sha256": "DPbIzaUDcvUsTHGDmLTm3ib7RLgdHsF6cASHBKipQgk="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-7-dea1ae4f.zip",
          "size": 20788846,
          "sha256": "BamfXdS/Uykk6doWQTsCLXmMgsfRhRKo64L7DMxjrHQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-8-380eb49a.zip",
          "size": 20501942,
          "sha256": "JKKSw7+QNASQrILTsoe80ht+XAWgQmKXS8h0wEhj73M="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-9-4b8f0860.zip",
          "size": 20870894,
          "sha256": "vs4geflqMkVJDys+8jP/yw5icO1WZcPKMlQiiCkM47g="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-10-24b0cf10.zip",
          "size": 21198100,
          "sha256": "fIyk/NGa9gmT07GjnhxPEdNOoZmXBEmsyqfA76QVjJ8="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-11-e5e17c4a.zip",
          "size": 20741124,
          "sha256": "TzAKXjhnvTZR/Yhxb0RnppU9PuTEjFZPW93pjyd0WGM="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-12-29c75b9c.zip",
          "size": 21292683,
          "sha256": "YYZgYjyr3WEoKqNbFAra8Da5zkrd3x/qkJkXPHwwU5M="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-13-c3e1bd80.zip",
          "size": 21272323,
          "sha256": "v2hkTy1PtuXLAajG+bi8c8DZvTQp8fii7DfMXdGEB8w="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-14-6d907cd9.zip",
          "size": 20855398,
          "sha256": "cFKNpExkGtqsmSJ2GMbO2yfqq+OXt7HRBbGTLTOae7c="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-15-a83cb647.zip",
          "size": 19465228,
          "sha256": "XdVc3Hj934jj6/iwotH6JLXUYoFze2AuJO3kzrz0jEo="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-16-de0aff07.zip",
          "size": 20916060,
          "sha256": "OLOCnfrXDixWpu8uneN7b4YRtUoTCH8jPKLNlPodl90="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-17-214ad91c.zip",
          "size": 21115817,
          "sha256": "lyR9eAyXDVueIqC+3aWRLI2rzuQL6vtCLG4UNGJW3pw="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-18-ff476fda.zip",
          "size": 21115230,
          "sha256": "AGGG9zpcPRNI1SkcypK5k6rbW2rerf3MBIs6DPDiOnc="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-19-4f19b8e1.zip",
          "size": 20937580,
          "sha256": "BPEavM/7je4vQVnP2uKxlxbxhy0pJbvsjbY/iJRb3nQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-20-aa9170fe.zip",
          "size": 20640691,
          "sha256": "vYiexx9NB3WM0D+VqzeLki3YaLovu0KvKvip9Eutdj0="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-21-2f8f0c3f.zip",
          "size": 21020656,
          "sha256": "OtURMunIlHixM2Lvbg7yKruNipVM26/tqoIWhceujjg="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-22-f11c6b9c.zip",
          "size": 20292593,
          "sha256": "eBQwFbAs4gPOLMaTqIEjT9aaVU72zkSFfC8QM/L4c8c="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-23-4462eae2.zip",
          "size": 21328884,
          "sha256": "CxTXq+BQbhvZQxlXo9jPtZJGUdAOJ59/IyBQi2wkynw="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-24-4393733f.zip",
          "size": 20795902,
          "sha256": "I/EpnPYIX+4NngGmXXLbaqYug7RyWVN4q8xNM00eclQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-25-086af67e.zip",
          "size": 21064765,
          "sha256": "Bhet7zZT+spvDwcRx32sDrtwTIZ3Qlx3Abk7zRtAMqY="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-26-fc34befd.zip",
          "size": 21151104,
          "sha256": "neGMt7tDWRYZQZ34/5Mcy6CPOg+JM1nltVRsMUA4HQA="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-27-5e66592d.zip",
          "size": 21214667,
          "sha256": "/YyQO102LtaOCJaPgVolO1n3+SFTpCwzusrfXB/hfes="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-28-f09a3b27.zip",
          "size": 21354818,
          "sha256": "W95KZO72+2j2BrysftliSOVaHBz2/DSZiMKqZOEX4y4="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-29-0a318140.zip",
          "size": 20917703,
          "sha256": "If0cFTVIuN05bo5DRpXQQspwtyhVi97HohVzPSyR4+0="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-30-19a1502d.zip",
          "size": 21225321,
          "sha256": "lettbEXvechBM/T41qgswMprY/hzrrrsCoQyfwu+YCE="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-31-393453f4.zip",
          "size": 21219207,
          "sha256": "GGVlbHLqZoCvZaRN7U7+14YkvEN5wcwie7XgH9UH97E="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-32-62b28b47.zip",
          "size": 21191457,
          "sha256": "Ep/Vo8b6Wq77LaaFVBY2pkfY7XUj1kCcq2BVaw6FP2g="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-33-0c47a2ce.zip",
          "size": 21296559,
          "sha256": "r6mXVeNqo1px/lY8SbfsvHchRRhLgRe8s5c7CA0eX/0="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-34-8e80e97b.zip",
          "size": 21091983,
          "sha256": "eGkUQNnkebLa1H2px/cFlQgL7h5YaqT4RuQmWr3YFw4="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-35-75fd79a2.zip",
          "size": 21102479,
          "sha256": "z2ul/jctbWYHTBoSuMrofSy2eXHMFNZ/d72ok7lWwe8="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-36-14a0e531.zip",
          "size": 21026857,
          "sha256": "Pzq+C8jSmLXLKKOu53Vf9CA++Z8CJStHRoy2i+KMY5U="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-37-234e6cff.zip",
          "size": 21423175,
          "sha256": "znmLppw2K0kKh70rKuF4JWytC+MZoURpS/O+QHz4e7w="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-38-33316fb2.zip",
          "size": 21315508,
          "sha256": "AqAqKWo/pKJG9L+QVcG3f5PRLP1Ckk6GFKHJyfbvFYQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-39-767cf264.zip",
          "size": 21401236,
          "sha256": "5QIt58yGHvxc57eM1t1+c/SnmdPoO2+UhxyDspTzK2c="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-40-0f1f428b.zip",
          "size": 21231584,
          "sha256": "Ntj0yU5yZ9/mbuvhvt12Ateq105QMB14Tntt+RSD5LU="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-41-3f7e76fb.zip",
          "size": 21316425,
          "sha256": "tOVftPu+ZC+1OkliDSBe1CDpJDuF/+QctkIvC4VLSNQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-42-4639e20f.zip",
          "size": 21354122,
          "sha256": "ZjkujZacGDOiOxpHKsChHI4AJBq9nklWAMhioNGBrEo="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-43-3331436f.zip",
          "size": 21131773,
          "sha256": "F1IPnhTCSs+JPiNjcUTAvCP5KNdRtz2D8t2FUSBKUq8="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-44-8b08043f.zip",
          "size": 20781641,
          "sha256": "Wgt4rkWjUPCF6d6UutcfNUzmvHEC4YcFzDqpebor+I8="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-45-4ded4a92.zip",
          "size": 21157925,
          "sha256": "JpPHbEWz6xkelE8eq3T2rd7STRPn0HaxmsuiHb6+HIo="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-46-182304fa.zip",
          "size": 21152100,
          "sha256": "R4WXbtT5yzMfWVoh7M6eogGJl2+WAtn67vhJ0Qstpis="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-47-191d70b3.zip",
          "size": 21427159,
          "sha256": "i+C98ghFGLnRIDX8WKt+BwrILn0DBPgUlSNap8cLE9Y="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-48-a3dfc94f.zip",
          "size": 19268759,
          "sha256": "PpWzufhe56SHtug8/SwmzgUhIVpHKvInuHoADSjvlBo="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-49-683894d3.zip",
          "size": 21113213,
          "sha256": "FBllXOd14aAXKCh7INqx4MEptjEdhjv6+Wt3M4KqNc4="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-50-82b4a1ff.zip",
          "size": 21277287,
          "sha256": "1pQybbNrfH/fgMeDSEouqdXF6xhwezIGR/0MOZelMoQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-51-f23725e6.zip",
          "size": 21248635,
          "sha256": "vBnOirSJ5BMr2Zgfv/P9N2qE4OOLMH8RYhySlFpdI5c="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-52-14b2b2a1.zip",
          "size": 21255342,
          "sha256": "bX2O1+z7K1y7H7xn1hAXwgIl64XgJrOQN3xG0iJ95W0="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-53-82580705.zip",
          "size": 21397187,
          "sha256": "zKY2qhETFyuGJkj6HA/LOjETjWwVIFb1M6QceTpotII="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-54-a72a4214.zip",
          "size": 20897712,
          "sha256": "xWWCYXSypPA3gkK5PTI8s1id17ntCbBuJohyK04qGMs="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-55-810ea6fe.zip",
          "size": 20314969,
          "sha256": "YETNFJjJEe10/Ezyz/je/lcIqBgmQWC7c0YbSRKrLAI="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-56-9d1c71cc.zip",
          "size": 20739468,
          "sha256": "Kliavx1xZi0LulTY7knuEOQviljXfVNCMFpn7Id2vD4="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-57-1fa16c47.zip",
          "size": 21224024,
          "sha256": "cQmtUVUgin9Qtbf6o5VO2qvw3oe9FQ7kb7xzOt9Cy7E="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-58-8fbdcf79.zip",
          "size": 21118131,
          "sha256": "4aW2EsU+TeMPfO0UWisNwSHjbEXd/tzvznaT022ucdw="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-59-1bca63b8.zip",
          "size": 20669101,
          "sha256": "2mzBSPYZ6quXdvy85O4vT8pkIZ4DL/5qvm9sqIXpEQk="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-60-ced347f0.zip",
          "size": 21060775,
          "sha256": "PbPghgNd3axubLFrYWLoX8aS1fIOEJqsUvSfDI1pSAs="
        },
        {
          "location": "{$cdnAddress}/en/archive-common-full/s_asset-2.1.0-61-e5b5fea9.zip",
          "size": 3431063,
          "sha256": "ztY+v9JUY19N6ZG1TrsqDgvWXMpRL2Hkl0Gav5Q7o7U="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-1-4f31ea31.zip",
          "size": 21145988,
          "sha256": "3nEzSNm03qCgl//5r2s+gz9QF7fUouTy3QY6SEXbfuY="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-2-c88ca6e0.zip",
          "size": 21125751,
          "sha256": "L7rEEcCUe8JDtozfaVRDs1syGDYR7p0rNeVDDBfk7+M="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-3-9ea419f0.zip",
          "size": 21133622,
          "sha256": "y3so3JAule6tzmWZgVzajp4K9mi1kB8SkQIWDy5KKbE="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-4-e09daae2.zip",
          "size": 21154531,
          "sha256": "3BnTpEAFYC2/4u2OUs19gJisdb3PvWfc+I4ZAf92MlY="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-5-e4b29173.zip",
          "size": 21189070,
          "sha256": "lH6o9eSQYJJXm7Tm1rjQHAlp/lU9ZLDnJNAJq010KDg="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-6-c5b7defd.zip",
          "size": 21109795,
          "sha256": "IoiKyOIUgCNvDTe/djp06FetBu6S7PWk2VkP/3u//5o="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-7-ec60eecd.zip",
          "size": 21030050,
          "sha256": "FHPtU9A6ecCwCkHwcB1mg0A/TLbl2PhvdKCWSXpKAio="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-8-b0e931c6.zip",
          "size": 20975962,
          "sha256": "PhtA+YbT2fqYJ5yQ1B8wgGkB4RzfNOyWkugecBCN5qk="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-9-6b77ddbc.zip",
          "size": 21003206,
          "sha256": "SfaosWuUFKAvJXTzMSekhHl+uuMILNe9JcyFNeQz3MY="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-10-759639c9.zip",
          "size": 21095107,
          "sha256": "oEfpToL8ltR2Qyr6WPHkNYD2Y3zt6brS1Mak2XMuO9k="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-11-c05110c6.zip",
          "size": 21104712,
          "sha256": "cCMCxgv5yDq5T6SpfplvrAJaRKL34lZdicPwFUjpM8I="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-12-eb3d2cd0.zip",
          "size": 21121057,
          "sha256": "Vbnn9Kys5hpFXJmPhL4a7PRLbuVxPy4fyfcuXj7tjOE="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-13-0a71ec39.zip",
          "size": 21129592,
          "sha256": "ExVzcUp+I3iJ3cs7mJ6ryaJa8oXxwkFWp5IWGaC3ErI="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-14-00a9bca5.zip",
          "size": 21133339,
          "sha256": "Qht5bor7AkcdSPVP2WmHtBsgDOMmLWgt3t3Pl7WEmfQ="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-15-64285e14.zip",
          "size": 21159889,
          "sha256": "R97cTX7l/oD9H0TmdxFLLHAU3MdJMBs1s+1EP7g0w/Q="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-16-70586738.zip",
          "size": 21156820,
          "sha256": "Lm2ZZHYiDgrbYVe8jonNkqzMPCcstwe+IrOzh0XDIe4="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-17-7b271c14.zip",
          "size": 21029917,
          "sha256": "MmMf9HpSwoqLkIzYsfbHwamYQCHbJZHLGXIOPo+IGcs="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-18-41c6cef4.zip",
          "size": 21028677,
          "sha256": "YyEF5ujqIXPs+UKKenaYOjx9iF6t9DvaeeMsFQSjd+8="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-19-94ef6265.zip",
          "size": 21127831,
          "sha256": "Up3v6vq0IW8yFWmADruzGcT4x3u2un7VnkR4SNUZesA="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-20-4c3d2a07.zip",
          "size": 21138936,
          "sha256": "5rDPmNwV0a97z1hdqIKBOdqb/s2B39NBGlna4lvQsR0="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-21-ae1a0af5.zip",
          "size": 20963310,
          "sha256": "VFoE05oyyrRs+ghFeISoSsWRPmvvaNC46ry1nqFZ0Gw="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-22-4b48d927.zip",
          "size": 21070605,
          "sha256": "zA1sregVVJ1oDyB9/tfBR68wHgu35brUi9TeV2tVME8="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-23-0994914d.zip",
          "size": 21140892,
          "sha256": "n5cfLEknz+NsvPxGAnl+KUKNUcDOeNCu+Lt87uP6x1Q="
        },
        {
          "location": "{$cdnAddress}/en/archive-medium-full/s_asset-2.1.0-24-82e2a19c.zip",
          "size": 9122135,
          "sha256": "ay2LCSaNuBoSi0O3RcOxp7IvUWfhxOCI7L7XhWMJYP4="
        }
      ]
    },
    "diff": [
      {
        "version": "2.1.1",
        "original_version": "2.1.0",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.0-2.1.1-1-0ad11d6b.zip",
            "size": 111,
            "sha256": "McLGSPRJAjXYKsiDX9xn63W3FBMRfiukDXT+4+V5VIs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.0-2.1.1-1-e11f50a9.zip",
            "size": 111,
            "sha256": "McLGSPRJAjXYKsiDX9xn63W3FBMRfiukDXT+4+V5VIs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.0-2.1.1-1-6cddfb8c.zip",
            "size": 111,
            "sha256": "McLGSPRJAjXYKsiDX9xn63W3FBMRfiukDXT+4+V5VIs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.0-2.1.1-1-3fb2d3a6.zip",
            "size": 886904,
            "sha256": "Do5MHcYRqgcagVboBVhRQSfT/1o+lrSh+DWrJWrpSeU="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.0-2.1.1-1-8dd59598.zip",
            "size": 111,
            "sha256": "McLGSPRJAjXYKsiDX9xn63W3FBMRfiukDXT+4+V5VIs="
          }
        ]
      },
      {
        "version": "2.1.2",
        "original_version": "2.1.1",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.1-2.1.2-1-578d3ed3.zip",
            "size": 111,
            "sha256": "8mqpUfl4eZwWp7YpfUvvZTHKCdJ8EOwVVfr6cfpIG88="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.1-2.1.2-1-c1737ea2.zip",
            "size": 111,
            "sha256": "xR0DdF0XoMBOA3tgp7RejUqfiXV/orCSs9X/kkxqV/I="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.1-2.1.2-1-7f06a5e1.zip",
            "size": 111,
            "sha256": "xR0DdF0XoMBOA3tgp7RejUqfiXV/orCSs9X/kkxqV/I="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.1-2.1.2-1-d3d5522c.zip",
            "size": 23181,
            "sha256": "USt4LS5/5p0Lw5EdaZHsgYTyjNXLwmQpGYYOB+MMkpw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.1-2.1.2-1-ddafac5a.zip",
            "size": 111,
            "sha256": "8mqpUfl4eZwWp7YpfUvvZTHKCdJ8EOwVVfr6cfpIG88="
          }
        ]
      },
      {
        "version": "2.1.3",
        "original_version": "2.1.2",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.2-2.1.3-1-cce945bb.zip",
            "size": 111,
            "sha256": "fnukGVFZqiYp9NARUGCiRE5b8W+KscCMglvlyXspdx4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.2-2.1.3-1-9b887ce3.zip",
            "size": 111,
            "sha256": "fnukGVFZqiYp9NARUGCiRE5b8W+KscCMglvlyXspdx4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.2-2.1.3-1-d4bf1077.zip",
            "size": 111,
            "sha256": "fnukGVFZqiYp9NARUGCiRE5b8W+KscCMglvlyXspdx4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.2-2.1.3-1-dffec648.zip",
            "size": 50371,
            "sha256": "bYTH4Sgt4rAhgnwQxMKL9fPD3+3WsdM9WcILf4sqoOM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.2-2.1.3-1-a581658d.zip",
            "size": 111,
            "sha256": "oqn7shszEVCz1NmV0/X5YGJBx/WWf2J7YXuYLCfjzio="
          }
        ]
      },
      {
        "version": "2.1.4",
        "original_version": "2.1.3",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.3-2.1.4-1-c8e384dd.zip",
            "size": 111,
            "sha256": "6H7lHWQ56fIdiGEla9vU1dxlDY2pLcnldvflizvb8bk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.3-2.1.4-1-77193cd6.zip",
            "size": 111,
            "sha256": "6H7lHWQ56fIdiGEla9vU1dxlDY2pLcnldvflizvb8bk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.3-2.1.4-1-761f38c9.zip",
            "size": 111,
            "sha256": "6H7lHWQ56fIdiGEla9vU1dxlDY2pLcnldvflizvb8bk="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.3-2.1.4-1-9eb1e8e4.zip",
            "size": 5003515,
            "sha256": "qkleFyomJPozTDxHJ227PRTnLUBXj+r5YAplWrRr7qQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.3-2.1.4-1-55ded6b8.zip",
            "size": 111,
            "sha256": "6H7lHWQ56fIdiGEla9vU1dxlDY2pLcnldvflizvb8bk="
          }
        ]
      },
      {
        "version": "2.1.5",
        "original_version": "2.1.4",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.4-2.1.5-1-4c9b94d2.zip",
            "size": 1118,
            "sha256": "3FOPG0H0uIH/d/22cvq5dgbWN/Ipr23SZCQe1jCZErQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.4-2.1.5-1-9070ea1e.zip",
            "size": 111,
            "sha256": "Mu3LkrafxobPGo2Wq5YTItBkjqj6lQ5FWGBfUj0fycs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.4-2.1.5-1-10024b1f.zip",
            "size": 111,
            "sha256": "Mu3LkrafxobPGo2Wq5YTItBkjqj6lQ5FWGBfUj0fycs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.4-2.1.5-1-4011705e.zip",
            "size": 713691,
            "sha256": "baPZqXaHF+0cWljThKBGJN0DgTShKkeWtIjen7x/dYs="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.4-2.1.5-1-5116616d.zip",
            "size": 111,
            "sha256": "Mu3LkrafxobPGo2Wq5YTItBkjqj6lQ5FWGBfUj0fycs="
          }
        ]
      },
      {
        "version": "2.1.6",
        "original_version": "2.1.5",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.5-2.1.6-1-17ffdce6.zip",
            "size": 111,
            "sha256": "yypa4agL6kEJuULZwFfGfueG4xAZ0/lsSpuZKdrxbXI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.5-2.1.6-1-3c5c6592.zip",
            "size": 111,
            "sha256": "yypa4agL6kEJuULZwFfGfueG4xAZ0/lsSpuZKdrxbXI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.5-2.1.6-1-6384dc62.zip",
            "size": 111,
            "sha256": "yypa4agL6kEJuULZwFfGfueG4xAZ0/lsSpuZKdrxbXI="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.5-2.1.6-1-b2869c09.zip",
            "size": 3969,
            "sha256": "yQ7yGH4b0anfYJnIjI/wU1QDPVjION3pBLm+98CgvxM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.5-2.1.6-1-c39fb836.zip",
            "size": 111,
            "sha256": "yypa4agL6kEJuULZwFfGfueG4xAZ0/lsSpuZKdrxbXI="
          }
        ]
      },
      {
        "version": "2.1.7",
        "original_version": "2.1.6",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.6-2.1.7-1-f45f9f20.zip",
            "size": 570,
            "sha256": "+qL/dUO3kBZyCd3Nj2OiVerM97PrEYj0mGYsfd457JA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.6-2.1.7-1-b806eb85.zip",
            "size": 111,
            "sha256": "ALYpV1byU8pq4vK69i4q1zCCZz+CuNTeMV/1k0OZyOw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.6-2.1.7-1-a5dc31af.zip",
            "size": 111,
            "sha256": "ALYpV1byU8pq4vK69i4q1zCCZz+CuNTeMV/1k0OZyOw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.6-2.1.7-1-cb01cabd.zip",
            "size": 538968,
            "sha256": "ChdeNVC8dwKNhpLpymUz4dVdhj4WzlCJkDzsud6kU2k="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.6-2.1.7-1-7b1a0258.zip",
            "size": 111,
            "sha256": "EyoNfaQBWyVEzmJZPoPwAjI5jykTJNbfoIKUZwuNSk8="
          }
        ]
      },
      {
        "version": "2.1.8",
        "original_version": "2.1.7",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.7-2.1.8-1-db9b70bb.zip",
            "size": 111,
            "sha256": "6W8YDH1RkQDnTOUkIeZTPkz5lEsiz+3HW9pvYKSpM/0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.7-2.1.8-1-a0119164.zip",
            "size": 111,
            "sha256": "6W8YDH1RkQDnTOUkIeZTPkz5lEsiz+3HW9pvYKSpM/0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.7-2.1.8-1-adb422a5.zip",
            "size": 111,
            "sha256": "6W8YDH1RkQDnTOUkIeZTPkz5lEsiz+3HW9pvYKSpM/0="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.7-2.1.8-1-69ae842c.zip",
            "size": 627383,
            "sha256": "ErBW+L7dgua3WtsegWPiz6RRWAnfPi/h1019HhnM45M="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.7-2.1.8-1-9538f8d0.zip",
            "size": 111,
            "sha256": "CCxaYH09IQLBu6nVcu3MUigK+iSsxVjTJKjEIY+f5N4="
          }
        ]
      },
      {
        "version": "2.1.9",
        "original_version": "2.1.8",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.8-2.1.9-1-2e27a146.zip",
            "size": 111,
            "sha256": "B7F0jhKT0QVOEaRdGjvDKPzhjyngwbqVV2fc4WBOnrk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.8-2.1.9-1-deaea39c.zip",
            "size": 111,
            "sha256": "B7F0jhKT0QVOEaRdGjvDKPzhjyngwbqVV2fc4WBOnrk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.8-2.1.9-1-93cba30d.zip",
            "size": 111,
            "sha256": "B7F0jhKT0QVOEaRdGjvDKPzhjyngwbqVV2fc4WBOnrk="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.8-2.1.9-1-f72208cb.zip",
            "size": 4671710,
            "sha256": "N/J/Sf3B898cZwsKAVGJWtyKQw2i8xJpZ5tCN5eSEiU="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.8-2.1.9-1-8c569a4e.zip",
            "size": 111,
            "sha256": "rIGPh+qFhlxT/iHcE5aVPlqRce0AYwGbjXOgPMDemOw="
          }
        ]
      },
      {
        "version": "2.1.10",
        "original_version": "2.1.9",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.9-2.1.10-1-0192e254.zip",
            "size": 111,
            "sha256": "Ly/tXA3rNeghGM7gB3If09Ep9kdaRCdfKhzXBCpioO8="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.9-2.1.10-1-bfdfb17e.zip",
            "size": 111,
            "sha256": "Ly/tXA3rNeghGM7gB3If09Ep9kdaRCdfKhzXBCpioO8="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.9-2.1.10-1-7b7db05c.zip",
            "size": 111,
            "sha256": "Ly/tXA3rNeghGM7gB3If09Ep9kdaRCdfKhzXBCpioO8="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.9-2.1.10-1-1168fa66.zip",
            "size": 29821,
            "sha256": "Et2wx4HyJeQ164Wuv2n2LqhMOncDBTVuVnlXlUZR7OU="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.9-2.1.10-1-8b33a5e0.zip",
            "size": 111,
            "sha256": "Ly/tXA3rNeghGM7gB3If09Ep9kdaRCdfKhzXBCpioO8="
          }
        ]
      },
      {
        "version": "2.1.11",
        "original_version": "2.1.10",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.10-2.1.11-1-1dae2545.zip",
            "size": 111,
            "sha256": "NestbGbL9e4zsAjcJCVrqSgxUhQjHm/7scbIsui4PKw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.10-2.1.11-1-d2196499.zip",
            "size": 111,
            "sha256": "NestbGbL9e4zsAjcJCVrqSgxUhQjHm/7scbIsui4PKw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.10-2.1.11-1-6449dba0.zip",
            "size": 111,
            "sha256": "NestbGbL9e4zsAjcJCVrqSgxUhQjHm/7scbIsui4PKw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.10-2.1.11-1-311c17c4.zip",
            "size": 29821,
            "sha256": "Ymt8f5kn3EysXuUnuHFnuybuH3SaAhOJQUMIjnyrSZM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.10-2.1.11-1-78cec75e.zip",
            "size": 111,
            "sha256": "NestbGbL9e4zsAjcJCVrqSgxUhQjHm/7scbIsui4PKw="
          }
        ]
      },
      {
        "version": "2.1.12",
        "original_version": "2.1.11",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.11-2.1.12-1-6c724c32.zip",
            "size": 111,
            "sha256": "Ig+YHsJuM5xqoJBs/M/jBi5zcqh5VzOoeISqG6Au9Go="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.11-2.1.12-1-e532a22e.zip",
            "size": 111,
            "sha256": "Ig+YHsJuM5xqoJBs/M/jBi5zcqh5VzOoeISqG6Au9Go="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.11-2.1.12-1-8fc8b3e9.zip",
            "size": 111,
            "sha256": "Ig+YHsJuM5xqoJBs/M/jBi5zcqh5VzOoeISqG6Au9Go="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.11-2.1.12-1-de6c0858.zip",
            "size": 1353757,
            "sha256": "KMXTsmWnGUGixO92UlADzceieNdGATdiJ0AaY0Wq1qo="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.11-2.1.12-1-f848fbe3.zip",
            "size": 111,
            "sha256": "NJMVQBSmRToAgqVZ8VpOjl0PluVcrepuuQLtmknpchA="
          }
        ]
      },
      {
        "version": "2.1.13",
        "original_version": "2.1.12",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.12-2.1.13-1-0069bc33.zip",
            "size": 111,
            "sha256": "6D+XSwynMdu4ljUqyrbTEACTSASKNRdga79TLOPA4h0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.12-2.1.13-1-8b2e0d9a.zip",
            "size": 111,
            "sha256": "6D+XSwynMdu4ljUqyrbTEACTSASKNRdga79TLOPA4h0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.12-2.1.13-1-00f2fd89.zip",
            "size": 111,
            "sha256": "6D+XSwynMdu4ljUqyrbTEACTSASKNRdga79TLOPA4h0="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.12-2.1.13-1-4f8808df.zip",
            "size": 233788,
            "sha256": "yBqehXZX9SDsZMOHYUVZ4A/mh4DlPPSWIH+25re+qzE="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.12-2.1.13-1-ad884734.zip",
            "size": 4102,
            "sha256": "5b71GpsNClV3ju+ouuNcV/YhILU9vDX54aKTMbCgczU="
          }
        ]
      },
      {
        "version": "2.1.14",
        "original_version": "2.1.13",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.13-2.1.14-1-28f4e922.zip",
            "size": 111,
            "sha256": "WCx6XFUk8Q1SaRqXhUpPdcruHGFZvxlhszukieV8aKI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.13-2.1.14-1-6409a522.zip",
            "size": 111,
            "sha256": "WCx6XFUk8Q1SaRqXhUpPdcruHGFZvxlhszukieV8aKI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.13-2.1.14-1-0f43e27b.zip",
            "size": 111,
            "sha256": "WCx6XFUk8Q1SaRqXhUpPdcruHGFZvxlhszukieV8aKI="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.13-2.1.14-1-766d24ff.zip",
            "size": 2845177,
            "sha256": "1BrpNS068bfdPbYQf8Krjm0OL4Hu2I4janIJGvcYI38="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.13-2.1.14-1-878f0d0a.zip",
            "size": 111,
            "sha256": "WCx6XFUk8Q1SaRqXhUpPdcruHGFZvxlhszukieV8aKI="
          }
        ]
      },
      {
        "version": "2.1.15",
        "original_version": "2.1.14",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.14-2.1.15-1-2a45cf3c.zip",
            "size": 111,
            "sha256": "l1QoRnlIoRQIH9dKiwJQdm41/xW5OoC47c+g5YPcRa0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.14-2.1.15-1-3f885fb9.zip",
            "size": 111,
            "sha256": "Zu+LAV/Jr5HBuar36ckEh8aGNsU8HK3q4zuVcULYm98="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.14-2.1.15-1-599dfc29.zip",
            "size": 111,
            "sha256": "Zu+LAV/Jr5HBuar36ckEh8aGNsU8HK3q4zuVcULYm98="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.14-2.1.15-1-0c85ae98.zip",
            "size": 726138,
            "sha256": "NPRSRTnalgPMrvCiGjoTF1Ng94F9DxahSHEzUVldunE="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.14-2.1.15-1-c013eb81.zip",
            "size": 111,
            "sha256": "l1QoRnlIoRQIH9dKiwJQdm41/xW5OoC47c+g5YPcRa0="
          }
        ]
      },
      {
        "version": "2.1.16",
        "original_version": "2.1.15",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.15-2.1.16-1-4c552405.zip",
            "size": 111,
            "sha256": "ZK6rIySheoqzum+9sM6g/z7di6j3AAU6KGbHhvIs4Cg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.15-2.1.16-1-94cf2cdd.zip",
            "size": 111,
            "sha256": "ZK6rIySheoqzum+9sM6g/z7di6j3AAU6KGbHhvIs4Cg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.15-2.1.16-1-340ce1b1.zip",
            "size": 111,
            "sha256": "ZK6rIySheoqzum+9sM6g/z7di6j3AAU6KGbHhvIs4Cg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.15-2.1.16-1-ac724ed4.zip",
            "size": 3970,
            "sha256": "Uz1Yph0CBIDjBqJQ7CqEC7PyMuzvNKsEH8MYE95hTY8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.15-2.1.16-1-ddd4f625.zip",
            "size": 111,
            "sha256": "vzH2fgUjUtOKjkY1fTVrwCR6fJpABInYIi6nfxoHH4U="
          }
        ]
      },
      {
        "version": "2.1.17",
        "original_version": "2.1.16",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.16-2.1.17-1-6b49fd8c.zip",
            "size": 111,
            "sha256": "GLyjh/nSv3zx1CxEIfzVjadd06/I0D8EPI/Ct6NgzL4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.16-2.1.17-1-00104f6a.zip",
            "size": 111,
            "sha256": "GLyjh/nSv3zx1CxEIfzVjadd06/I0D8EPI/Ct6NgzL4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.16-2.1.17-1-d9296780.zip",
            "size": 111,
            "sha256": "GLyjh/nSv3zx1CxEIfzVjadd06/I0D8EPI/Ct6NgzL4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.16-2.1.17-1-e5ce5cee.zip",
            "size": 697489,
            "sha256": "qs6zScHjcE76bqT8s0wIMZJBRxk64wEmFBVy+C6iuBo="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.16-2.1.17-1-0aa04069.zip",
            "size": 111,
            "sha256": "pHHwXkIn1fUluLo0rdxru5ZogQqXckWu8Zxo7gIg6jQ="
          }
        ]
      },
      {
        "version": "2.1.18",
        "original_version": "2.1.17",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.17-2.1.18-1-21a7b768.zip",
            "size": 111,
            "sha256": "t2+PUcdtF0BuxJ74ZICeSlgeUqoRKKHPrc409uvVB/s="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.17-2.1.18-1-ec9cf363.zip",
            "size": 111,
            "sha256": "t2+PUcdtF0BuxJ74ZICeSlgeUqoRKKHPrc409uvVB/s="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.17-2.1.18-1-df35b083.zip",
            "size": 111,
            "sha256": "t2+PUcdtF0BuxJ74ZICeSlgeUqoRKKHPrc409uvVB/s="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.17-2.1.18-1-3e336e65.zip",
            "size": 739463,
            "sha256": "7vHzhG/P2a5hIcbgRo7wBXR5uzRWfb/efQ02YXyENII="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.17-2.1.18-1-e877d648.zip",
            "size": 111,
            "sha256": "ZjN32EmnwP3lYtVZ1YYx1EgoeI3fOTuvw5BN4Ahv5zU="
          }
        ]
      },
      {
        "version": "2.1.19",
        "original_version": "2.1.18",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.18-2.1.19-1-bbbac3ac.zip",
            "size": 111,
            "sha256": "Wba2sYwaKPUyROmo1b2qfPDODfhuRFzSUvUaTWhQtwA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.18-2.1.19-1-3d250e0e.zip",
            "size": 111,
            "sha256": "Wba2sYwaKPUyROmo1b2qfPDODfhuRFzSUvUaTWhQtwA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.18-2.1.19-1-7a20145b.zip",
            "size": 111,
            "sha256": "Wba2sYwaKPUyROmo1b2qfPDODfhuRFzSUvUaTWhQtwA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.18-2.1.19-1-2147629b.zip",
            "size": 2297520,
            "sha256": "elf2VohPN/wGP8YGPfi48ZHRsDHL/VBq6qjFhDrTl6Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.18-2.1.19-1-22e921ac.zip",
            "size": 111,
            "sha256": "qSOer8z5KVLoAVHsP7t2nl7Ra1BRu4Bve+UebvRW9Dc="
          }
        ]
      },
      {
        "version": "2.1.20",
        "original_version": "2.1.19",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.19-2.1.20-1-73267177.zip",
            "size": 111,
            "sha256": "oMxZse6tBwmulRUwJa0Cs/FpAuRsQN1IejGeBsEQY68="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.19-2.1.20-1-509d372a.zip",
            "size": 111,
            "sha256": "wtE7H3ws0G7o3m/uewqV5EfHoQTYzC08hSyN02LPSpI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.19-2.1.20-1-90f19eb8.zip",
            "size": 111,
            "sha256": "wtE7H3ws0G7o3m/uewqV5EfHoQTYzC08hSyN02LPSpI="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.19-2.1.20-1-9f10bdac.zip",
            "size": 500495,
            "sha256": "xuzjIYBIyb6CpL2w6fO0Es3s2WixfEmdjTyZcF5QI1o="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.19-2.1.20-1-68f537ee.zip",
            "size": 1110,
            "sha256": "51Nnd9WVn1oOjT7TlVgvd0H+elGTSjOb8+fy/Uf/uXE="
          }
        ]
      },
      {
        "version": "2.1.21",
        "original_version": "2.1.20",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.20-2.1.21-1-d4a083b2.zip",
            "size": 111,
            "sha256": "6BFzHdV1D5bBL/4NWEaBXnKMC0dSnOijdUQTVzq/IIc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.20-2.1.21-1-65ec27e7.zip",
            "size": 111,
            "sha256": "6BFzHdV1D5bBL/4NWEaBXnKMC0dSnOijdUQTVzq/IIc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.20-2.1.21-1-5000bf3a.zip",
            "size": 111,
            "sha256": "6BFzHdV1D5bBL/4NWEaBXnKMC0dSnOijdUQTVzq/IIc="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.20-2.1.21-1-344c1b4f.zip",
            "size": 2873,
            "sha256": "QNdlLjNrvC3YFHPlOIimMD6t97NWd/OE54gqwOP7/u8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.20-2.1.21-1-3e5f0f86.zip",
            "size": 111,
            "sha256": "6BFzHdV1D5bBL/4NWEaBXnKMC0dSnOijdUQTVzq/IIc="
          }
        ]
      },
      {
        "version": "2.1.22",
        "original_version": "2.1.21",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.21-2.1.22-1-ee132681.zip",
            "size": 111,
            "sha256": "0w7O5J/dDjDDNQdZrFxT/xOp2gq02Gbq/QdcKKT3eIc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.21-2.1.22-1-e13cecae.zip",
            "size": 111,
            "sha256": "AsG/Y5Esvm8XWzhvIHpdq6gkABOyxuNe2DqQE6bynok="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.21-2.1.22-1-d15c8e05.zip",
            "size": 111,
            "sha256": "AsG/Y5Esvm8XWzhvIHpdq6gkABOyxuNe2DqQE6bynok="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.21-2.1.22-1-c31d0290.zip",
            "size": 494316,
            "sha256": "F7oGkEOmAa38llHG4HQ4PsTzukAYGdI1HtdbXhjhb+M="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.21-2.1.22-1-bec32892.zip",
            "size": 111,
            "sha256": "0w7O5J/dDjDDNQdZrFxT/xOp2gq02Gbq/QdcKKT3eIc="
          }
        ]
      },
      {
        "version": "2.1.23",
        "original_version": "2.1.22",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.22-2.1.23-1-89f5e12c.zip",
            "size": 111,
            "sha256": "RYtVdS7FObz27GvOlPMGHitBY8jqW/YCmbqGQ47G81k="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.22-2.1.23-1-08a8705e.zip",
            "size": 111,
            "sha256": "RYtVdS7FObz27GvOlPMGHitBY8jqW/YCmbqGQ47G81k="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.22-2.1.23-1-efdd1382.zip",
            "size": 111,
            "sha256": "YwDks8XiMncs0MUA/Lzh1xAT7pnT2l/zLkf9Zdriwkw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.22-2.1.23-1-bcadb888.zip",
            "size": 4118031,
            "sha256": "VOemH5sVfDOftrroCgeP8YkM8b19aZvhtGXeNRwbRVw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.22-2.1.23-1-ce95e397.zip",
            "size": 111,
            "sha256": "RYtVdS7FObz27GvOlPMGHitBY8jqW/YCmbqGQ47G81k="
          }
        ]
      },
      {
        "version": "2.1.24",
        "original_version": "2.1.23",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.23-2.1.24-1-04d13d0f.zip",
            "size": 111,
            "sha256": "C5NQynnGNYXmH6nhJ2QyHEb+qVFJ81NZ5rabMkSgpJo="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.23-2.1.24-1-ef0589b1.zip",
            "size": 111,
            "sha256": "C5NQynnGNYXmH6nhJ2QyHEb+qVFJ81NZ5rabMkSgpJo="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.23-2.1.24-1-f3adb07e.zip",
            "size": 111,
            "sha256": "MBQ9RNNib2uJO5FFDYP5vwTKobziBTUg1zmqTudTeZQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.23-2.1.24-1-9ea1c3ec.zip",
            "size": 280,
            "sha256": "KJRls1Bg5aMwoaGyq5vRXaL9z7iTzDprSs/Apg4U95k="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.23-2.1.24-1-5e626659.zip",
            "size": 111,
            "sha256": "C5NQynnGNYXmH6nhJ2QyHEb+qVFJ81NZ5rabMkSgpJo="
          }
        ]
      },
      {
        "version": "2.1.25",
        "original_version": "2.1.24",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.24-2.1.25-1-d0bfc006.zip",
            "size": 111,
            "sha256": "2TM07bT1S2DBcusrG53+5iteIu3heOWd0mRqy5wT+/k="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.24-2.1.25-1-9705525b.zip",
            "size": 111,
            "sha256": "2TM07bT1S2DBcusrG53+5iteIu3heOWd0mRqy5wT+/k="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.24-2.1.25-1-1a7577e5.zip",
            "size": 111,
            "sha256": "2TM07bT1S2DBcusrG53+5iteIu3heOWd0mRqy5wT+/k="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.24-2.1.25-1-63682f9b.zip",
            "size": 21169,
            "sha256": "cx5m82N2Cn/sRLYhhB/Ze925pv/fRv8KSHdKNEYR6Mk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.24-2.1.25-1-9d017d38.zip",
            "size": 4646,
            "sha256": "YLss8r6MGRllJ0GvCtQQiXK3vXLvHWxfSR3VsprXLAI="
          }
        ]
      },
      {
        "version": "2.1.26",
        "original_version": "2.1.25",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.25-2.1.26-1-a1e557e1.zip",
            "size": 111,
            "sha256": "OEnebae42aw4Pmr4TdRwr14GvabvlK9opSS/2NPTVKE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.25-2.1.26-1-2cf87c7a.zip",
            "size": 111,
            "sha256": "OEnebae42aw4Pmr4TdRwr14GvabvlK9opSS/2NPTVKE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.25-2.1.26-1-0d04d3d4.zip",
            "size": 111,
            "sha256": "exru/jsYwJYCMU8XFioCDacZYKZIGIoKpgPI80Msn8c="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.25-2.1.26-1-f3393dde.zip",
            "size": 828868,
            "sha256": "nP5wFvwsW+6GmyuYMmoxvQIvfmHH67DbOaY+tXBLoCY="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.25-2.1.26-1-39db72e7.zip",
            "size": 294,
            "sha256": "ux4DDKQ6+ZpIn7Yuqj9Cj4W99/GmAkoRwpD2d11CilU="
          }
        ]
      },
      {
        "version": "2.1.27",
        "original_version": "2.1.26",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.26-2.1.27-1-54270da4.zip",
            "size": 111,
            "sha256": "IXJ5TitwJbbXExObGvbC+rXI1uv5bulHz8/DoaXSKEY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.26-2.1.27-1-c6bf92e0.zip",
            "size": 111,
            "sha256": "331HbUAIGiICyA4oXW73OTGPxo+NZT8qzt29ns67kCw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.26-2.1.27-1-a1c303c5.zip",
            "size": 111,
            "sha256": "331HbUAIGiICyA4oXW73OTGPxo+NZT8qzt29ns67kCw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.26-2.1.27-1-00c6a7d0.zip",
            "size": 281022,
            "sha256": "kEU+gQZR4XxfgO6d42nPdFXhHU7fWo/OUnJWaXDEwnk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.26-2.1.27-1-ff76d5ff.zip",
            "size": 111,
            "sha256": "IXJ5TitwJbbXExObGvbC+rXI1uv5bulHz8/DoaXSKEY="
          }
        ]
      },
      {
        "version": "2.1.28",
        "original_version": "2.1.27",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.27-2.1.28-1-57705550.zip",
            "size": 111,
            "sha256": "hu6HrGbrgWwaZtbEnX1hcAcqZWkZO93jBCb6iZr8k2c="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.27-2.1.28-1-4c88120b.zip",
            "size": 111,
            "sha256": "MGiH52/nuVdVsB2H5PNEiYxwf2j50WMCaCbkJGu1sAA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.27-2.1.28-1-b063dd8d.zip",
            "size": 111,
            "sha256": "MGiH52/nuVdVsB2H5PNEiYxwf2j50WMCaCbkJGu1sAA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.27-2.1.28-1-43c660dc.zip",
            "size": 1456134,
            "sha256": "jY6TzegbYlGoieUbWY9QfHwFoy8KhrmT1To84CXMBBU="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.27-2.1.28-1-d5033f79.zip",
            "size": 111,
            "sha256": "hu6HrGbrgWwaZtbEnX1hcAcqZWkZO93jBCb6iZr8k2c="
          }
        ]
      },
      {
        "version": "2.1.29",
        "original_version": "2.1.28",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.28-2.1.29-1-6b124718.zip",
            "size": 111,
            "sha256": "orXY3STkKpr3EzbkOtEAsa9y8pGTt/8f9nOxlGapfo4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.28-2.1.29-1-abe4222f.zip",
            "size": 111,
            "sha256": "VHWjw8OcIlS0OketQeFoq2kbf0K81Flwqi9jCpwPX6I="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.28-2.1.29-1-760ea803.zip",
            "size": 111,
            "sha256": "VHWjw8OcIlS0OketQeFoq2kbf0K81Flwqi9jCpwPX6I="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.28-2.1.29-1-31ca8e59.zip",
            "size": 1445769,
            "sha256": "LjRfsEhVh6cOszwqv2/nDG8K4kavGtf9hYolKuuk0bQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.28-2.1.29-1-35813860.zip",
            "size": 111,
            "sha256": "orXY3STkKpr3EzbkOtEAsa9y8pGTt/8f9nOxlGapfo4="
          }
        ]
      },
      {
        "version": "2.1.30",
        "original_version": "2.1.29",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.29-2.1.30-1-07bf5bc8.zip",
            "size": 111,
            "sha256": "4tirv5AYI7NBXSV5UkTgP6tHmuCK+huHQy6Ex9FUavY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.29-2.1.30-1-b6326e85.zip",
            "size": 111,
            "sha256": "4tirv5AYI7NBXSV5UkTgP6tHmuCK+huHQy6Ex9FUavY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.29-2.1.30-1-d79bf221.zip",
            "size": 111,
            "sha256": "4tirv5AYI7NBXSV5UkTgP6tHmuCK+huHQy6Ex9FUavY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.29-2.1.30-1-f5cce350.zip",
            "size": 615973,
            "sha256": "RoHAPRezfza3nb+u5kw6m8YSEUmpGykvsZf7sYU/gJ8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.29-2.1.30-1-91ef3024.zip",
            "size": 566,
            "sha256": "pClhNviBKzbQX18FxRWw8EeLvgugDhnC/XxclrlCun4="
          }
        ]
      },
      {
        "version": "2.1.31",
        "original_version": "2.1.30",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.30-2.1.31-1-e5254ec4.zip",
            "size": 111,
            "sha256": "DRIBvxs2NeaZUaRtI74jVA9de1PFeLEDGWP/WuQa1ak="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.30-2.1.31-1-90a3bfca.zip",
            "size": 111,
            "sha256": "DRIBvxs2NeaZUaRtI74jVA9de1PFeLEDGWP/WuQa1ak="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.30-2.1.31-1-aff4b1ff.zip",
            "size": 111,
            "sha256": "DRIBvxs2NeaZUaRtI74jVA9de1PFeLEDGWP/WuQa1ak="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.30-2.1.31-1-ac27524a.zip",
            "size": 832264,
            "sha256": "da5Nv95PKfw9RMJ2T6V+ZgCZty3XGj0Z3CgSvVIGzdE="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.30-2.1.31-1-df96633f.zip",
            "size": 111,
            "sha256": "DRIBvxs2NeaZUaRtI74jVA9de1PFeLEDGWP/WuQa1ak="
          }
        ]
      },
      {
        "version": "2.1.32",
        "original_version": "2.1.31",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.31-2.1.32-1-171200e4.zip",
            "size": 111,
            "sha256": "6SbG61RlhlwgP3F/rnPj6ddXnKWeUlJg3w/D4cif+mE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.31-2.1.32-1-62bead50.zip",
            "size": 111,
            "sha256": "6SbG61RlhlwgP3F/rnPj6ddXnKWeUlJg3w/D4cif+mE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.31-2.1.32-1-941aac6e.zip",
            "size": 111,
            "sha256": "6SbG61RlhlwgP3F/rnPj6ddXnKWeUlJg3w/D4cif+mE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.31-2.1.32-1-3440a990.zip",
            "size": 7653,
            "sha256": "XOdh/aXZM44gbB+4ty8QvE1jrxWoaAT0eEUBmZRqsO4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.31-2.1.32-1-5db50414.zip",
            "size": 111,
            "sha256": "z015wuXwAcoGKSyb4d88uVvZXIzDcUPAIVomOKOjk/k="
          }
        ]
      },
      {
        "version": "2.1.33",
        "original_version": "2.1.32",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.32-2.1.33-1-b7b29406.zip",
            "size": 111,
            "sha256": "gaD/JV03Wd4iVTX7ezC5Q2tX11o6QVHFozuLklVg6Ww="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.32-2.1.33-1-3730380a.zip",
            "size": 111,
            "sha256": "gaD/JV03Wd4iVTX7ezC5Q2tX11o6QVHFozuLklVg6Ww="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.32-2.1.33-1-80048507.zip",
            "size": 111,
            "sha256": "gaD/JV03Wd4iVTX7ezC5Q2tX11o6QVHFozuLklVg6Ww="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.32-2.1.33-1-05452a48.zip",
            "size": 4139035,
            "sha256": "og7oWyuxiloHQHc1459pUQheNAcLVTKsc4QCLwCcg6M="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.32-2.1.33-1-40296428.zip",
            "size": 111,
            "sha256": "gaD/JV03Wd4iVTX7ezC5Q2tX11o6QVHFozuLklVg6Ww="
          }
        ]
      },
      {
        "version": "2.1.34",
        "original_version": "2.1.33",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.33-2.1.34-1-99b9146e.zip",
            "size": 111,
            "sha256": "x/UUlmuNFPdUzmF2YryE/eVpU0ZNpZpkXWWnbcAADzI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.33-2.1.34-1-ba92a4b5.zip",
            "size": 111,
            "sha256": "x/UUlmuNFPdUzmF2YryE/eVpU0ZNpZpkXWWnbcAADzI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.33-2.1.34-1-6bab41eb.zip",
            "size": 111,
            "sha256": "284FOgR6jGkI6LiKdAtODoiFLzMtankDtZKhbtdCfm8="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.33-2.1.34-1-2c6a9fff.zip",
            "size": 2030451,
            "sha256": "153p1DRfu1HLaSs9Y8H30jm3iVq8BiPtzg+8JUfQY/w="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.33-2.1.34-1-0195873c.zip",
            "size": 294,
            "sha256": "IHDlWoUiVSlr6/jMeYpwoOjfpzsKFo6zvE9Rt7a4dNc="
          }
        ]
      },
      {
        "version": "2.1.35",
        "original_version": "2.1.34",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.34-2.1.35-1-dcce2c49.zip",
            "size": 111,
            "sha256": "jzIrO6YK4BrbQT8OTnuE9CNvt27FLMU0HAvrYlDBrl0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.34-2.1.35-1-0d0f0964.zip",
            "size": 111,
            "sha256": "jzIrO6YK4BrbQT8OTnuE9CNvt27FLMU0HAvrYlDBrl0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.34-2.1.35-1-cea788ef.zip",
            "size": 111,
            "sha256": "Eo+ilw6GEwVYFwS+gJflLusob2lCUL7vyu9Wbjd03RI="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.34-2.1.35-1-a91f5b87.zip",
            "size": 867648,
            "sha256": "N1McHDG5HCmmg4CbLx7AQSlEB6d/Oo1y3iLUrstZTaY="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.34-2.1.35-1-5f676bbe.zip",
            "size": 1110,
            "sha256": "p5Hxy28Cx1EZWNTBW37mePsw0LeFknZ9DHKWKIxRLT8="
          }
        ]
      },
      {
        "version": "2.1.36",
        "original_version": "2.1.35",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.35-2.1.36-1-942b052c.zip",
            "size": 111,
            "sha256": "gqxxXY1Qhg80mjWnR+gLo07N1kmHqWMBgZpCaLQxGcY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.35-2.1.36-1-18cfc74f.zip",
            "size": 111,
            "sha256": "gqxxXY1Qhg80mjWnR+gLo07N1kmHqWMBgZpCaLQxGcY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.35-2.1.36-1-2e69dee5.zip",
            "size": 111,
            "sha256": "gqxxXY1Qhg80mjWnR+gLo07N1kmHqWMBgZpCaLQxGcY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.35-2.1.36-1-3fed70f3.zip",
            "size": 2262029,
            "sha256": "fNZT8LppZHPEPTQq6hSmATMSplnFp4W+5k+gPnW4Yvk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.35-2.1.36-1-636b0384.zip",
            "size": 111,
            "sha256": "gqxxXY1Qhg80mjWnR+gLo07N1kmHqWMBgZpCaLQxGcY="
          }
        ]
      },
      {
        "version": "2.1.37",
        "original_version": "2.1.36",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.36-2.1.37-1-17a7ad1c.zip",
            "size": 111,
            "sha256": "31nkraBOQAZG2Zn69Iek3+9CWr41sn+1U5zpfOlP3ec="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.36-2.1.37-1-2ebf76df.zip",
            "size": 111,
            "sha256": "31nkraBOQAZG2Zn69Iek3+9CWr41sn+1U5zpfOlP3ec="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.36-2.1.37-1-b2e9e9c9.zip",
            "size": 111,
            "sha256": "31nkraBOQAZG2Zn69Iek3+9CWr41sn+1U5zpfOlP3ec="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.36-2.1.37-1-93848eec.zip",
            "size": 118313,
            "sha256": "CoK/NSHIVbYteOfRUNARV8oZziAOdDsQ6ARdEs6PeRk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.36-2.1.37-1-a90bfbc7.zip",
            "size": 111,
            "sha256": "xIxl5JbS8xrQ1YZaUKm6eS+j2pTWUnK7E5GN+4znNKM="
          }
        ]
      },
      {
        "version": "2.1.38",
        "original_version": "2.1.37",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.37-2.1.38-1-9129241d.zip",
            "size": 111,
            "sha256": "krm0tY5IYKd7UIrWZMXRzkgip+VL21NO51ayyPUMDBY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.37-2.1.38-1-647df90c.zip",
            "size": 111,
            "sha256": "enJKCRmhD6lNn8ZIKFlXeHY4Anoy46yzXB2hXFtfGdQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.37-2.1.38-1-24165725.zip",
            "size": 111,
            "sha256": "enJKCRmhD6lNn8ZIKFlXeHY4Anoy46yzXB2hXFtfGdQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.37-2.1.38-1-08289569.zip",
            "size": 19601,
            "sha256": "1qP2OiXJEt86WY5ALHgCWaQkjgdAUNBnNykuyc/RCWk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.37-2.1.38-1-43366c58.zip",
            "size": 111,
            "sha256": "krm0tY5IYKd7UIrWZMXRzkgip+VL21NO51ayyPUMDBY="
          }
        ]
      },
      {
        "version": "2.1.39",
        "original_version": "2.1.38",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.38-2.1.39-1-21daf861.zip",
            "size": 111,
            "sha256": "qr6X6mlsc+aKWW6oPhAYhOMlei4EOxrXx7zq9dX/U6g="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.38-2.1.39-1-3e70dd63.zip",
            "size": 111,
            "sha256": "qr6X6mlsc+aKWW6oPhAYhOMlei4EOxrXx7zq9dX/U6g="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.38-2.1.39-1-b2baf742.zip",
            "size": 111,
            "sha256": "qr6X6mlsc+aKWW6oPhAYhOMlei4EOxrXx7zq9dX/U6g="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.38-2.1.39-1-ba478ebd.zip",
            "size": 495819,
            "sha256": "jk33Jsyr8Q32xS/UCes/GNMN7NG39Nb32wKzgzCMY/4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.38-2.1.39-1-ede93df7.zip",
            "size": 111,
            "sha256": "jt/zhGGadB0xKtH9F3RWecdqZXns87xLuBfyvyBik2w="
          }
        ]
      },
      {
        "version": "2.1.40",
        "original_version": "2.1.39",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.39-2.1.40-1-22f22815.zip",
            "size": 111,
            "sha256": "MYm0KrRymNfjXo4Y2qPBrXxWF+T18iLPkWa8l+bkObw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.39-2.1.40-1-6daab55c.zip",
            "size": 111,
            "sha256": "MYm0KrRymNfjXo4Y2qPBrXxWF+T18iLPkWa8l+bkObw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.39-2.1.40-1-13849de5.zip",
            "size": 111,
            "sha256": "UZjpgMjfoV+TcquPM0snyWFth3tdcxZalq0BMmcFkOs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.39-2.1.40-1-434ccaa8.zip",
            "size": 494431,
            "sha256": "Yy97VPQYRrxodvoJKZdQTILk8WwIr/cHkZIA46ozllM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.39-2.1.40-1-fb774905.zip",
            "size": 111,
            "sha256": "MYm0KrRymNfjXo4Y2qPBrXxWF+T18iLPkWa8l+bkObw="
          }
        ]
      },
      {
        "version": "2.1.41",
        "original_version": "2.1.40",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.40-2.1.41-1-375b3682.zip",
            "size": 111,
            "sha256": "IU7FiTE9QDbofmXB27k6szOJ0s0/hcBkMy50YjE9KiU="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.40-2.1.41-1-70e1204c.zip",
            "size": 111,
            "sha256": "IU7FiTE9QDbofmXB27k6szOJ0s0/hcBkMy50YjE9KiU="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.40-2.1.41-1-46911828.zip",
            "size": 111,
            "sha256": "IU7FiTE9QDbofmXB27k6szOJ0s0/hcBkMy50YjE9KiU="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.40-2.1.41-1-17f6aaa5.zip",
            "size": 4018600,
            "sha256": "/ehfawd+wc5cSs0Tv7NGL1NIOLb819GVKj350pTBhkE="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.40-2.1.41-1-d0d7d2dc.zip",
            "size": 111,
            "sha256": "yaq6VDzLmSDqP8RK3mXHxZcM7yCwtWByaMUr6yy+XTE="
          }
        ]
      },
      {
        "version": "2.1.42",
        "original_version": "2.1.41",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.41-2.1.42-1-efd818c6.zip",
            "size": 111,
            "sha256": "xbku8+fDgKFuqlkJT8GqLXQj61PxrgnRk89xdY+MTsc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.41-2.1.42-1-79828eb9.zip",
            "size": 111,
            "sha256": "xbku8+fDgKFuqlkJT8GqLXQj61PxrgnRk89xdY+MTsc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.41-2.1.42-1-8ad4d377.zip",
            "size": 111,
            "sha256": "a3LIOKZ0mPG3UVNHBeD6iuaTzpLNwm5kfhUaEkmD6Wo="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.41-2.1.42-1-daa551f0.zip",
            "size": 7011454,
            "sha256": "Y77sWTROEybkhIeZBSQNveK3yPa452iPvoOMXi+il94="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.41-2.1.42-1-807d2f3a.zip",
            "size": 3558,
            "sha256": "pudw1gTjGJQ35O/foV9G7xwomHZlbN6O/fJrdRwmemM="
          }
        ]
      },
      {
        "version": "2.1.43",
        "original_version": "2.1.42",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.42-2.1.43-1-c173abc9.zip",
            "size": 111,
            "sha256": "BY+VkZ3hLFu4HfDQjItbN8V6twHEwcvUTz8z9ItAFRg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.42-2.1.43-1-3df2abc6.zip",
            "size": 111,
            "sha256": "BY+VkZ3hLFu4HfDQjItbN8V6twHEwcvUTz8z9ItAFRg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.42-2.1.43-1-1b7b5c90.zip",
            "size": 111,
            "sha256": "BY+VkZ3hLFu4HfDQjItbN8V6twHEwcvUTz8z9ItAFRg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.42-2.1.43-1-12b05aa2.zip",
            "size": 1874502,
            "sha256": "L9+3mKicDx3Vk5e/6RvkXicvzpSTF8FusLdqG7P0fUc="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.42-2.1.43-1-c7ee2482.zip",
            "size": 294,
            "sha256": "orChBfuhRBsA8hzdjPcjWJT2LktUpN0L47MSSTVo2No="
          }
        ]
      },
      {
        "version": "2.1.44",
        "original_version": "2.1.43",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.43-2.1.44-1-d844c1df.zip",
            "size": 111,
            "sha256": "oLzDyba45LK5yTAZg0zwGQWyQbIP07ps1bpqXVd0WJc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.43-2.1.44-1-51e4b096.zip",
            "size": 111,
            "sha256": "oLzDyba45LK5yTAZg0zwGQWyQbIP07ps1bpqXVd0WJc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.43-2.1.44-1-28d3bd4d.zip",
            "size": 111,
            "sha256": "oLzDyba45LK5yTAZg0zwGQWyQbIP07ps1bpqXVd0WJc="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.43-2.1.44-1-a03b02e4.zip",
            "size": 153757,
            "sha256": "dk6XnwRmq2Ah/WpQ6QDIS0ccsiTarttBeUe3bxVMSN4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.43-2.1.44-1-0ee0e0ff.zip",
            "size": 294,
            "sha256": "eEwmhSfYT9QYKdfXgKunwPlWVRlgRcoxDhjkuADsqfA="
          }
        ]
      },
      {
        "version": "2.1.45",
        "original_version": "2.1.44",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.44-2.1.45-1-4f4fa609.zip",
            "size": 111,
            "sha256": "0M2cgc0ZMnnWNN4zslI05Mtm3i99mGYvV/kJXVYz22A="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.44-2.1.45-1-6c5c056a.zip",
            "size": 111,
            "sha256": "0M2cgc0ZMnnWNN4zslI05Mtm3i99mGYvV/kJXVYz22A="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.44-2.1.45-1-b3e64506.zip",
            "size": 111,
            "sha256": "0M2cgc0ZMnnWNN4zslI05Mtm3i99mGYvV/kJXVYz22A="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.44-2.1.45-1-9d1e8666.zip",
            "size": 1652322,
            "sha256": "d1jiyFzSRuzOFN0Arv58gVrhO4+JN501VE0wZds0874="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.44-2.1.45-1-7f80c2c3.zip",
            "size": 111,
            "sha256": "dkWCOr0FFbnVuCkJBD6GIA43Opza7SylBMtwrFkgcF8="
          }
        ]
      },
      {
        "version": "2.1.46",
        "original_version": "2.1.45",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.45-2.1.46-1-aa1c2058.zip",
            "size": 111,
            "sha256": "JG+oqe71qOiCmMZDLjTv0hvaFpC36nSOARnOlSF0zlY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.45-2.1.46-1-2b930985.zip",
            "size": 111,
            "sha256": "JG+oqe71qOiCmMZDLjTv0hvaFpC36nSOARnOlSF0zlY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.45-2.1.46-1-54d4f1e5.zip",
            "size": 111,
            "sha256": "JG+oqe71qOiCmMZDLjTv0hvaFpC36nSOARnOlSF0zlY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.45-2.1.46-1-d7515760.zip",
            "size": 3020134,
            "sha256": "rEBLKUjrTNyKVsWQFT2N7AhVSgzkTdrHQYGF6Ez+5WY="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.45-2.1.46-1-366b90f4.zip",
            "size": 111,
            "sha256": "+3/UYgqWueZsK4GtRaJPcGOEIhGaEWUJAAXwX0Go0bk="
          }
        ]
      },
      {
        "version": "2.1.47",
        "original_version": "2.1.46",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.46-2.1.47-1-6113e202.zip",
            "size": 111,
            "sha256": "uv+aLI7s3XitKm1aMY/Tj08WTe6xmsEvrQqfMBDjPgg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.46-2.1.47-1-82ff9ebe.zip",
            "size": 111,
            "sha256": "uv+aLI7s3XitKm1aMY/Tj08WTe6xmsEvrQqfMBDjPgg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.46-2.1.47-1-0b6786c7.zip",
            "size": 111,
            "sha256": "uv+aLI7s3XitKm1aMY/Tj08WTe6xmsEvrQqfMBDjPgg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.46-2.1.47-1-863e9c9a.zip",
            "size": 19349,
            "sha256": "Bd6W5NTczkDfcZOuP7FZRhsgIVEWcvRG7gfjUsaBnkQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.46-2.1.47-1-a347ef36.zip",
            "size": 111,
            "sha256": "oGCpcsQOQGlq1e6A5nKdfP1+4bB3GLBxASnYjtgZ5ME="
          }
        ]
      },
      {
        "version": "2.1.48",
        "original_version": "2.1.47",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.47-2.1.48-1-0d95801f.zip",
            "size": 111,
            "sha256": "dLryYFHfUuJlwmlIKpy+1OlW54dVOGSX451CHEZ5XsE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.47-2.1.48-1-0b911755.zip",
            "size": 111,
            "sha256": "dLryYFHfUuJlwmlIKpy+1OlW54dVOGSX451CHEZ5XsE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.47-2.1.48-1-38a69aca.zip",
            "size": 111,
            "sha256": "dQBdGj+d7Uju9h/vQNq1fNYYZQKFq2xnYklGr1IcXCg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.47-2.1.48-1-07b412a4.zip",
            "size": 3857120,
            "sha256": "yxC9OtfwEgSRougQz+DsLUUAcIWdB1zBK1A0YP9/m9E="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.47-2.1.48-1-4871c736.zip",
            "size": 111,
            "sha256": "dLryYFHfUuJlwmlIKpy+1OlW54dVOGSX451CHEZ5XsE="
          }
        ]
      },
      {
        "version": "2.1.49",
        "original_version": "2.1.48",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.48-2.1.49-1-efb975d8.zip",
            "size": 111,
            "sha256": "n0Lq0ZlAGpNlHl3/NsZy6fsQO21O2lfE6yBknKe6/8s="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.48-2.1.49-1-d9344f5b.zip",
            "size": 111,
            "sha256": "n0Lq0ZlAGpNlHl3/NsZy6fsQO21O2lfE6yBknKe6/8s="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.48-2.1.49-1-10597556.zip",
            "size": 111,
            "sha256": "n0Lq0ZlAGpNlHl3/NsZy6fsQO21O2lfE6yBknKe6/8s="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.48-2.1.49-1-f4f0a332.zip",
            "size": 6040258,
            "sha256": "CBBFyRfon6ctApLWSybaEppn1EGTDFW8YExAR1FR5SM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.48-2.1.49-1-bf086ea7.zip",
            "size": 111,
            "sha256": "0wN5OE5zeJmCsooNd9j2cJQyx17CczKi376i8+iMMMQ="
          }
        ]
      },
      {
        "version": "2.1.50",
        "original_version": "2.1.49",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.49-2.1.50-1-e65639a5.zip",
            "size": 111,
            "sha256": "UL5UCifUZWBe5UcH6Y9dd5jjZ7OE6s+n29Jx8HofZLg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.49-2.1.50-1-da3f683d.zip",
            "size": 111,
            "sha256": "UL5UCifUZWBe5UcH6Y9dd5jjZ7OE6s+n29Jx8HofZLg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.49-2.1.50-1-c47a901e.zip",
            "size": 111,
            "sha256": "UL5UCifUZWBe5UcH6Y9dd5jjZ7OE6s+n29Jx8HofZLg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.49-2.1.50-1-32c74bc3.zip",
            "size": 1165254,
            "sha256": "BPICUo+W0vvAHE47yTcL5+EPv1iHCih28mREn/SbSg8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.49-2.1.50-1-2c12540e.zip",
            "size": 111,
            "sha256": "f4mrlRx2FNuvMgXW8F9QVerlt3g0E0dzSXGjK8XjsQw="
          }
        ]
      },
      {
        "version": "2.1.51",
        "original_version": "2.1.50",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.50-2.1.51-1-5de88fe4.zip",
            "size": 570,
            "sha256": "FiCMPhObEbRgJfMTXihl0iwqajoUzTNLbTcl2XrgeDc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.50-2.1.51-1-ce2330f8.zip",
            "size": 111,
            "sha256": "pp2PqQWvkreEG4d9HEFjJoZBEYiL3z8F3HSEa//ygJI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.50-2.1.51-1-0a8b1adc.zip",
            "size": 111,
            "sha256": "pp2PqQWvkreEG4d9HEFjJoZBEYiL3z8F3HSEa//ygJI="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.50-2.1.51-1-d3437694.zip",
            "size": 838784,
            "sha256": "23lMZnUQG8kETQD74zYUSmnJ5QfJjYstaVUAjdGOMV0="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.50-2.1.51-1-574ab51b.zip",
            "size": 1926,
            "sha256": "m57vv6fawNHT09x8zsXN40OPos+mbJ8RyH+PoSas+Qg="
          }
        ]
      },
      {
        "version": "2.1.52",
        "original_version": "2.1.51",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.51-2.1.52-1-cd401947.zip",
            "size": 111,
            "sha256": "Q+VHfbS7YRzPg8ByUWtMq+jN/AfrPFtbyzIhaoaH1ks="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.51-2.1.52-1-7eaf0ee7.zip",
            "size": 111,
            "sha256": "Q+VHfbS7YRzPg8ByUWtMq+jN/AfrPFtbyzIhaoaH1ks="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.51-2.1.52-1-690bcbcb.zip",
            "size": 111,
            "sha256": "Q+VHfbS7YRzPg8ByUWtMq+jN/AfrPFtbyzIhaoaH1ks="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.51-2.1.52-1-03c21b46.zip",
            "size": 6929,
            "sha256": "Q2NcEAOrEDQL1RWkV6/o7hswEWmilp/DjzmB1aN8ZCM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.51-2.1.52-1-c5eabfb9.zip",
            "size": 566,
            "sha256": "uG41qY9QkmpDIUIroNrHQ3wh1nkVRPTDrFayxD0ndaI="
          }
        ]
      },
      {
        "version": "2.1.53",
        "original_version": "2.1.52",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.52-2.1.53-1-a6342917.zip",
            "size": 111,
            "sha256": "Gxiga6n+H9m00mH6IqIz28r+MAo0+bvQcERARBYeosY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.52-2.1.53-1-a2c94e18.zip",
            "size": 111,
            "sha256": "Gxiga6n+H9m00mH6IqIz28r+MAo0+bvQcERARBYeosY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.52-2.1.53-1-5bf201bd.zip",
            "size": 111,
            "sha256": "Gxiga6n+H9m00mH6IqIz28r+MAo0+bvQcERARBYeosY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.52-2.1.53-1-6871e7df.zip",
            "size": 902596,
            "sha256": "2Ws55PMp0RMR8IzNFFLCQ/gufSmO+AnBi8arKJoBWes="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.52-2.1.53-1-8a28aeab.zip",
            "size": 111,
            "sha256": "kGA/LrD9zoEMzhQjBY/qY5wgWi0BYaKng3LwgD88gpw="
          }
        ]
      },
      {
        "version": "2.1.54",
        "original_version": "2.1.53",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.53-2.1.54-1-8d3d4c66.zip",
            "size": 111,
            "sha256": "lGhVwCgkbkpWCqJq73F+y2Ud+mXM1CuebYVPJm9Id0Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.53-2.1.54-1-dab86e43.zip",
            "size": 111,
            "sha256": "lGhVwCgkbkpWCqJq73F+y2Ud+mXM1CuebYVPJm9Id0Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.53-2.1.54-1-6cebee8c.zip",
            "size": 111,
            "sha256": "lGhVwCgkbkpWCqJq73F+y2Ud+mXM1CuebYVPJm9Id0Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.53-2.1.54-1-3e7f268a.zip",
            "size": 494213,
            "sha256": "I2YGEl7PyEcHjOBPf9kuF+08HT1vuUJOkgdmQtJw/yw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.53-2.1.54-1-29cee33d.zip",
            "size": 111,
            "sha256": "lGhVwCgkbkpWCqJq73F+y2Ud+mXM1CuebYVPJm9Id0Q="
          }
        ]
      },
      {
        "version": "2.1.55",
        "original_version": "2.1.54",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.54-2.1.55-1-a52240a3.zip",
            "size": 111,
            "sha256": "q08SgW/RMOe2HnyPE6Itv0ZtQCrZwlvLzLBRL3nrnyQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.54-2.1.55-1-59cfc219.zip",
            "size": 111,
            "sha256": "q08SgW/RMOe2HnyPE6Itv0ZtQCrZwlvLzLBRL3nrnyQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.54-2.1.55-1-6b29c041.zip",
            "size": 111,
            "sha256": "q08SgW/RMOe2HnyPE6Itv0ZtQCrZwlvLzLBRL3nrnyQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.54-2.1.55-1-54454748.zip",
            "size": 4042561,
            "sha256": "YahNvSJJqXonNq1vuS/+7Nqqh+EGz41/JWROgUpbHZQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.54-2.1.55-1-e0a9ecdd.zip",
            "size": 111,
            "sha256": "q08SgW/RMOe2HnyPE6Itv0ZtQCrZwlvLzLBRL3nrnyQ="
          }
        ]
      },
      {
        "version": "2.1.56",
        "original_version": "2.1.55",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.55-2.1.56-1-92425cb7.zip",
            "size": 111,
            "sha256": "gKvccBwFWTvpUKupWMlzsCK6CRcVwAtYNTeRoWMnkmw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.55-2.1.56-1-9e520500.zip",
            "size": 111,
            "sha256": "gKvccBwFWTvpUKupWMlzsCK6CRcVwAtYNTeRoWMnkmw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.55-2.1.56-1-60b677cb.zip",
            "size": 111,
            "sha256": "gKvccBwFWTvpUKupWMlzsCK6CRcVwAtYNTeRoWMnkmw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.55-2.1.56-1-deb88800.zip",
            "size": 67687,
            "sha256": "qP7hgSHqDNxcu3FhdHGLoMn07M4Pf2bnhZO1dAXPfEE="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.55-2.1.56-1-316a2ba9.zip",
            "size": 111,
            "sha256": "ncQZ6vo+4enGVQIv/CS4BnIPW4nncXKO21M4NOEztjA="
          }
        ]
      },
      {
        "version": "2.1.57",
        "original_version": "2.1.56",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.56-2.1.57-1-a952de16.zip",
            "size": 111,
            "sha256": "jZZDaawooGN2BZUvqj5okHxRsiPD/tKovzlnsYnHntc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.56-2.1.57-1-e55b5ad8.zip",
            "size": 111,
            "sha256": "jZZDaawooGN2BZUvqj5okHxRsiPD/tKovzlnsYnHntc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.56-2.1.57-1-d27e7292.zip",
            "size": 111,
            "sha256": "jZZDaawooGN2BZUvqj5okHxRsiPD/tKovzlnsYnHntc="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.56-2.1.57-1-e34fe93d.zip",
            "size": 12453,
            "sha256": "liM/7Mw7www0Uh7J9/YEv80JsEzIpUbT0rxOWhsz2S8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.56-2.1.57-1-ebfb0543.zip",
            "size": 1926,
            "sha256": "Znj2Oddjg4xGi63XFkNHxnVAGS/0fQ92Tf5g0unItDE="
          }
        ]
      },
      {
        "version": "2.1.58",
        "original_version": "2.1.57",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.57-2.1.58-1-f7e99a74.zip",
            "size": 111,
            "sha256": "XzpKNE6JVTQvwMe5NXyqKa9pPCflQ8hmKG5X4MWZojA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.57-2.1.58-1-9b525281.zip",
            "size": 111,
            "sha256": "XzpKNE6JVTQvwMe5NXyqKa9pPCflQ8hmKG5X4MWZojA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.57-2.1.58-1-f1ab717f.zip",
            "size": 111,
            "sha256": "RqZyk4xBAWJ5IJO9+DxuxxXrygKFF/a5hTPC8/UDYZA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.57-2.1.58-1-5b1192a1.zip",
            "size": 927190,
            "sha256": "DwT0jsEfTuHqPHxYpdIWPHv6ofFTjPa1+igXCoW980M="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.57-2.1.58-1-d55f3669.zip",
            "size": 111,
            "sha256": "XzpKNE6JVTQvwMe5NXyqKa9pPCflQ8hmKG5X4MWZojA="
          }
        ]
      },
      {
        "version": "2.1.59",
        "original_version": "2.1.58",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.58-2.1.59-1-10e3aeb8.zip",
            "size": 111,
            "sha256": "xzwLO66vuWjKRkGsuSVwRGX1HvZMBiUU50cytUpAKHg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.58-2.1.59-1-5ff45dea.zip",
            "size": 111,
            "sha256": "xzwLO66vuWjKRkGsuSVwRGX1HvZMBiUU50cytUpAKHg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.58-2.1.59-1-b29cab59.zip",
            "size": 111,
            "sha256": "OfuO7dKkfkpu6DO/9y4EnVR2dXbpMXnecBKWIqteBw8="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.58-2.1.59-1-927c36af.zip",
            "size": 612136,
            "sha256": "nw6BNo92hDwxzcGd7UFPT0j04hKL368F6Q4vvttd03s="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.58-2.1.59-1-6751b44a.zip",
            "size": 111,
            "sha256": "xzwLO66vuWjKRkGsuSVwRGX1HvZMBiUU50cytUpAKHg="
          }
        ]
      },
      {
        "version": "2.1.60",
        "original_version": "2.1.59",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.59-2.1.60-1-90340eef.zip",
            "size": 111,
            "sha256": "pIvnGrVcAtAa4YGqgYramIzBEYBYfQS/GJphsmPPZBs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.59-2.1.60-1-e0b1872d.zip",
            "size": 111,
            "sha256": "pIvnGrVcAtAa4YGqgYramIzBEYBYfQS/GJphsmPPZBs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.59-2.1.60-1-a27ace3d.zip",
            "size": 111,
            "sha256": "pIvnGrVcAtAa4YGqgYramIzBEYBYfQS/GJphsmPPZBs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.59-2.1.60-1-17d8cf1f.zip",
            "size": 1238103,
            "sha256": "iKimwQAGOE55JeYuG2JKLg6j0gfVSPiT6pptdz5zTQQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.59-2.1.60-1-0aac6376.zip",
            "size": 111,
            "sha256": "0c9KYdRtYb6iYvlIBE+B1EglMf+xBuWcqf+R4wtbPX8="
          }
        ]
      },
      {
        "version": "2.1.61",
        "original_version": "2.1.60",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.60-2.1.61-1-dd7984cb.zip",
            "size": 111,
            "sha256": "qrgKij8lkUC+CoOAKNl6XvlkWuEVRqyliuWj4TtggGs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.60-2.1.61-1-39db4c24.zip",
            "size": 111,
            "sha256": "qrgKij8lkUC+CoOAKNl6XvlkWuEVRqyliuWj4TtggGs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.60-2.1.61-1-ca6337de.zip",
            "size": 111,
            "sha256": "qrgKij8lkUC+CoOAKNl6XvlkWuEVRqyliuWj4TtggGs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.60-2.1.61-1-aafe8c6e.zip",
            "size": 69612,
            "sha256": "L6y70DceL1ms+c87fCwgDRfKwVirN0k1PR57I5uxdO8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.60-2.1.61-1-fbdc6238.zip",
            "size": 111,
            "sha256": "qrgKij8lkUC+CoOAKNl6XvlkWuEVRqyliuWj4TtggGs="
          }
        ]
      },
      {
        "version": "2.1.62",
        "original_version": "2.1.61",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.61-2.1.62-1-31d5e2e7.zip",
            "size": 111,
            "sha256": "JL5kcpWexU5Zr++418EtAOoP7qm/iTyxI83j0JivW2E="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.61-2.1.62-1-7a81f02a.zip",
            "size": 111,
            "sha256": "JL5kcpWexU5Zr++418EtAOoP7qm/iTyxI83j0JivW2E="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.61-2.1.62-1-368ed816.zip",
            "size": 111,
            "sha256": "JL5kcpWexU5Zr++418EtAOoP7qm/iTyxI83j0JivW2E="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.61-2.1.62-1-0fc07d19.zip",
            "size": 615470,
            "sha256": "tQUpKEkZHumF3MJvJC9mTontYhaHIwASmGaFcQA8YIw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.61-2.1.62-1-be0c24c6.zip",
            "size": 111,
            "sha256": "JL5kcpWexU5Zr++418EtAOoP7qm/iTyxI83j0JivW2E="
          }
        ]
      },
      {
        "version": "2.1.63",
        "original_version": "2.1.62",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.62-2.1.63-1-4d931ec0.zip",
            "size": 111,
            "sha256": "rFiHqUCqi72ZAoRwM8Tn7Peg7tZS6xBAg8yD2/WP244="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.62-2.1.63-1-660ac8c8.zip",
            "size": 111,
            "sha256": "rFiHqUCqi72ZAoRwM8Tn7Peg7tZS6xBAg8yD2/WP244="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.62-2.1.63-1-5e3ad497.zip",
            "size": 111,
            "sha256": "rFiHqUCqi72ZAoRwM8Tn7Peg7tZS6xBAg8yD2/WP244="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.62-2.1.63-1-451ba6c5.zip",
            "size": 2089971,
            "sha256": "HyH3C26+aqt4/dib7wKnSS4VTieNky2VziZzULqIo3Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.62-2.1.63-1-306e7641.zip",
            "size": 566,
            "sha256": "0zKDRsLrIhKfIfn91UiCWTBDBnZr9uwDFiFrfguWzUM="
          }
        ]
      },
      {
        "version": "2.1.64",
        "original_version": "2.1.63",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.63-2.1.64-1-de0b6866.zip",
            "size": 111,
            "sha256": "+A4M8TWulVfXWdt9dLB8yH3s3P2YQPo2j7xdWpwpL8U="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.63-2.1.64-1-e1291eea.zip",
            "size": 111,
            "sha256": "+A4M8TWulVfXWdt9dLB8yH3s3P2YQPo2j7xdWpwpL8U="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.63-2.1.64-1-2da90ff1.zip",
            "size": 111,
            "sha256": "PFVXYKnA70PBKf9eRiNajGWVGd/LdvgQ1VMHYonKnDA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.63-2.1.64-1-53c2a794.zip",
            "size": 6788,
            "sha256": "wxKq1njYD+XhU/GxINdsoH/mg2nzEG6ZRLoo/CF9lzU="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.63-2.1.64-1-8511fecb.zip",
            "size": 111,
            "sha256": "+A4M8TWulVfXWdt9dLB8yH3s3P2YQPo2j7xdWpwpL8U="
          }
        ]
      },
      {
        "version": "2.1.65",
        "original_version": "2.1.64",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.64-2.1.65-1-ec05d671.zip",
            "size": 10873,
            "sha256": "4tlt09/P7KL5j0tMYp/ZWORTHioV3A6Zv5/VTtjgLOc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.64-2.1.65-1-2a696cb0.zip",
            "size": 111,
            "sha256": "tAPF0CvJ0htIw2e56rxSh//83j5EeUNm5yOnUJZxkzE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.64-2.1.65-1-84a6603d.zip",
            "size": 111,
            "sha256": "tAPF0CvJ0htIw2e56rxSh//83j5EeUNm5yOnUJZxkzE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.64-2.1.65-1-12ed1d95.zip",
            "size": 493,
            "sha256": "ZP1x4UZT4fyoQW/LNEtf2Ur4iEfUPeJRDeyPU0SpF9s="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.64-2.1.65-1-25914e3e.zip",
            "size": 111,
            "sha256": "Ii02n9XlXMfY76Z/1+wHEqoCIve4CgCbp9WR0B6xgVY="
          }
        ]
      },
      {
        "version": "2.1.66",
        "original_version": "2.1.65",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.65-2.1.66-1-745d989d.zip",
            "size": 111,
            "sha256": "E+EKR6ve9E7sjTs6vGGu4JWQyzGYM6nnP76gwC2wdFE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.65-2.1.66-1-b883abe3.zip",
            "size": 111,
            "sha256": "E+EKR6ve9E7sjTs6vGGu4JWQyzGYM6nnP76gwC2wdFE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.65-2.1.66-1-319fa64e.zip",
            "size": 111,
            "sha256": "hzIRP1ui2nKokVkWU8u+OZE8wuCdbBffAWs54J4e+LA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.65-2.1.66-1-ffa271d9.zip",
            "size": 4600107,
            "sha256": "w7RIN9kjPYjBCPnh3+s4KJYyL/JNyk3Qnwp8ofAsN3E="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.65-2.1.66-1-3327da7e.zip",
            "size": 3830,
            "sha256": "pRmh/YLwGnSDYE15MI4v4vljrWg3cDq6zw5A7uyUwY4="
          }
        ]
      },
      {
        "version": "2.1.67",
        "original_version": "2.1.66",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.66-2.1.67-1-b9342c5f.zip",
            "size": 111,
            "sha256": "DnqRnqdkXEfZ4lbzNXxmXaNcC7HAcpL5ihmWf1YKd8g="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.66-2.1.67-1-7ec7ef0b.zip",
            "size": 111,
            "sha256": "DnqRnqdkXEfZ4lbzNXxmXaNcC7HAcpL5ihmWf1YKd8g="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.66-2.1.67-1-852cdbdd.zip",
            "size": 111,
            "sha256": "DnqRnqdkXEfZ4lbzNXxmXaNcC7HAcpL5ihmWf1YKd8g="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.66-2.1.67-1-fb134a31.zip",
            "size": 500390,
            "sha256": "QHQClpheMBqS7DwVqBSQSNVZdYNG4euvku6qN+gEZPI="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.66-2.1.67-1-bd89c06d.zip",
            "size": 111,
            "sha256": "ARjHobtWdhx7sCHDjUhNfUxw5QVaXDEyU7fFUt/oArE="
          }
        ]
      },
      {
        "version": "2.1.68",
        "original_version": "2.1.67",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.67-2.1.68-1-b5fb9b8a.zip",
            "size": 111,
            "sha256": "dVhEISSZPa6M2lwumQ0bV11pCxQrveq7MCt0PU68P4s="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.67-2.1.68-1-a4f1e45a.zip",
            "size": 111,
            "sha256": "dVhEISSZPa6M2lwumQ0bV11pCxQrveq7MCt0PU68P4s="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.67-2.1.68-1-2e665cb0.zip",
            "size": 111,
            "sha256": "dVhEISSZPa6M2lwumQ0bV11pCxQrveq7MCt0PU68P4s="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.67-2.1.68-1-a9ad2958.zip",
            "size": 1907469,
            "sha256": "0pIWznGeKt8l+fhcaCtebFR3ffgBdvO5wnmnXj+IxN4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.67-2.1.68-1-70997882.zip",
            "size": 294,
            "sha256": "JjYyjLuWiiZf5qBt+t2tExb+NPTVvIwPdZ6R3DMPBJM="
          }
        ]
      },
      {
        "version": "2.1.69",
        "original_version": "2.1.68",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.68-2.1.69-1-e1b815c4.zip",
            "size": 111,
            "sha256": "X0VuV0A/VZVdnb/6jmpQNbkT0PuEIuQz5+phsSrPo9g="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.68-2.1.69-1-11cd480c.zip",
            "size": 111,
            "sha256": "X0VuV0A/VZVdnb/6jmpQNbkT0PuEIuQz5+phsSrPo9g="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.68-2.1.69-1-a0bf2014.zip",
            "size": 111,
            "sha256": "X0VuV0A/VZVdnb/6jmpQNbkT0PuEIuQz5+phsSrPo9g="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.68-2.1.69-1-ecf70243.zip",
            "size": 4611038,
            "sha256": "Qovy/QIcNjX6AqYcIzeLa/sQ+TaH7Y4L5Ya4gPuuF5w="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.68-2.1.69-1-d5d3479e.zip",
            "size": 111,
            "sha256": "X0VuV0A/VZVdnb/6jmpQNbkT0PuEIuQz5+phsSrPo9g="
          }
        ]
      },
      {
        "version": "2.1.70",
        "original_version": "2.1.69",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.69-2.1.70-1-26c9ed3d.zip",
            "size": 111,
            "sha256": "AWQ5DFGDd5e9XVlUIvf3GjNt4N2nhvxABz++6auNvtk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.69-2.1.70-1-7818e7d9.zip",
            "size": 111,
            "sha256": "AWQ5DFGDd5e9XVlUIvf3GjNt4N2nhvxABz++6auNvtk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.69-2.1.70-1-835f7036.zip",
            "size": 111,
            "sha256": "AWQ5DFGDd5e9XVlUIvf3GjNt4N2nhvxABz++6auNvtk="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.69-2.1.70-1-4a5caaa1.zip",
            "size": 1931396,
            "sha256": "/FvpbbQKiTw9gN2lB/DoTSe1NjDTM0Ihu89vGSqWT1g="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.69-2.1.70-1-d5f184af.zip",
            "size": 111,
            "sha256": "cVNGno4SEnxQTWmzPj6vhBJmrETYezmlGUbuSpXGnZk="
          }
        ]
      },
      {
        "version": "2.1.71",
        "original_version": "2.1.70",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.70-2.1.71-1-b6e60cde.zip",
            "size": 111,
            "sha256": "qbZQpxiWxO0BRW6DNc3O7T9jycg5WhCa7GnNDIBEqDE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.70-2.1.71-1-577a70d5.zip",
            "size": 111,
            "sha256": "qbZQpxiWxO0BRW6DNc3O7T9jycg5WhCa7GnNDIBEqDE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.70-2.1.71-1-b495734f.zip",
            "size": 111,
            "sha256": "56zv+l8nxCFGU1MFR6y/0TppRqP+TQWs+YS1ZUTNbAk="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.70-2.1.71-1-dc2541f2.zip",
            "size": 1470935,
            "sha256": "oONnjNt+NLx18tp0c69aCwShTweiTtUL8GJ/SOQT4Ho="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.70-2.1.71-1-68c57ec1.zip",
            "size": 111,
            "sha256": "qbZQpxiWxO0BRW6DNc3O7T9jycg5WhCa7GnNDIBEqDE="
          }
        ]
      },
      {
        "version": "2.1.72",
        "original_version": "2.1.71",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.71-2.1.72-1-04ed0329.zip",
            "size": 111,
            "sha256": "ZTzyX9AOFNP+B+cvOd+2o38D6wj4mexZAWJvvi7aBBw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.71-2.1.72-1-3ab5f47e.zip",
            "size": 111,
            "sha256": "ZTzyX9AOFNP+B+cvOd+2o38D6wj4mexZAWJvvi7aBBw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.71-2.1.72-1-0493132e.zip",
            "size": 111,
            "sha256": "ZTzyX9AOFNP+B+cvOd+2o38D6wj4mexZAWJvvi7aBBw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.71-2.1.72-1-39d2b1da.zip",
            "size": 15629,
            "sha256": "N10RZHRfQMtmze/MPXxPpX5xy1q+32O+AWLJiBQynJw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.71-2.1.72-1-be482ba0.zip",
            "size": 111,
            "sha256": "ZTzyX9AOFNP+B+cvOd+2o38D6wj4mexZAWJvvi7aBBw="
          }
        ]
      },
      {
        "version": "2.1.73",
        "original_version": "2.1.72",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.72-2.1.73-1-63187778.zip",
            "size": 111,
            "sha256": "RH219bXc7Ooj1VCXleq9bnBJcYqWOAI6MePMdTNUnQc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.72-2.1.73-1-99980770.zip",
            "size": 111,
            "sha256": "RH219bXc7Ooj1VCXleq9bnBJcYqWOAI6MePMdTNUnQc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.72-2.1.73-1-1e751913.zip",
            "size": 111,
            "sha256": "RH219bXc7Ooj1VCXleq9bnBJcYqWOAI6MePMdTNUnQc="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.72-2.1.73-1-63e88569.zip",
            "size": 1026079,
            "sha256": "HcTxqmwcGT0jSilY4Soatqe+BwQr9XqjBqZaQS0Lu8k="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.72-2.1.73-1-0feb2077.zip",
            "size": 111,
            "sha256": "RH219bXc7Ooj1VCXleq9bnBJcYqWOAI6MePMdTNUnQc="
          }
        ]
      },
      {
        "version": "2.1.74",
        "original_version": "2.1.73",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.73-2.1.74-1-222fb5c7.zip",
            "size": 111,
            "sha256": "YTlYeLQvTsr8WBqeRaXUCweCcLxE3iZwhpfdRTOe82I="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.73-2.1.74-1-2e576e2a.zip",
            "size": 111,
            "sha256": "YTlYeLQvTsr8WBqeRaXUCweCcLxE3iZwhpfdRTOe82I="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.73-2.1.74-1-08b393bc.zip",
            "size": 111,
            "sha256": "YTlYeLQvTsr8WBqeRaXUCweCcLxE3iZwhpfdRTOe82I="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.73-2.1.74-1-951856fd.zip",
            "size": 1025732,
            "sha256": "UPMg9nKk41TnM3TPnpYKi+UU9lSEkgD8OO07Y4ZrMSg="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.73-2.1.74-1-4ace3aac.zip",
            "size": 111,
            "sha256": "YTlYeLQvTsr8WBqeRaXUCweCcLxE3iZwhpfdRTOe82I="
          }
        ]
      },
      {
        "version": "2.1.75",
        "original_version": "2.1.74",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.74-2.1.75-1-7d1f7554.zip",
            "size": 111,
            "sha256": "gR8BIXKtGze2sXudKYQ/w8BUZxDm2HQQ6RbU2nHr3O4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.74-2.1.75-1-0b040ade.zip",
            "size": 111,
            "sha256": "gR8BIXKtGze2sXudKYQ/w8BUZxDm2HQQ6RbU2nHr3O4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.74-2.1.75-1-f8806720.zip",
            "size": 111,
            "sha256": "gR8BIXKtGze2sXudKYQ/w8BUZxDm2HQQ6RbU2nHr3O4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.74-2.1.75-1-62b4874d.zip",
            "size": 14479,
            "sha256": "FP4YqSg8XfpPI3L5iVhUgFu0/yVMwuzu+eKPKC3RUf4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.74-2.1.75-1-26e00f79.zip",
            "size": 111,
            "sha256": "q34ZdZ/dSWgR4CUKYtEBcW3j709wFisDnTFGX08NPmU="
          }
        ]
      },
      {
        "version": "2.1.76",
        "original_version": "2.1.75",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.75-2.1.76-1-89f6f2fe.zip",
            "size": 111,
            "sha256": "R9HDUPIuBxaOpDE5mKsRoX9nyKEWY3AOWhu7U9/PyaE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.75-2.1.76-1-95b7da35.zip",
            "size": 111,
            "sha256": "R9HDUPIuBxaOpDE5mKsRoX9nyKEWY3AOWhu7U9/PyaE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.75-2.1.76-1-05fced3f.zip",
            "size": 111,
            "sha256": "R9HDUPIuBxaOpDE5mKsRoX9nyKEWY3AOWhu7U9/PyaE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.75-2.1.76-1-a3b50d8b.zip",
            "size": 4570338,
            "sha256": "XiQzngtPZM9ce7XFGa3uIDonET7e5foz9jak/MfaFus="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.75-2.1.76-1-6b341ca4.zip",
            "size": 566,
            "sha256": "gYfSclTyS8AoMSc5kmVYkztZmaWhwXQ3AUIn/1tfgSo="
          }
        ]
      },
      {
        "version": "2.1.77",
        "original_version": "2.1.76",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.76-2.1.77-1-ecf4f452.zip",
            "size": 111,
            "sha256": "oNYxoOpuEoRULF9Ce3bCbWuwQgbZ3nj0c0sHaRsfNnE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.76-2.1.77-1-966ae5e3.zip",
            "size": 111,
            "sha256": "oNYxoOpuEoRULF9Ce3bCbWuwQgbZ3nj0c0sHaRsfNnE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.76-2.1.77-1-ec788e40.zip",
            "size": 111,
            "sha256": "oNYxoOpuEoRULF9Ce3bCbWuwQgbZ3nj0c0sHaRsfNnE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.76-2.1.77-1-b7ca5750.zip",
            "size": 704306,
            "sha256": "4lb3oMMXYEid0DOyWfQmMnI9XZGl7qSGciBJeHID8fI="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.76-2.1.77-1-ac9de0b7.zip",
            "size": 111,
            "sha256": "oNYxoOpuEoRULF9Ce3bCbWuwQgbZ3nj0c0sHaRsfNnE="
          }
        ]
      },
      {
        "version": "2.1.78",
        "original_version": "2.1.77",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.77-2.1.78-1-17e74766.zip",
            "size": 111,
            "sha256": "tL0e4078kitv3p4DoVogcHFDbBOiDvr+KzuvbnwhUA4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.77-2.1.78-1-7924fe2e.zip",
            "size": 111,
            "sha256": "tL0e4078kitv3p4DoVogcHFDbBOiDvr+KzuvbnwhUA4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.77-2.1.78-1-59cae53a.zip",
            "size": 111,
            "sha256": "tL0e4078kitv3p4DoVogcHFDbBOiDvr+KzuvbnwhUA4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.77-2.1.78-1-2314b383.zip",
            "size": 13610809,
            "sha256": "gmYuncAQAlBiJKeOQfEieP30Ft5cviTFOg7RrQvuZF4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.77-2.1.78-1-2c12f19a.zip",
            "size": 3558,
            "sha256": "mSjAlpGSb0Mj60HiZ2Sl+bZZo1OOG6Mp4CDYChzNESk="
          }
        ]
      },
      {
        "version": "2.1.79",
        "original_version": "2.1.78",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.78-2.1.79-1-5cbd1f56.zip",
            "size": 111,
            "sha256": "Vr/vbpGS3VinfW3bfdf08qlD3dSCJGlyqEGB0rZUTIs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.78-2.1.79-1-9b5910ea.zip",
            "size": 111,
            "sha256": "Vr/vbpGS3VinfW3bfdf08qlD3dSCJGlyqEGB0rZUTIs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.78-2.1.79-1-f96479dc.zip",
            "size": 111,
            "sha256": "Vr/vbpGS3VinfW3bfdf08qlD3dSCJGlyqEGB0rZUTIs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.78-2.1.79-1-24dd7b1f.zip",
            "size": 619438,
            "sha256": "rlIHO8oXCFTq/UzGh7XikMDYrhPMPc5zXGuIOemYBcQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.78-2.1.79-1-5102a63c.zip",
            "size": 111,
            "sha256": "2dM6qja4bXZPZWSH2hY5O/0Sn0zxwITXMa+k82CM8P4="
          }
        ]
      },
      {
        "version": "2.1.80",
        "original_version": "2.1.79",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.79-2.1.80-1-756433b0.zip",
            "size": 111,
            "sha256": "C/USW/iL+31U9trob7myiUZ0ZhBcg4OgNpfSHJUinak="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.79-2.1.80-1-e4b20814.zip",
            "size": 111,
            "sha256": "9OTvxF/r9S4vvB544WIrJbtzJix6GBbJwliumhI7jSI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.79-2.1.80-1-cb2fa1ec.zip",
            "size": 111,
            "sha256": "9OTvxF/r9S4vvB544WIrJbtzJix6GBbJwliumhI7jSI="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.79-2.1.80-1-da9494da.zip",
            "size": 5598466,
            "sha256": "AnLIGt401AJvc05GuWeRwHekoBK78D+WKIqzNNRCP90="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.79-2.1.80-1-7c8b237f.zip",
            "size": 111,
            "sha256": "C/USW/iL+31U9trob7myiUZ0ZhBcg4OgNpfSHJUinak="
          }
        ]
      },
      {
        "version": "2.1.81",
        "original_version": "2.1.80",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.80-2.1.81-1-1547ccce.zip",
            "size": 111,
            "sha256": "fW6QMxWPg3sAvHviXOtotcuvd8xSvcV+eM7lvZL86zw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.80-2.1.81-1-b27ed5f6.zip",
            "size": 111,
            "sha256": "fW6QMxWPg3sAvHviXOtotcuvd8xSvcV+eM7lvZL86zw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.80-2.1.81-1-57b91ea7.zip",
            "size": 111,
            "sha256": "fW6QMxWPg3sAvHviXOtotcuvd8xSvcV+eM7lvZL86zw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.80-2.1.81-1-c5ea88d0.zip",
            "size": 43981,
            "sha256": "0gdNivjjVqM+JDEz3i8rhMj9TKpxTv0YExeQMnnvpwI="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.80-2.1.81-1-66607fdb.zip",
            "size": 111,
            "sha256": "fW6QMxWPg3sAvHviXOtotcuvd8xSvcV+eM7lvZL86zw="
          }
        ]
      },
      {
        "version": "2.1.82",
        "original_version": "2.1.81",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.81-2.1.82-1-3064d389.zip",
            "size": 570,
            "sha256": "JQ0K9JwV9g3ekwrL+OV6/pw5GSfp9CEY+lY74EjOLCU="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.81-2.1.82-1-188aba0a.zip",
            "size": 111,
            "sha256": "6LG3kDTPcB/Foi8q4yDdzHzWNjkELX31OhVF8jdmhfc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.81-2.1.82-1-175f8217.zip",
            "size": 111,
            "sha256": "6LG3kDTPcB/Foi8q4yDdzHzWNjkELX31OhVF8jdmhfc="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.81-2.1.82-1-4e312db3.zip",
            "size": 1861345,
            "sha256": "c287cBFwETRvxWxjo/O/4IbWjVms/EdlnDM1rPL3ngo="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.81-2.1.82-1-4a2a641a.zip",
            "size": 111,
            "sha256": "StYrActYP60/Od6gItVRBEjxLcZqHog+BlCowCgY1lI="
          }
        ]
      },
      {
        "version": "2.1.83",
        "original_version": "2.1.82",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.82-2.1.83-1-35962038.zip",
            "size": 111,
            "sha256": "f7YOQDrOUVJJeyKZ1YMLi5Q/oy4DgrrYtMQ3xSqAyD0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.82-2.1.83-1-16fae4fa.zip",
            "size": 111,
            "sha256": "f7YOQDrOUVJJeyKZ1YMLi5Q/oy4DgrrYtMQ3xSqAyD0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.82-2.1.83-1-a03f2258.zip",
            "size": 111,
            "sha256": "f7YOQDrOUVJJeyKZ1YMLi5Q/oy4DgrrYtMQ3xSqAyD0="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.82-2.1.83-1-e95a6460.zip",
            "size": 1018084,
            "sha256": "4SO3ZOVrAwevhAHNYY98TSlUygr6PglSJ4dcdZL0iAw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.82-2.1.83-1-2610d54b.zip",
            "size": 111,
            "sha256": "f7YOQDrOUVJJeyKZ1YMLi5Q/oy4DgrrYtMQ3xSqAyD0="
          }
        ]
      },
      {
        "version": "2.1.84",
        "original_version": "2.1.83",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.83-2.1.84-1-e0dc1959.zip",
            "size": 111,
            "sha256": "sh1c6sJxpKMzHihA6a//dPKTgGxb3dDcjNpGTmi4lCQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.83-2.1.84-1-93083d3e.zip",
            "size": 111,
            "sha256": "sh1c6sJxpKMzHihA6a//dPKTgGxb3dDcjNpGTmi4lCQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.83-2.1.84-1-45617504.zip",
            "size": 111,
            "sha256": "sh1c6sJxpKMzHihA6a//dPKTgGxb3dDcjNpGTmi4lCQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.83-2.1.84-1-e4b41523.zip",
            "size": 1527401,
            "sha256": "0yuaYHjcOgEsEjti5zcryeve56Lt+ScEQThXKEaaTqE="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.83-2.1.84-1-40337f55.zip",
            "size": 294,
            "sha256": "M/m3q271g6DnveAfNheOrWgN2PjkYm9mjAQHJzeSnQs="
          }
        ]
      },
      {
        "version": "2.1.85",
        "original_version": "2.1.84",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.84-2.1.85-1-60a64ac1.zip",
            "size": 111,
            "sha256": "GFNuq+HzfACknlQ5tQ6ypAOHY/CU96Ztwt7TwY0TN/4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.84-2.1.85-1-97011cfa.zip",
            "size": 111,
            "sha256": "GFNuq+HzfACknlQ5tQ6ypAOHY/CU96Ztwt7TwY0TN/4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.84-2.1.85-1-ecf1d8b5.zip",
            "size": 111,
            "sha256": "GFNuq+HzfACknlQ5tQ6ypAOHY/CU96Ztwt7TwY0TN/4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.84-2.1.85-1-af354973.zip",
            "size": 2124311,
            "sha256": "Zy3ZOxiscROyiBPjz/QN6zytrJaySJ9Q+zBlRtlJ/h0="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.84-2.1.85-1-d3ac34e4.zip",
            "size": 838,
            "sha256": "V0FEuTOcg5DOqjTjvlX23vnC6SwDzNk1Z0qILRzXKyk="
          }
        ]
      },
      {
        "version": "2.1.86",
        "original_version": "2.1.85",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.85-2.1.86-1-7301a1fa.zip",
            "size": 111,
            "sha256": "j3VmXVAOK2i1aeyE30/oZwR6AvTQEwMhe5Pcv7hrpUU="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.85-2.1.86-1-90db90ad.zip",
            "size": 111,
            "sha256": "HGC93fNQnfunTqh8GiiBSPmQWfFV+TTMu2VI4FZIVNE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.85-2.1.86-1-0c2449aa.zip",
            "size": 111,
            "sha256": "HGC93fNQnfunTqh8GiiBSPmQWfFV+TTMu2VI4FZIVNE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.85-2.1.86-1-9cd0f980.zip",
            "size": 2280306,
            "sha256": "MDQqiy78Ia1nspCDCZM1p9uEtYopU360Ft7gkvoaqL0="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.85-2.1.86-1-dfc8cb53.zip",
            "size": 111,
            "sha256": "j3VmXVAOK2i1aeyE30/oZwR6AvTQEwMhe5Pcv7hrpUU="
          }
        ]
      },
      {
        "version": "2.1.87",
        "original_version": "2.1.86",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.86-2.1.87-1-30a3e49a.zip",
            "size": 111,
            "sha256": "tlbasCeoiXlkKgl9EZ+xgSWP25jmuzGO57QYllqDK2E="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.86-2.1.87-1-f7e4841a.zip",
            "size": 111,
            "sha256": "tlbasCeoiXlkKgl9EZ+xgSWP25jmuzGO57QYllqDK2E="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.86-2.1.87-1-41d96f43.zip",
            "size": 111,
            "sha256": "tlbasCeoiXlkKgl9EZ+xgSWP25jmuzGO57QYllqDK2E="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.86-2.1.87-1-8287210d.zip",
            "size": 391877,
            "sha256": "4joLCqWynL0xrivLLmxMfeme+0ozAB7ePRG06WbYzSg="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.86-2.1.87-1-c409a4fe.zip",
            "size": 111,
            "sha256": "FEAegWY0kcEFOVWSKqLOwu5znvqmEGIYNkn/YqqTcoI="
          }
        ]
      },
      {
        "version": "2.1.88",
        "original_version": "2.1.87",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.87-2.1.88-1-dbac777f.zip",
            "size": 111,
            "sha256": "PVliSiBP9De3sTHZR7RD5Wa8Jokts9vfWDhJoFTAY3Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.87-2.1.88-1-aecddb4d.zip",
            "size": 111,
            "sha256": "PVliSiBP9De3sTHZR7RD5Wa8Jokts9vfWDhJoFTAY3Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.87-2.1.88-1-b389dbad.zip",
            "size": 111,
            "sha256": "PVliSiBP9De3sTHZR7RD5Wa8Jokts9vfWDhJoFTAY3Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.87-2.1.88-1-9311eb3b.zip",
            "size": 8841,
            "sha256": "KTCuas6i7fPSrZ7Enici11ebbBxb9Q6k74CM5opT4Mo="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.87-2.1.88-1-1f830055.zip",
            "size": 111,
            "sha256": "El0OvpAmM+AvZ13VgPHZpsszGSH0RFdcE7jol8kGIRs="
          }
        ]
      },
      {
        "version": "2.1.89",
        "original_version": "2.1.88",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.88-2.1.89-1-c08edd56.zip",
            "size": 111,
            "sha256": "GEbg0z93q7FdioTk9DGsVrSCRe0NViqJbfFU4U2ql3A="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.88-2.1.89-1-895355b1.zip",
            "size": 111,
            "sha256": "GEbg0z93q7FdioTk9DGsVrSCRe0NViqJbfFU4U2ql3A="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.88-2.1.89-1-9fe04401.zip",
            "size": 111,
            "sha256": "GEbg0z93q7FdioTk9DGsVrSCRe0NViqJbfFU4U2ql3A="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.88-2.1.89-1-3504fc81.zip",
            "size": 280,
            "sha256": "2VYn8fP1lc8HhN6nspA/43PsfCVytC1iGrbedOY37AA="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.88-2.1.89-1-26c2cce4.zip",
            "size": 111,
            "sha256": "GEbg0z93q7FdioTk9DGsVrSCRe0NViqJbfFU4U2ql3A="
          }
        ]
      },
      {
        "version": "2.1.90",
        "original_version": "2.1.89",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.89-2.1.90-1-73fe27ee.zip",
            "size": 111,
            "sha256": "uTfEpjgK6OwM/cypEa8uZnDftW/zK1EPwJ851Upg9bQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.89-2.1.90-1-98d19958.zip",
            "size": 111,
            "sha256": "uTfEpjgK6OwM/cypEa8uZnDftW/zK1EPwJ851Upg9bQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.89-2.1.90-1-908373db.zip",
            "size": 111,
            "sha256": "uTfEpjgK6OwM/cypEa8uZnDftW/zK1EPwJ851Upg9bQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.89-2.1.90-1-5261b5aa.zip",
            "size": 6517396,
            "sha256": "ZFyD/fwjuObrKoY53euBOX2ePs52q1jlLsE9nfRrWp0="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.89-2.1.90-1-1f0b200e.zip",
            "size": 3558,
            "sha256": "z8MpboCr2MXS+9wMRGf8LxHR1wl4XAmz2f6BltUv2Mg="
          }
        ]
      },
      {
        "version": "2.1.91",
        "original_version": "2.1.90",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.90-2.1.91-1-af96cb9f.zip",
            "size": 111,
            "sha256": "8T6VvSqkyjgHRs10AI1OD9naSFaUA7MrMjNUDpwCQfM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.90-2.1.91-1-5087519b.zip",
            "size": 111,
            "sha256": "8T6VvSqkyjgHRs10AI1OD9naSFaUA7MrMjNUDpwCQfM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.90-2.1.91-1-0805c6c3.zip",
            "size": 111,
            "sha256": "8T6VvSqkyjgHRs10AI1OD9naSFaUA7MrMjNUDpwCQfM="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.90-2.1.91-1-607940a2.zip",
            "size": 3369443,
            "sha256": "76yh8w3+U5eDqBAHjlB3o0Jg7iiUvRsNRLlFk0O1j8o="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.90-2.1.91-1-fb763b7e.zip",
            "size": 294,
            "sha256": "U1oY1FR2NXfiCdw7HgWSH0GeImqi6zIrBXfLNLqzbYw="
          }
        ]
      },
      {
        "version": "2.1.92",
        "original_version": "2.1.91",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.91-2.1.92-1-d0badae8.zip",
            "size": 111,
            "sha256": "6jNdY138ISqF8thoMSHTJ19fehle0wrvudJfcB4lEcI="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.91-2.1.92-1-6158bbe3.zip",
            "size": 111,
            "sha256": "SolalVXKzlVMQLlOD2YUA58vg9iS18MLVzZSDSX4Yh4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.91-2.1.92-1-60c24c6b.zip",
            "size": 111,
            "sha256": "SolalVXKzlVMQLlOD2YUA58vg9iS18MLVzZSDSX4Yh4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.91-2.1.92-1-c79d87bf.zip",
            "size": 923222,
            "sha256": "pPBG27SAbpo64RuX12k3yQuYkHuPemdKv0k7OnGazog="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.91-2.1.92-1-2eca4a4e.zip",
            "size": 111,
            "sha256": "6jNdY138ISqF8thoMSHTJ19fehle0wrvudJfcB4lEcI="
          }
        ]
      },
      {
        "version": "2.1.93",
        "original_version": "2.1.92",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.92-2.1.93-1-4f1dbfc7.zip",
            "size": 216330,
            "sha256": "u3rH121aWb5zD7wimVMcUE5ETXbrlmg2kFf/VQrNsGo="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.92-2.1.93-1-dd9b4c40.zip",
            "size": 111,
            "sha256": "/uLCGZZRGMnMEIM1Tvu/HyrKk3+UmGUF3Ez7fPWgUGA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.92-2.1.93-1-beff289a.zip",
            "size": 111,
            "sha256": "/uLCGZZRGMnMEIM1Tvu/HyrKk3+UmGUF3Ez7fPWgUGA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.92-2.1.93-1-e2f51ee5.zip",
            "size": 3173269,
            "sha256": "8dnQSviTM5CAvLWEZWdOxbGsNAcdQoW5SFby6znJNlM="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.92-2.1.93-1-dc2dc339.zip",
            "size": 111,
            "sha256": "/uLCGZZRGMnMEIM1Tvu/HyrKk3+UmGUF3Ez7fPWgUGA="
          }
        ]
      },
      {
        "version": "2.1.94",
        "original_version": "2.1.93",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.93-2.1.94-1-60609b1b.zip",
            "size": 111,
            "sha256": "4QNA5V5tc9XfsBtZ6xL4hhBtRwNBLmu2RJxPQBUoqME="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.93-2.1.94-1-88683de6.zip",
            "size": 111,
            "sha256": "4QNA5V5tc9XfsBtZ6xL4hhBtRwNBLmu2RJxPQBUoqME="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.93-2.1.94-1-4fe12111.zip",
            "size": 111,
            "sha256": "4QNA5V5tc9XfsBtZ6xL4hhBtRwNBLmu2RJxPQBUoqME="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.93-2.1.94-1-a734feab.zip",
            "size": 1828,
            "sha256": "YFBmwA7kUB+YrWUIYUxom6FBkSqj2vftaRidU/Lx/kU="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.93-2.1.94-1-39c36ac9.zip",
            "size": 566,
            "sha256": "PRr9vRnFlS5aENCFpTL4Xp0rrJt2YLUU4Ev9wbVhHwU="
          }
        ]
      },
      {
        "version": "2.1.95",
        "original_version": "2.1.94",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.94-2.1.95-1-67ba8b14.zip",
            "size": 111,
            "sha256": "HTRWujZ+Sm/qK9JImEXHSFmp5nfLIaIQ0ttG/yS+CVw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.94-2.1.95-1-37f1c50b.zip",
            "size": 111,
            "sha256": "HTRWujZ+Sm/qK9JImEXHSFmp5nfLIaIQ0ttG/yS+CVw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.94-2.1.95-1-5b9b55b6.zip",
            "size": 111,
            "sha256": "HTRWujZ+Sm/qK9JImEXHSFmp5nfLIaIQ0ttG/yS+CVw="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.94-2.1.95-1-354a83a2.zip",
            "size": 644062,
            "sha256": "iX5crM98MgQYXgN+nL4/0BIQNzoligT9GFHOb33Ygfw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.94-2.1.95-1-052a47a4.zip",
            "size": 1382,
            "sha256": "cdk08VtH12qTgJl9GftaBeg1aopplziAojLsqfQo1WY="
          }
        ]
      },
      {
        "version": "2.1.96",
        "original_version": "2.1.95",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.95-2.1.96-1-be400777.zip",
            "size": 111,
            "sha256": "UkDSIlGSbniLZ4kUZ9SR+wR5Yp4C2oymnCimEwydfvc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.95-2.1.96-1-b65eaed4.zip",
            "size": 111,
            "sha256": "h3r6teOO8fstK8CbWzQGde3UZO0YGuJsK42CAEkGebo="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.95-2.1.96-1-93273679.zip",
            "size": 111,
            "sha256": "h3r6teOO8fstK8CbWzQGde3UZO0YGuJsK42CAEkGebo="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.95-2.1.96-1-fb5bcf48.zip",
            "size": 1970685,
            "sha256": "VNpaL0weiBSFPGWdPEUSQWVAaHhVC/yriwAr9ZEfcrw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.95-2.1.96-1-a8e45a28.zip",
            "size": 111,
            "sha256": "UkDSIlGSbniLZ4kUZ9SR+wR5Yp4C2oymnCimEwydfvc="
          }
        ]
      },
      {
        "version": "2.1.97",
        "original_version": "2.1.96",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.96-2.1.97-1-6fbc701a.zip",
            "size": 111,
            "sha256": "FMsM+MPsATgSB6oxvMpQyhzt9tZs1wu/Sx3T6l0pJbQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.96-2.1.97-1-64a82081.zip",
            "size": 111,
            "sha256": "FMsM+MPsATgSB6oxvMpQyhzt9tZs1wu/Sx3T6l0pJbQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.96-2.1.97-1-5738cf98.zip",
            "size": 111,
            "sha256": "FMsM+MPsATgSB6oxvMpQyhzt9tZs1wu/Sx3T6l0pJbQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.96-2.1.97-1-a0a9c602.zip",
            "size": 831625,
            "sha256": "NDzcNVzuxm0Yqvvoo7HxMJxZpPXwCWspOc4bSo7VRdk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.96-2.1.97-1-3350c84f.zip",
            "size": 111,
            "sha256": "FMsM+MPsATgSB6oxvMpQyhzt9tZs1wu/Sx3T6l0pJbQ="
          }
        ]
      },
      {
        "version": "2.1.98",
        "original_version": "2.1.97",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.97-2.1.98-1-a34e5b38.zip",
            "size": 111,
            "sha256": "CaUHcnPF+/RR0GB8TokaNy1/7QrVH+f1An6Z8C83vLc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.97-2.1.98-1-f88c2d3f.zip",
            "size": 111,
            "sha256": "CaUHcnPF+/RR0GB8TokaNy1/7QrVH+f1An6Z8C83vLc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.97-2.1.98-1-d9057480.zip",
            "size": 111,
            "sha256": "gHhFttTiRchNTRwcVwIqQUhlARSxWeRcoheiNJUkx5c="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.97-2.1.98-1-6deeb5d8.zip",
            "size": 544332,
            "sha256": "jbBB422iALh1GaLYNgNcW4g3zru4BNrrWIkwIQb2cMo="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.97-2.1.98-1-b040fa63.zip",
            "size": 111,
            "sha256": "CaUHcnPF+/RR0GB8TokaNy1/7QrVH+f1An6Z8C83vLc="
          }
        ]
      },
      {
        "version": "2.1.99",
        "original_version": "2.1.98",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.98-2.1.99-1-1dd46564.zip",
            "size": 111,
            "sha256": "o3oQwhW9rjh28vaus2orcta8ALb000nNMajN4TZjNAM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.98-2.1.99-1-e48350d2.zip",
            "size": 111,
            "sha256": "o3oQwhW9rjh28vaus2orcta8ALb000nNMajN4TZjNAM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.98-2.1.99-1-2d5c3dec.zip",
            "size": 111,
            "sha256": "o3oQwhW9rjh28vaus2orcta8ALb000nNMajN4TZjNAM="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.98-2.1.99-1-2ff4897d.zip",
            "size": 41152,
            "sha256": "iTse22O/s+HtS4rFCXSBzJnA2Jd8UNgUOxZ7OgBSj8o="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.98-2.1.99-1-d0069de9.zip",
            "size": 111,
            "sha256": "o3oQwhW9rjh28vaus2orcta8ALb000nNMajN4TZjNAM="
          }
        ]
      },
      {
        "version": "2.1.100",
        "original_version": "2.1.99",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.99-2.1.100-1-47c0a6b4.zip",
            "size": 111,
            "sha256": "+OjPw9J4c6qdrZ9wHwncAjgqGpQ6Feu1RwvhAI6cZY8="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.99-2.1.100-1-e975f6cb.zip",
            "size": 111,
            "sha256": "U7dgMIVqsTYcRp+w69DiklVMQ6n1GAE31fxXG8vIAUc="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.99-2.1.100-1-ee494f52.zip",
            "size": 111,
            "sha256": "U7dgMIVqsTYcRp+w69DiklVMQ6n1GAE31fxXG8vIAUc="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.99-2.1.100-1-4142dfd7.zip",
            "size": 3545195,
            "sha256": "QNEqdA/O74g8J76Jh6g05xrjdxSGVg/DdDYPPYH4FEc="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.99-2.1.100-1-245dd5a0.zip",
            "size": 111,
            "sha256": "+OjPw9J4c6qdrZ9wHwncAjgqGpQ6Feu1RwvhAI6cZY8="
          }
        ]
      },
      {
        "version": "2.1.101",
        "original_version": "2.1.100",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.100-2.1.101-1-f8eda9d0.zip",
            "size": 570,
            "sha256": "a2Iz73qvgeFgLSX1O+wgaX8j3lIb2RXVrFmckm2yqKg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.100-2.1.101-1-82e815ba.zip",
            "size": 111,
            "sha256": "eBZsSsDLSqFshyC6spk1K/bRWLuLOeW9OHXFUzZV4RM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.100-2.1.101-1-0f0c1f3c.zip",
            "size": 111,
            "sha256": "eBZsSsDLSqFshyC6spk1K/bRWLuLOeW9OHXFUzZV4RM="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.100-2.1.101-1-61eb0893.zip",
            "size": 7762,
            "sha256": "4Hstqbtoybw5NLyqH/9R5QhgBtS754GuZ//jnInc8nQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.100-2.1.101-1-ef6e9fbd.zip",
            "size": 111,
            "sha256": "qud/oDScQb+nwLCfK70JJ6Eur3EhfqOCzM4HD0cVakA="
          }
        ]
      },
      {
        "version": "2.1.102",
        "original_version": "2.1.101",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.101-2.1.102-1-93636467.zip",
            "size": 7385,
            "sha256": "4UXm8GRKnVMH5kBdEg5iBU27RgZazGLe3zXkZmyOYYM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.101-2.1.102-1-dd1c9193.zip",
            "size": 111,
            "sha256": "qSmkFy0K9ZscDm3YX5Gl+LvfoXOrrLF80mpjmPCQ0XA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.101-2.1.102-1-3ce7ef33.zip",
            "size": 111,
            "sha256": "qSmkFy0K9ZscDm3YX5Gl+LvfoXOrrLF80mpjmPCQ0XA="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.101-2.1.102-1-ffbabfd2.zip",
            "size": 1472593,
            "sha256": "qywCcxe5F+i/1dwHZMjCi7gTMrZHWLfF0DkbviXBBMk="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.101-2.1.102-1-7dfc0103.zip",
            "size": 111,
            "sha256": "2usPZtgKpGw/xTH2zksqrsyWmKXmWgSrStY+5fZEnOM="
          }
        ]
      },
      {
        "version": "2.1.103",
        "original_version": "2.1.102",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.102-2.1.103-1-5a7d8971.zip",
            "size": 111,
            "sha256": "+lUN5ERRlN/yl+pnkfs/VzeO8+z7rDUzpFk6FEWUacs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.102-2.1.103-1-ada67ca2.zip",
            "size": 111,
            "sha256": "+lUN5ERRlN/yl+pnkfs/VzeO8+z7rDUzpFk6FEWUacs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.102-2.1.103-1-6e8f5491.zip",
            "size": 111,
            "sha256": "+lUN5ERRlN/yl+pnkfs/VzeO8+z7rDUzpFk6FEWUacs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.102-2.1.103-1-44dd490a.zip",
            "size": 1934509,
            "sha256": "Ajuy5/fwaZMWhD/VxQkG2htXOIGblIuor9MowwqjkK8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.102-2.1.103-1-643f4fae.zip",
            "size": 111,
            "sha256": "+lUN5ERRlN/yl+pnkfs/VzeO8+z7rDUzpFk6FEWUacs="
          }
        ]
      },
      {
        "version": "2.1.104",
        "original_version": "2.1.103",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.103-2.1.104-1-c8018ea0.zip",
            "size": 111,
            "sha256": "nh+pwxnX36am1wjFfdpeH8mKveoQYhavJ0f8Jy6b65Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.103-2.1.104-1-40bdb980.zip",
            "size": 111,
            "sha256": "nh+pwxnX36am1wjFfdpeH8mKveoQYhavJ0f8Jy6b65Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.103-2.1.104-1-5386eb9f.zip",
            "size": 111,
            "sha256": "nh+pwxnX36am1wjFfdpeH8mKveoQYhavJ0f8Jy6b65Q="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.103-2.1.104-1-f4d458b3.zip",
            "size": 51816,
            "sha256": "0mKGTWNkSspvZIS1MkWZaPlD3V+nCy49a1dZD9kLGmw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.103-2.1.104-1-8aca466b.zip",
            "size": 566,
            "sha256": "RpU3Ke0qkqoSRm2Fa1xNo4sTsSX9QEnLJCz4TCF6BzQ="
          }
        ]
      },
      {
        "version": "2.1.105",
        "original_version": "2.1.104",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.104-2.1.105-1-1d9533cb.zip",
            "size": 111,
            "sha256": "b7qVkNIaPTcu505JLqubs/0hlxy3W/Bkq2Mc6tJw24o="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.104-2.1.105-1-1f367130.zip",
            "size": 111,
            "sha256": "b7qVkNIaPTcu505JLqubs/0hlxy3W/Bkq2Mc6tJw24o="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.104-2.1.105-1-9515b2ab.zip",
            "size": 111,
            "sha256": "IFGSxFQONbalQdTbzC3YDQplj+Jf7Rhaf05IhIZKA1Y="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.104-2.1.105-1-191afdbd.zip",
            "size": 41274,
            "sha256": "l3zP1QX8To6rcdGh98zW4LebUJKrQk4ZWE241nTAWx4="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.104-2.1.105-1-9ba0c0d3.zip",
            "size": 111,
            "sha256": "b7qVkNIaPTcu505JLqubs/0hlxy3W/Bkq2Mc6tJw24o="
          }
        ]
      },
      {
        "version": "2.1.106",
        "original_version": "2.1.105",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.105-2.1.106-1-6393e7c4.zip",
            "size": 111,
            "sha256": "NMnIT8VLR+tXjnoXlm9CWlg/xOOz00qis4dcikBbSoE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.105-2.1.106-1-87bde17a.zip",
            "size": 111,
            "sha256": "NMnIT8VLR+tXjnoXlm9CWlg/xOOz00qis4dcikBbSoE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.105-2.1.106-1-9377d60b.zip",
            "size": 111,
            "sha256": "NMnIT8VLR+tXjnoXlm9CWlg/xOOz00qis4dcikBbSoE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.105-2.1.106-1-d14a4438.zip",
            "size": 74090,
            "sha256": "Yfkwb6eYu039sAXfkwUK/4jz+g5KktN93zeJs5EwO24="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.105-2.1.106-1-ab4433a4.zip",
            "size": 111,
            "sha256": "7hFrsfnHObbB61lQptdbsmEds3Pjqhf2CSZBinpgg0Y="
          }
        ]
      },
      {
        "version": "2.1.107",
        "original_version": "2.1.106",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.106-2.1.107-1-f1eeec87.zip",
            "size": 8880,
            "sha256": "OLJVF9Qy+GjxdTz7qGfvmt3qbiZquUlSt33ZedqMOOw="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.106-2.1.107-1-7bb8c1d5.zip",
            "size": 111,
            "sha256": "WR1BZaLwnuxdZ6kM+HzYfuzzDw8JKnOiqPZKXzheHSA="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.106-2.1.107-1-77049bb1.zip",
            "size": 111,
            "sha256": "Svf+vOXQqeLV+ZixGEnRdjEkHMUUlzd3NzMvllZflS0="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.106-2.1.107-1-49941398.zip",
            "size": 82605,
            "sha256": "z54S7jpR9f8JQX5ZFRqHOzkKp1c3yeQSj8HCImDC3ks="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.106-2.1.107-1-01e8cc17.zip",
            "size": 111,
            "sha256": "WR1BZaLwnuxdZ6kM+HzYfuzzDw8JKnOiqPZKXzheHSA="
          }
        ]
      },
      {
        "version": "2.1.108",
        "original_version": "2.1.107",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.107-2.1.108-1-51164478.zip",
            "size": 3713017,
            "sha256": "ATj2pJ6GPfeRlbPskyDCxujj6djUad6vFIsOgNc16hU="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.107-2.1.108-1-034b8395.zip",
            "size": 111,
            "sha256": "G1VxgDbqW9CqjFZuL1QRC3p7eOK5DPEV8+7lMwKXBq4="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.107-2.1.108-1-171b6396.zip",
            "size": 111,
            "sha256": "G1VxgDbqW9CqjFZuL1QRC3p7eOK5DPEV8+7lMwKXBq4="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-1-c698ebdd.zip",
            "size": 20964157,
            "sha256": "ucBz84RlkcMu4468WCBUDGAxlZ0+wGTV1vsf8DpdOvY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-2-2673aea2.zip",
            "size": 21060940,
            "sha256": "e47jKm3j9ti2ktGBI0/uaQOsJmTUxNXodyzwS/5w7ec="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-3-76df3502.zip",
            "size": 19385781,
            "sha256": "Wbthd9L/csOrQVlgx8XzZi11/50Apvpj8ZuqpHAXdo0="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-4-ee68c80f.zip",
            "size": 20494066,
            "sha256": "4Pt/fqTp05HNNLXPKed8eGhslcNZY2QkOX+GONp0Mqo="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-5-ce16da5f.zip",
            "size": 20280523,
            "sha256": "/ma/0QAxNTXDnGzR+vgmaUQR/JHp97GgAzxgoSezCOQ="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-6-d082b999.zip",
            "size": 21165324,
            "sha256": "pHnvJo+RhBNnGMy8bbMvqkTmVDMXU7GF+EGWKSOZ510="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-7-16ba4f79.zip",
            "size": 21120865,
            "sha256": "0p3sogCfmrLg2b7GQuvFb3Rs3HNPzhi9VuUj7FDF2zg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-8-45642960.zip",
            "size": 20865314,
            "sha256": "5GEwhLXVLtw8CIvasGRVNNnGS1g/rBJ/tKv7J7CS7tY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-9-349098c8.zip",
            "size": 20979113,
            "sha256": "EHkheFdGUe/jGYgcAWGr1e7AwY96xyRjBzaWbgmJrOs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-10-346767c2.zip",
            "size": 21147847,
            "sha256": "/EYcfsWJ7BLwY1eoBtsgU2BhFxdGX8+nyFRnhGZnl74="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-11-4a6bc43f.zip",
            "size": 21141519,
            "sha256": "5b6EcxIfdUxzHwADFdoKdpVAuOWA/8KLjjqSFIhq0I0="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-12-f52f63d4.zip",
            "size": 21094154,
            "sha256": "hZfjtuMnSTOBsVwlUp0SbGwxTjn6S/FkWpC4bj4hY9M="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.107-2.1.108-13-e4a85594.zip",
            "size": 17270014,
            "sha256": "jyXBpIRRuLRCkXuSyErsyOGsiEtp+Ch+wINObZwEKec="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.107-2.1.108-1-ef11c0fa.zip",
            "size": 21089644,
            "sha256": "FgActGv+/W1ouTBWYhr+VyOHo84S7BZ3rhe6HBorR/s="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.107-2.1.108-2-5f8a2fe2.zip",
            "size": 21167590,
            "sha256": "DFYXhLb3JqfTWefee3DeELTx1s9l9gs4qq7+e2n+k4k="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.107-2.1.108-3-4d4a77b7.zip",
            "size": 15364119,
            "sha256": "oLsJD4Qb9P8cXXDTW9FhFjPGgqEIsQgxdwSvl1lsVck="
          }
        ]
      },
      {
        "version": "2.1.109",
        "original_version": "2.1.108",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.108-2.1.109-1-b6840fe4.zip",
            "size": 111,
            "sha256": "q+Bmzkp4vnXHQ2iph37H03pScVbNidqjookCI72+4fo="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.108-2.1.109-1-7e9d642d.zip",
            "size": 111,
            "sha256": "q+Bmzkp4vnXHQ2iph37H03pScVbNidqjookCI72+4fo="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.108-2.1.109-1-10881465.zip",
            "size": 111,
            "sha256": "q+Bmzkp4vnXHQ2iph37H03pScVbNidqjookCI72+4fo="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.108-2.1.109-1-3137067c.zip",
            "size": 4231970,
            "sha256": "HiVnvIF0J4mT+7MSX0o1fUIfpkPiLCFXWVosPTOLN9g="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.108-2.1.109-1-a54d8d7c.zip",
            "size": 111,
            "sha256": "q+Bmzkp4vnXHQ2iph37H03pScVbNidqjookCI72+4fo="
          }
        ]
      },
      {
        "version": "2.1.110",
        "original_version": "2.1.109",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.109-2.1.110-1-7ce58e05.zip",
            "size": 111,
            "sha256": "I1SO59mw+HBCufJyuf9GnRz64dnFvpqxB8QrooVznNM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.109-2.1.110-1-01207ec6.zip",
            "size": 111,
            "sha256": "I1SO59mw+HBCufJyuf9GnRz64dnFvpqxB8QrooVznNM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.109-2.1.110-1-b1704d46.zip",
            "size": 111,
            "sha256": "I1SO59mw+HBCufJyuf9GnRz64dnFvpqxB8QrooVznNM="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.109-2.1.110-1-ec46191c.zip",
            "size": 4650,
            "sha256": "wSxnBHNLZq4tkQufwf8ykWgFXhWjAsikFuL+uzzXJII="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.109-2.1.110-1-c7aeb827.zip",
            "size": 111,
            "sha256": "I1SO59mw+HBCufJyuf9GnRz64dnFvpqxB8QrooVznNM="
          }
        ]
      },
      {
        "version": "2.1.111",
        "original_version": "2.1.110",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.110-2.1.111-1-0de0eb41.zip",
            "size": 570,
            "sha256": "70cM6Iv8O1Ew+Rdy2zMaMUL5RM20x68NHdUozZ3RIQ0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.110-2.1.111-1-e963da0c.zip",
            "size": 111,
            "sha256": "zmHtbc5s5VFKRIL813YyCBDHaIQph4TZIn0k+49brYk="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.110-2.1.111-1-fbadbe55.zip",
            "size": 111,
            "sha256": "zmHtbc5s5VFKRIL813YyCBDHaIQph4TZIn0k+49brYk="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.110-2.1.111-1-e4810826.zip",
            "size": 3782262,
            "sha256": "dfOxsgwuvyDYRNinj17GikZiKjI5F9Gted11NKzwweo="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.110-2.1.111-1-b5f5d89c.zip",
            "size": 838,
            "sha256": "GzkDMSxzqAf2PvJpGraS1kX3yg7unrW3v10qOG1caFs="
          }
        ]
      },
      {
        "version": "2.1.112",
        "original_version": "2.1.111",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.111-2.1.112-1-3ff59446.zip",
            "size": 111,
            "sha256": "CqD04ke9sQZj2Y0qGaP/ZBzpNV4Eqerw5Lf2pt9a698="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.111-2.1.112-1-cad7d58f.zip",
            "size": 111,
            "sha256": "CqD04ke9sQZj2Y0qGaP/ZBzpNV4Eqerw5Lf2pt9a698="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.111-2.1.112-1-9a3cb7f8.zip",
            "size": 111,
            "sha256": "CqD04ke9sQZj2Y0qGaP/ZBzpNV4Eqerw5Lf2pt9a698="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.111-2.1.112-1-461b7a80.zip",
            "size": 501779,
            "sha256": "XUQvt3Pz+CVmvez4yWa6L0aV6ov91kxglmgaZ4yTDNs="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.111-2.1.112-1-26ec9cb0.zip",
            "size": 111,
            "sha256": "CqD04ke9sQZj2Y0qGaP/ZBzpNV4Eqerw5Lf2pt9a698="
          }
        ]
      },
      {
        "version": "2.1.113",
        "original_version": "2.1.112",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.112-2.1.113-1-f29e95df.zip",
            "size": 111,
            "sha256": "jGLY+MJ7B0MKk+2ri9EgHCIMQqhVfVCZHO5LqxYh83w="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.112-2.1.113-1-1f9d942b.zip",
            "size": 111,
            "sha256": "jGLY+MJ7B0MKk+2ri9EgHCIMQqhVfVCZHO5LqxYh83w="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.112-2.1.113-1-55de87ea.zip",
            "size": 111,
            "sha256": "CjFPp8lqstltCYbekUSjsnciTuheqcKF9CaostxAh1o="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.112-2.1.113-1-1982e85c.zip",
            "size": 3422635,
            "sha256": "2apAJyJPORyl4VK37G8pl70N/K4hQKKRy8bsjw1Zr/w="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.112-2.1.113-1-7545f8f8.zip",
            "size": 111,
            "sha256": "jGLY+MJ7B0MKk+2ri9EgHCIMQqhVfVCZHO5LqxYh83w="
          }
        ]
      },
      {
        "version": "2.1.114",
        "original_version": "2.1.113",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.113-2.1.114-1-ff96a374.zip",
            "size": 111,
            "sha256": "ckBYwaLYGKerSgQ0PagvOPjdwyGUtCXT4BNe027llNE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.113-2.1.114-1-5db2bbc3.zip",
            "size": 111,
            "sha256": "ckBYwaLYGKerSgQ0PagvOPjdwyGUtCXT4BNe027llNE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.113-2.1.114-1-5cf3c04d.zip",
            "size": 111,
            "sha256": "ckBYwaLYGKerSgQ0PagvOPjdwyGUtCXT4BNe027llNE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.113-2.1.114-1-8b933bd0.zip",
            "size": 502968,
            "sha256": "AOsrJnE5IOIwjLfnVQHnusmxRh2RGDzhsixBWpSqX/0="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.113-2.1.114-1-66e620a1.zip",
            "size": 111,
            "sha256": "njHOeUXdm/9KoicQF+VvZjhbDHHVpYCgfthV+hVdSQQ="
          }
        ]
      },
      {
        "version": "2.1.115",
        "original_version": "2.1.114",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.114-2.1.115-1-344806d9.zip",
            "size": 111,
            "sha256": "VLCwRjeGnwr+aKlDiMXnh4mjI1IyIKq62jJfL93nuJs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.114-2.1.115-1-7625afc3.zip",
            "size": 111,
            "sha256": "VLCwRjeGnwr+aKlDiMXnh4mjI1IyIKq62jJfL93nuJs="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.114-2.1.115-1-55cfed2b.zip",
            "size": 111,
            "sha256": "VLCwRjeGnwr+aKlDiMXnh4mjI1IyIKq62jJfL93nuJs="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.114-2.1.115-1-4daaa552.zip",
            "size": 904487,
            "sha256": "PpV0PkQt7OQQgVYCj9QJ4uZYw/TdWka9Frem5LkKpKw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.114-2.1.115-1-4871b97b.zip",
            "size": 111,
            "sha256": "VLCwRjeGnwr+aKlDiMXnh4mjI1IyIKq62jJfL93nuJs="
          }
        ]
      },
      {
        "version": "2.1.116",
        "original_version": "2.1.115",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.115-2.1.116-1-f4b9b996.zip",
            "size": 111,
            "sha256": "v6eh3V/HDr7ezcHXGY2s24IJHWJLnftSAD4xJA1Yams="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.115-2.1.116-1-9079ce5a.zip",
            "size": 111,
            "sha256": "v6eh3V/HDr7ezcHXGY2s24IJHWJLnftSAD4xJA1Yams="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.115-2.1.116-1-e1d9e8e5.zip",
            "size": 111,
            "sha256": "v6eh3V/HDr7ezcHXGY2s24IJHWJLnftSAD4xJA1Yams="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.115-2.1.116-1-52d2eba0.zip",
            "size": 523628,
            "sha256": "Zd9weMxSLs0MjdrR0LUtOFrGVTDDT98CJsk2n3XGVmY="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.115-2.1.116-1-93081c16.zip",
            "size": 111,
            "sha256": "v6eh3V/HDr7ezcHXGY2s24IJHWJLnftSAD4xJA1Yams="
          }
        ]
      },
      {
        "version": "2.1.117",
        "original_version": "2.1.116",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.116-2.1.117-1-7f6557a0.zip",
            "size": 111,
            "sha256": "nm90bqDOfgObi24PH1SLFxWkHFNJIj5gZ1fcK9lKtYE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.116-2.1.117-1-70307206.zip",
            "size": 111,
            "sha256": "nm90bqDOfgObi24PH1SLFxWkHFNJIj5gZ1fcK9lKtYE="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.116-2.1.117-1-13845207.zip",
            "size": 111,
            "sha256": "nm90bqDOfgObi24PH1SLFxWkHFNJIj5gZ1fcK9lKtYE="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.116-2.1.117-1-abc9a5c1.zip",
            "size": 300322,
            "sha256": "FRIgRp0H2EcAvuoJgkOAaG0H94wyVkhn999F/omfPtY="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.116-2.1.117-1-b1266c40.zip",
            "size": 111,
            "sha256": "nm90bqDOfgObi24PH1SLFxWkHFNJIj5gZ1fcK9lKtYE="
          }
        ]
      },
      {
        "version": "2.1.118",
        "original_version": "2.1.117",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.117-2.1.118-1-5730dbbf.zip",
            "size": 111,
            "sha256": "rTAKuk/mFYKR84eEijKv0pv79Q5vQo5MjL/ZIKO8tig="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.117-2.1.118-1-71c3bd8a.zip",
            "size": 111,
            "sha256": "rTAKuk/mFYKR84eEijKv0pv79Q5vQo5MjL/ZIKO8tig="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.117-2.1.118-1-99f3be71.zip",
            "size": 111,
            "sha256": "rTAKuk/mFYKR84eEijKv0pv79Q5vQo5MjL/ZIKO8tig="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.117-2.1.118-1-70742978.zip",
            "size": 645422,
            "sha256": "jNcBhMEAWEMp9IKVh0LeDbnt9WiB2tytNO721RrplQg="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.117-2.1.118-1-982ec2fc.zip",
            "size": 111,
            "sha256": "rTAKuk/mFYKR84eEijKv0pv79Q5vQo5MjL/ZIKO8tig="
          }
        ]
      },
      {
        "version": "2.1.119",
        "original_version": "2.1.118",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.118-2.1.119-1-9869b26c.zip",
            "size": 111,
            "sha256": "tN/WctCujkpsqh2n1VwePjIHV334tagWLPIRekBa0Fg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.118-2.1.119-1-04a571f8.zip",
            "size": 111,
            "sha256": "tN/WctCujkpsqh2n1VwePjIHV334tagWLPIRekBa0Fg="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.118-2.1.119-1-abeef6b0.zip",
            "size": 111,
            "sha256": "tN/WctCujkpsqh2n1VwePjIHV334tagWLPIRekBa0Fg="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.118-2.1.119-1-ed449fbf.zip",
            "size": 19558,
            "sha256": "KjtuciuuKYXwXnvUup7Gc4Y694UymE1JjfxLvAb5yqw="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.118-2.1.119-1-332df14e.zip",
            "size": 111,
            "sha256": "tN/WctCujkpsqh2n1VwePjIHV334tagWLPIRekBa0Fg="
          }
        ]
      },
      {
        "version": "2.1.120",
        "original_version": "2.1.119",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.119-2.1.120-1-979ff685.zip",
            "size": 111,
            "sha256": "77CD9fi15mo1hcL9B321Q838KDVnir8QKyRmgoECvuY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.119-2.1.120-1-ae7a7c44.zip",
            "size": 111,
            "sha256": "77CD9fi15mo1hcL9B321Q838KDVnir8QKyRmgoECvuY="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.119-2.1.120-1-0d6fb94d.zip",
            "size": 111,
            "sha256": "77CD9fi15mo1hcL9B321Q838KDVnir8QKyRmgoECvuY="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.119-2.1.120-1-356dfbf6.zip",
            "size": 521901,
            "sha256": "R3LGNnF/x8QYV8b+6huEA5Bwhdki5hn+KZTW4BPU7I8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.119-2.1.120-1-8077f9b0.zip",
            "size": 111,
            "sha256": "77CD9fi15mo1hcL9B321Q838KDVnir8QKyRmgoECvuY="
          }
        ]
      },
      {
        "version": "2.1.121",
        "original_version": "2.1.120",
        "archive": [
          {
            "location": "{$cdnAddress}/en/archive-android-diff/s_asset-2.1.120-2.1.121-1-0ba79819.zip",
            "size": 111,
            "sha256": "TW+gMf8i85yCP3AGRzLHyW7RSfm6SMJmi8+ehQCm7/0="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_medium-diff/s_asset-2.1.120-2.1.121-1-786e4b0f.zip",
            "size": 111,
            "sha256": "IgrWbO2a+7iWbD9q8NG5cHw+LTG1e0tE51lVM/f6XqM="
          },
          {
            "location": "{$cdnAddress}/en/archive-android_small-diff/s_asset-2.1.120-2.1.121-1-521fb0ba.zip",
            "size": 111,
            "sha256": "IgrWbO2a+7iWbD9q8NG5cHw+LTG1e0tE51lVM/f6XqM="
          },
          {
            "location": "{$cdnAddress}/en/archive-common-diff/s_asset-2.1.120-2.1.121-1-622d09c9.zip",
            "size": 1330801,
            "sha256": "k/utT8g9JFM5s43FvDuJfei8wfFBL2EYq8pLJltcUV8="
          },
          {
            "location": "{$cdnAddress}/en/archive-medium-diff/s_asset-2.1.120-2.1.121-1-8032d466.zip",
            "size": 111,
            "sha256": "TW+gMf8i85yCP3AGRzLHyW7RSfm6SMJmi8+ehQCm7/0="
          }
        ]
      }
    ],
    "asset_version_hash": "2ce7e2a"
  }
}
```
