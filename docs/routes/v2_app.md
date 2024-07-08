# /v2/app?appId=561429&appVer=0.0.81&market=googlePlay&sdkVer=3.14.14&os=android&lang=en&deviceId=b84b4631-8d13-45af-949a-6b3d7f206049&osVer=12&country=us&whiteKey=06f0e655-07cc-4a10-873a-7ade0411e754
                       
## Request
### Headers
```
Connection: close
User-Agent: Dalvik/2.1.0 (Linux; U; Android 12; SM-T860 Build/SP2A.220305.013)
Host: gc-infodesk-zinny3.kakaogames.com
Accept-Encoding: gzip
```

### Body
```
No Request Body
```

## Response
### Headers
```
Content-Type: application/json;charset=utf-8
Content-Length: 3677
Connection: close
Date: Fri, 07 Jun 2024 21:07:52 GMT
Server: /
sig: 5;KCibmI1DkRBHLTC96yoqEDALsfk3qA3hrmh76+8TXZE=
X-Cache: Miss from cloudfront
Via: 1.1 8c3a8f81ce0fdd483ef0c9198b7dd1be.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: ATL56-P2
X-Amz-Cf-Id: EEP9HJtmkReHP-Wj46-MkKpTu5LLeG1GKZ8e8XvVWy49uUh0P7pWLA==
```

### Body
```
{
  "status": 200,
  "desc": "OK",
  "content": {
    "supportedFeatures": [
      "urgentNotice",
      "maintenance",
      "push",
      "delivery",
      "promotion",
      "coupon",
      "notice"
    ],
    "marketUrl": "market://details?id=com.kakaogames.wdfp",
    "publicKeyMap": {},
    "secondaryPwOption": null,
    "capriAppOption": {
      "ageLimit": 0,
      "lazyAgeAuth": null,
      "appType": "LEGACY_PARTNER",
      "appCategory": "Games",
      "ageAuthLevel": "NONE"
    },
    "isTubeApp": false,
    "verRecent": "0.0.81",
    "appOption": {
      "urlCommunity": "https://twitter.com/Worldflipper_kg",
      "urlOtherMenuOfficialCafe": "https://twitter.com/Worldflipper_kg",
      "urlTitleMenuContact": "oqupie",
      "cdnAddr": "http://patch.wdfp.kakaogames.com/Live/2.0.0",
      "agreementUrl": "https://web-data-game.kakaocdn.net/real/www/html/agreement/index.html?tid=13",
      "useCoupon": "true",
      "useGoogleGame": "FALSE",
      "urlPrivacyPolicy": "https://web-data-cdn.kakaogames.com/real/www/html/terms/index.html?service=S0001&type=T003",
      "urlFriendFollowServer": "https://na.wdfp.kakaogames.com",
      "useHttpHeartbeat": "true",
      "isReproduceS3UploadOpen": "false",
      "urlTermsAndConditions": "https://web-data-game.kakaocdn.net/real/www/html/terms/index.html?service=S0001&type=T001&country=us&lang=en",
      "urlHomeNews": "https://worldflipper.playkakaogames.com/news",
      "gameServerAddr": "https://na.wdfp.kakaogames.com",
      "modTime": 1617070960617,
      "urlTitleMenuNews": "https://worldflipper.playkakaogames.com/news",
      "refreshInfodeskIntervalMin": "5",
      "urlOtherMenuContact": "oqupie",
      "urlNotice": "https://worldflipper.playkakaogames.com/news",
      "urlReviewContact": "https://kakaogames.oqupie.com/portals/2060"
    },
    "notices": [],
    "traceSampleRate": 0,
    "isWhitelist": false,
    "svcStatus": "open",
    "supportedIdpCodes": [
      "facebook",
      "google",
      "siwa",
      "zd3"
    ],
    "serverConnectionType": "https",
    "appVerStatus": "noNeedToUpdate",
    "publisher": {
      "privacyUrl": "https://www.kakao.com/ko/privacy",
      "privacySummaryUrl": "https://gameevent.kakao.com/supports/terms/3?tabbar=false",
      "noticeUrl2": "https://cus-zinny3.kakaogames.com/view/notice",
      "agreementUrl": "https://web-data-game.kakaocdn.net/real/www/html/agreement/index.html?tid=13",
      "servicePolicyUrl": "https://gameevent.kakao.com/terms/operation",
      "termsUrl": "https://gameevent.kakao.com/supports/terms/1",
      "kakaogameCommunityUrl": "https://playgame.kakao.com/bridge/auth/zinny",
      "termsSummaryUrl": "https://gameevent.kakao.com/supports/terms/1?tabbar=false",
      "eventWallUrl": "https://cus-zinny3.kakaogames.com/view/event",
      "noticeUrl": "https://cus-zinny3.kakaogames.com/notice",
      "customerServiceUrl": "https://cus-zinny3.kakaogames.com/support/list",
      "eventWinnerUrl": "http://event-winner.kakaogames.com/event",
      "policyVer": "1.0",
      "publisherId": "kakao",
      "modTime": 1651813742832
    },
    "sdk": {
      "heartbeatInterval": 120000,
      "PercentOfSendingAPICallLog": 0,
      "stopSendGeoDNS": "y",
      "snsShareUrl": "https://invite.kakaogame.com",
      "zrtiOSError": "{\"kakaocapri\":[500, 502, 503, -1, -7, -9]}",
      "aesEncryptKey": "djfdskj12328438djdgjcjeejhdew15",
      "aesEncryptIV": "7gnfn7f96rnanmt1s5iaa3kdruhuneu",
      "cafeLoginUrl": "https://accounts.kakao.com/weblogin/sso_login?token={tgt_token}&token_type=tgt&continue={url}",
      "zrtAOSError": "{\"kakaocapri\":[500, 502, 503, -1, -7, -9],\"google\":[8]}",
      "zrtWindowsError": "{\"kakaocapri\":[500, 502, 503, -1, -7, -9]}",
      "snsShareHostUrl": "https://invite.kakaogame.com/host/main",
      "invitationUrl": "https://webinvite.nzincorp.com",
      "csUrl": "http://customer.kakaogames.com:18080",
      "platformVersion": 3,
      "sessionTimeout": 10000,
      "registerDeviceUrl": "https://device-enrollment.kakaogames.com/main",
      "customDialogModels": [
        "SM-T976N"
      ],
      "unregisterAgreementUrl": "https://web-data-cdn.kakaogames.com/real/www/html/terms/index.html?service=S0001&type=T016",
      "snsShareGuestUrl": "https://invite.kakaogame.com/guest/reward"
    },
    "deviceSecurityOption": null,
    "onlineNotifications": [],
    "timestamp": 1717794472611
  }
}
```

