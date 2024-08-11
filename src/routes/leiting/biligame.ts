// api.biligame.net
// line1-sdk-app-api.biligame.net
// p.biligame.com
// static.biligame.net
// line1-log.biligame.net
// line1-sdkcenter-login.bilibiligame

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getServerTime } from "../../utils";

const routes = async (fastify: FastifyInstance) => {
    // api.biligame.net
    fastify.get("/sdk-hot-deploy/businessPath/client/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": "0000",
            "data": {
                "blockedField": [
                    157,
                    191,
                    158,
                    160
                ],
                "dataList": [],
                "paramsMap": {}
            },
            "msg": "success",
            "requestId": "0e954038-2e45-4bca-8d1d-e161a9518e01",
            "timestamp": getServerTime()
        })
    })

    fastify.get("/sdk-hot-deploy/featureFlag/client/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": "0000",
            "data": {
                "dataMap": {
                    "isNew": "1",
                    "logLevelDispensable": "1",
                    "logLevelFull": "1",
                    "logLevelImportant": "1",
                    "logLevelNormal": "1",
                    "switchEncrypt": "0",
                    "switchTrack": "1"
                }
            },
            "msg": "success",
            "requestId": "302b8f03-7b79-409c-8f9b-cb01867748c3",
            "timestamp": getServerTime()
        })
    })

    fastify.post("/cloud-storage/config/getConfig", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": "0000",
            "data": {
                "appId": "411467",
                "configItems": [
                    {
                        "key": "domain",
                        "values": [
                            "https://api.biligame.net/cloud-storage"
                        ]
                    },
                    {
                        "key": "ping",
                        "values": [
                            "api/client/verify_channel"
                        ]
                    },
                    {
                        "key": "cngKey",
                        "values": [
                            "cngValue"
                        ]
                    }
                ]
            },
            "msg": "success",
            "requestId": "444de635beef401d9213accbfdadceaa",
            "request_id": "444de635beef401d9213accbfdadceaa",
            "timestamp": getServerTime() * 1000
        })
    })

    fastify.get("/sdk-hot-deploy/routerPackage/client/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": "0000",
            "msg": "success",
            "requestId": "5c4d8219-9de6-4df3-913f-680864f31dc6",
            "timestamp": 1722559196245
        })
    })

    fastify.get("/sdk-hot-deploy/patchPackage/client/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": "0000",
            "data": [
                {
                    "highPriority": false,
                    "packageId": 105,
                    "packageMd5": "3bccd6c33b1ed69ab6c09c7ae276b47d",
                    "packagePriority": false,
                    "packageUrl": "http://sdk-hot-deploy.biligame.net/sdk/patch/3bccd6c33b1ed69ab6c09c7ae276b47d/20230324160518_patch.jar"
                },
                {
                    "highPriority": false,
                    "packageId": 108,
                    "packageMd5": "39775e6265c3e5fcf08edd178d910fbc",
                    "packagePriority": false,
                    "packageUrl": "http://sdk-hot-deploy.biligame.net/sdk/patch/39775e6265c3e5fcf08edd178d910fbc/20230414151436_patch.jar"
                },
                {
                    "highPriority": false,
                    "packageId": 146,
                    "packageMd5": "8bca9d2568cbe1d3065f71f695c506d3",
                    "packagePriority": false,
                    "packageUrl": "http://sdk-hot-deploy.biligame.net/sdk/patch/8bca9d2568cbe1d3065f71f695c506d3/20240520140437_patch.jar"
                }
            ],
            "msg": "success",
            "requestId": "e77d5bdf-d11c-42a8-8822-b758323ca3d3",
            "timestamp": getServerTime() * 1000
        })
    })

    fastify.get("/sdk-hot-deploy/pluginPackage/client/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": "0000",
            "data": [],
            "msg": "success",
            "requestId": "1cd21b9b-b829-459f-bf15-591e817d4ae7",
            "timestamp": getServerTime() * 1000
        })
    })

    fastify.post("/collector/api/report", (_, reply: FastifyReply) => {
        reply.status(200).send()
    })

    fastify.post("/game-marketing/notice/game/list", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "data": {
                "notices": [],
                "show_limit_num": 3
            },
            "message": "响应成功",
            "request_id": "6b96faf6616c4c32a601176a8ec41d12"
        })
    })
    // line1-sdk-app-api.biligame.net
    fastify.post("/api/agreement/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "data": {
                "agreement_switch": "OFF",
                "cooperation_mode": 0,
                "privacy_tips_switch": "OFF"
            },
            "message": "响应成功",
            "request_id": "81098bfa-6f3a-4a2d-86e5-06f08bf084ab",
            "success": true,
            "timestamp": getServerTime()
        })
    })

    fastify.get("/api/package/force_update", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "data": {
                "android_game_version": "",
                "android_pkg_size": 0,
                "h5_link": "",
                "native_link": "",
                "need_force_update": 0,
                "version_description": ""
            },
            "message": "响应成功",
            "request_id": "ae894b112cb14b57823f9610374462b4",
            "resp": "SUCCESS",
            "success": true,
            "timestamp": getServerTime() * 1000
        })
    })

    fastify.post("/api/config/init", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "data": {
                "contacts": [
                    {
                        "content": "800864530",
                        "name": "客服QQ",
                        "remark": "24小时在线服务"
                    },
                    {
                        "content": "400-178-2233",
                        "name": "客服电话",
                        "remark": "工作时间：9:00-21:00"
                    },
                    {
                        "content": "gamehelp@bilibili.com",
                        "name": "客服邮箱",
                        "remark": ""
                    }
                ],
                "float_config": {
                    "guide_display_num": 3,
                    "is_enable": 0,
                    "modules": [
                        {
                            "is_enable": 1,
                            "type": "RECORD_SCREEN"
                        },
                        {
                            "is_enable": 1,
                            "type": "SCREENSHOT"
                        },
                        {
                            "is_enable": 1,
                            "type": "OPEN_LIVE"
                        },
                        {
                            "is_enable": 1,
                            "type": "CUSTOMER_SERVICE"
                        }
                    ]
                },
                "live_config": {
                    "area_id": "98",
                    "bili_app_download_url": "https://d.bilibili.com/download_app.html",
                    "guide_display_num": 3,
                    "is_enable": 0
                }
            },
            "message": "响应成功",
            "request_id": "508acef4-60ce-4c50-b4f0-e202d6f166bc",
            "success": true,
            "timestamp": getServerTime() * 1000
        })
    })

    // p.biligame.com
    fastify.post("/api/external/config/v3", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "account_phone_mail_bind": "https://passport.bilibili.com/account/game/mobile/security.html#/safety",
            "account_security": "https://passport.bilibili.com/account/game/mobile/security.html#/",
            "agreement_mode": 0,
            "agreement_status": 0,
            "auth_content": "国家新闻出版署《关于防止未成年人沉迷网络游戏的通知》要求，网络游戏用户需进行实名认证，请先进行实名认证再进入游戏。实名认证信息仅用于哔哩哔哩游戏实名认证，我们不会泄露或用于其他用途。",
            "code": 0,
            "config_apple_login_switch": 0,
            "config_dns": "0",
            "config_gameinfoc": "https://gameinfoc.biligame.net",
            "config_geetest_url": "https://game.bilibili.com/sdk/geetest_v2",
            "config_https": 1,
            "config_img_url": "https://api.bilibili.com/x/recaptcha/img",
            "config_livestream_area_id": "",
            "config_livestream_switch": 0,
            "config_login_android_https": "1",
            "config_login_http": "http://line1-sdkcenter-login.bilibiligame.net",
            "config_login_https": "https://line1-sdkcenter-login.bilibiligame.net",
            "config_login_ios_https": "1",
            "config_login_realname": "1",
            "config_namepwd_register": "0",
            "config_pay_android_https": "1",
            "config_pay_http": "http://line3-sdk-svr-pay.biligame.net,http://line1-sdk-svr-pay.biligame.net,http://line3-pay.biligame.net,http://line1-pay.biligame.net",
            "config_pay_https": "https://line3-sdk-svr-pay.biligame.net,https://line1-sdk-svr-pay.biligame.net,http://line3-sdk-svr-pay.biligame.net,http://line1-sdk-svr-pay.biligame.net,https://line3-pay.biligame.net,https://line1-pay.biligame.net,http://line3-pay.biligame.net,http://line1-pay.biligame.net",
            "config_realname": "1",
            "config_reg_android_https": "1",
            "config_reg_http_list": "http://line3-sdk-center-login-sh.biligame.net,http://line1-sdk-center-login-sh.biligame.net,http://line3-login.biligame.net,http://line1-login.biligame.net",
            "config_reg_https_list": "https://line3-sdk-center-login-sh.biligame.net,https://line1-sdk-center-login-sh.biligame.net,http://line3-sdk-center-login-sh.biligame.net,http://line1-sdk-center-login-sh.biligame.net,https://line3-login.biligame.net,https://line1-login.biligame.net,http://line3-login.biligame.net,http://line1-login.biligame.net",
            "config_reg_ios_https": "1",
            "config_risk_verify_url": "https://game.bilibili.com/sdk/geetest/",
            "config_risk_verify_url_pay": "https://game.bilibili.com/sdk/gamepay",
            "config_tourist_register": "0",
            "config_waterMark": 1,
            "cooperation_mode": 0,
            "crule": "TtYMFopYrl41lUdy1q71NHXn/5Ia8TVbm3cdGAfpqQFmFBqqxrng6Ide6D8iqd+T0TZHokgvWA81uSBisURY0xW8ry0uSMk4Dll/6dbp57OgLd2jfyE+zIVNOjxZydR371tQOsGPF9J1muGtLynF2E2e34eH7T7j7YNq38XQawCvB2kky66eUr0iXqqU5yhD1zI38Cpvpc1zwbNJth00CN1e45/j4Hrnw77cK8t7i1WfCawcmY7/ssuR4n/sDR7nJgDtHgfdPIkkvB492qoa7Nd/4MilFecp5A8KtHGzSzEv2xXj4GPeFsKt9ISifE+A5lhQfLtgm4P8LO+n86pPwQ==",
            "crule_ver": "1",
            "effective_agreement_version": "0.0.0",
            "gjoa_lasted_version": 109,
            "http_list": "http://p.biligame.com",
            "https_list": "https://p.biligame.com",
            "idc_pay_host": "line3-pay.biligame.net,line1-pay.biligame.net,line3-pay.biligame.net,line1-pay.biligame.net",
            "idc_pay_host_gz": "line3-sdk-svr-pay.biligame.net,line1-sdk-svr-pay.biligame.net",
            "idc_pay_host_sh": "line3-sdk-pay-sh.biligame.net,line1-sdk-pay-sh.biligame.net",
            "joint_operation_agreement": 1,
            "login_option": "[{\"level\":1,\"loginType\":\"ACCT\",\"displayName\":\"账号密码\"}]",
            "requestId": "72c40ceae0c74f37b55e151bb27efc25",
            "server_message": "",
            "timestamp": String(getServerTime())
        })
    })

    fastify.get("/api/client/share", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 500069,
            "message": "该游戏分享配置未生效",
            "requestId": "aa3011734fed45b5ab1968df7d8ce7ca",
            "server_message": "",
            "timestamp": "1722559196220"
        })
    })

    fastify.post("/api/client/country.list", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "countryList": "{\"ts\":1722559135,\"code\":0,\"list\":[{\"id\":1,\"cname\":\"中国大陆\",\"country_id\":\"86\"},{\"id\":5,\"cname\":\"中国香港特别行政区\",\"country_id\":\"852\"},{\"id\":2,\"cname\":\"中国澳门特别行政区\",\"country_id\":\"853\"},{\"id\":3,\"cname\":\"中国台湾\",\"country_id\":\"886\"},{\"id\":4,\"cname\":\"美国\",\"country_id\":\"1\"},{\"id\":6,\"cname\":\"比利时\",\"country_id\":\"32\"},{\"id\":7,\"cname\":\"澳大利亚\",\"country_id\":\"61\"},{\"id\":8,\"cname\":\"法国\",\"country_id\":\"33\"},{\"id\":9,\"cname\":\"加拿大\",\"country_id\":\"1\"},{\"id\":10,\"cname\":\"日本\",\"country_id\":\"81\"},{\"id\":11,\"cname\":\"新加坡\",\"country_id\":\"65\"},{\"id\":12,\"cname\":\"韩国\",\"country_id\":\"82\"},{\"id\":13,\"cname\":\"马来西亚\",\"country_id\":\"60\"},{\"id\":14,\"cname\":\"英国\",\"country_id\":\"44\"},{\"id\":15,\"cname\":\"意大利\",\"country_id\":\"39\"},{\"id\":16,\"cname\":\"德国\",\"country_id\":\"49\"},{\"id\":18,\"cname\":\"俄罗斯\",\"country_id\":\"7\"},{\"id\":19,\"cname\":\"新西兰\",\"country_id\":\"64\"}]}",
            "requestId": "039db1d3d1b84ca09fc48f05c4cd9b2d",
            "timestamp": "1722559196225"
        })
    })

    fastify.post("/api/client/activate", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "requestId": "29e854f93a6045cfa00f430135abf278",
            "server_message": "",
            "timestamp": "1723082217198"
        })
    })

    fastify.post("/api/client/get.key", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "access_key": "d49b1be45a9017581c32685bf5878081", 
            "auth_name": "冯**", 
            "code": 0,
            "expires": 2138654620000,
            "face": "https://i0.hdslb.com/bfs/face/member/noface.jpg", 
            "game_open_id": null, 
            "game_open_id_enable": false,
            "h5_paid_download": 1, 
            "h5_paid_download_sign": "e28fc74137cea4d2cc9c73f407e86a15",
            "nonce": "92928930",
            "realname_verified": 1,
            "remind_status": 0,
            "requestId": "2f2019dc63ae42479fc3404450345327",
            "s_face": "https://i0.hdslb.com/bfs/face/member/noface.jpg", 
            "server_message": "Hello Starpoint!",
            "timestamp": "1723102868931", 
            "uid": 3546721778928183, 
            "uname": "bili_45535670438"
        })
    })

    fastify.post("/api/client/notice.list", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "has_notice": 0,
            "open_login": 102,
            "requestId": "0e2acd88da9a451db3fd288162feb730",
            "server_message": "",
            "timestamp": "1723082218089"
        })
    })

    // static.biligame.net
    fastify.get("/gamesdk/sdkHotConfig_v2.json", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "apm_config": {
                "anr_enable": 1,
                "cpu_enable": 0,
                "crash_enable": 1,
                "disk_enable": 0,
                "enable": 1,
                "env_enable": 0,
                "env_interval": 60,
                "env_percent": 100,
                "evil_msg_enable": 0,
                "mem_enable": 0,
                "net_enable": 1,
                "net_fail_enable": 1,
                "net_state_enable": 0,
                "net_success_aggregation": 10,
                "net_success_enable": 1,
                "trace_enable": 0
            },
            "apm_config_ios": {
                "anr_enable": 1,
                "cpu_enable": 0,
                "crash_enable": 1,
                "disk_enable": 0,
                "enable": 1,
                "env_enable": 0,
                "env_interval": 60,
                "env_percent": 100,
                "evil_msg_enable": 0,
                "mem_enable": 0,
                "net_enable": 1,
                "net_fail_enable": 1,
                "net_state_enable": 0,
                "net_success_aggregation": 10,
                "net_success_enable": 1,
                "trace_enable": 0,
                "view_tracking_enable": 0
            },
            "baseCmptConfigNew": {
                "fingerprint": "0",
                "heartbeats": "1",
                "trackData": {
                    "androidPercent": 100,
                    "iosPersent": 100,
                    "logState": "1",
                    "strategy": [
                        {
                            "type": "0,24,0,0,0,0,0",
                            "value": "0,3,0,4.4.1,0,0,0"
                        }
                    ]
                }
            },
            "channelConfig": {
                "coverCache": {
                    "2": [
                        "1.0.0",
                        "1.0.1",
                        "1.6.3"
                    ]
                },
                "readCache": true,
                "version": "1.5.4"
            },
            "disable_exit_gameid_android": [
                "2610",
                "1623",
                "2542",
                "56",
                "887",
                "777",
                "780",
                "2270"
            ],
            "disable_exit_gameid_ios": [
                "125",
                "57"
            ],
            "dynamic": {
                "androidPercent": 100,
                "dynamicState": "0",
                "strategy": [
                    {
                        "type": "0,0,0,0,0,0,0",
                        "value": "0,0,0,0,0,0,0"
                    }
                ]
            },
            "error_code": {
                "-1": "AppKey不存在或者已封禁",
                "-101": "未登录",
                "-102": "帐号已封禁,若有疑问请联系客服",
                "-103": "积分不足",
                "-104": "硬币不足",
                "-105": "与验证码不匹配",
                "-14": "游戏预下线，已关闭充值",
                "-15": "游客充值关闭",
                "-2": "无效的登录Token(登录已过期)",
                "-201": "抽奖还未开始",
                "-202": "抽奖已结束",
                "-203": "网站功能",
                "-3": "无效的API签名(程序错误)",
                "-400": "请求错误(参数不合法,请求方式不正确)",
                "-403": "拒绝访问(未登录,或用户权限不足)",
                "-404": "请求的内容不存在",
                "-444": "服务端维护中",
                "-5": "订单参数异常",
                "-500": "服务器内部错误",
                "-501": "服务器系统错误",
                "-502": "服务器API错误",
                "-503": "服务器调用太快",
                "-621": "邮箱格式不合法",
                "-624": "激活次数超过限制",
                "-628": "被泄露过的密码",
                "-662": "登录的RSA过期",
                "-707": "注册过频繁",
                "-900": "游客注册关闭",
                "500001": "游戏处于封测，账号未激活",
                "500002": "账号或密码错误",
                "500003": "用户名不存在",
                "500004": "密码错误次数过多",
                "500005": "用户名过长",
                "500006": "密码过短",
                "500007": "用户名不合法",
                "500008": "用户名已存在",
                "500009": "邮箱已注册",
                "500010": "无效的激活码",
                "500011": "激活码已被使用",
                "500012": "该游戏不需要激活",
                "500013": "激活失败，激活码可能已被使用",
                "500014": "无效的激活码(非此游戏)",
                "500015": "电话号码不合法",
                "500016": "电话已存在",
                "500017": "验证号发送失败",
                "500018": "添加订单失败",
                "500019": "用户名不存在",
                "500020": "昵称或者密码过短",
                "500021": "昵称过长",
                "500022": "昵称已存在",
                "500023": "重置密码与原密码相同",
                "500024": "密码不安全，请立即修改密码",
                "500025": "今日验证码发送次数已达上限",
                "600000": "服务器请求配置错误",
                "60005": "熔断",
                "60006": "限流",
                "900000": "服务器连接失败",
                "900001": "主站未知错误"
            },
            "game": {
                "compatibleOldTid": 1,
                "enableSaveFailTid": 1,
                "guessOrderTypes": [
                    0,
                    5
                ],
                "jbCheckMethods": [
                    1,
                    2,
                    3
                ]
            },
            "https_error_intercept_switch": {
                "login_extreme_test": false,
                "three_no_account": false
            },
            "relative_apps": [
                "tv.danmaku.bili",
                "com.bilibili.qing",
                "com.bilibili.comic"
            ],
            "rnSwitch": {
                "ResetPwd": 0,
                "android": {
                    "ResetPwd": 0,
                    "preload": 0
                },
                "androidRnOpen": 0,
                "ios": {
                    "PhoneLogin": 0,
                    "ResetPwd": 0,
                    "preload": 0
                },
                "iosRnOpen": 0,
                "preload": 0
            },
            "sdk_gray": {
                "android_gray": {
                    "black_list": {
                        "brand": [],
                        "game_id": [],
                        "model": [],
                        "pf_ver": [],
                        "sdk_ver": [],
                        "udid": []
                    },
                    "games_switch": [],
                    "gray_games_switch": [],
                    "main_new_switch": 1,
                    "main_switch": 1,
                    "sdk_new_switch": 1,
                    "sdk_switch": 1,
                    "udids": [],
                    "white_list": []
                },
                "iOS_gray": {
                    "black_list": {
                        "game_id": [],
                        "model": [],
                        "pf_ver": [],
                        "sdk_ver": [],
                        "udid": []
                    },
                    "games_switch": [],
                    "gray_games_switch": [],
                    "main_new_switch": 1,
                    "main_switch": 1,
                    "sdk_new_switch": 1,
                    "sdk_switch": 1,
                    "udids": [],
                    "white_list": [
                        "493B65BE-CC3F-4410-AFF7-CF8126A3ACBD"
                    ]
                }
            },
            "sdk_switch": {
                "android_connect_timeout": 4000,
                "android_head_connect_timeout": 1500,
                "android_head_so_timeout": 2000,
                "android_limit_request": [],
                "android_so_timeout": 4000,
                "bgc_plugin": 1,
                "cobbler": 1,
                "cobblerPriority": 1,
                "config_activate_interval_time": 300000,
                "config_init_switch_times": 2,
                "config_init_timeout": 3000,
                "config_login_switch_times": 0,
                "config_login_timeout": 3000,
                "enable_init_route_config": 1,
                "enable_login_route_config": 1,
                "fingerprint_switch": 1,
                "guest_update_realname_verified": 1,
                "ios_connect_timeout": 6000,
                "ios_head_connect_timeout": 1500,
                "ios_limit_request": [],
                "ios_pay_can_skip_request_product": 1,
                "ios_receipt_connect_timeout": 10000,
                "ios_switch_idfa": 1,
                "limit_request": [],
                "login_switch_cache_count": -1,
                "login_switch_nocache_count": -1,
                "oaid_switch": 1,
                "oaid_switch_new": 1,
                "useNewSSOLogin": 1,
                "userinfo_switch_count": 1,
                "web_interceptor_android": 1,
                "web_interceptor_ios": 1
            }
        })
    })

    // line1-log.biligame.net
    fastify.post("/collector/admin/config", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "code": 0,
            "data": {
                "batchCount": "0",
                "cacheThreshold": "1",
                "interval": "0",
                "localFactor": "0",
                "localMaxCount": "0",
                "logEnable": "false",
                "logLevel": "1",
                "logStale": "-1",
                "maxinterval": "0",
                "wifiOnly": "false"
            },
            "message": "ok",
            "requestId": "6ae49e7c-f358-45a6-9630-86217f47918c",
            "timestamp": getServerTime(),
            "traceId": "e4f582a4-7a15-4cd1-9b5d-9686c8a97b72"
        })
    })

    // line1-sdkcenter-login
    fastify.post("/api/external/otp/send/v3", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "captcha_key": "07996852f7cfab91b1309918f52e5c11",
            "code": 0,
            "requestId": "5f409b39e71642bbb07352ce66aaefd2",
            "server_message": "",
            "timestamp": getServerTime() * 1000,
            "verify_tkt": null,
            "verify_tkt_type": null
        })
    })

    fastify.post("/api/external/login/otp/v3", (request: FastifyRequest, reply: FastifyReply) => {
        const nonceHeader = request.headers['x-nonce'] ?? ''

        reply.header("x-sign", "ST6bNXZo0cF2/azqlc5EBJ0MfvzYyLv0dUA4XDDvTQ03zy4xtbhMOd/oUgYQ8UuB")
        reply.status(200).send({
            "access_key": "c5ad2ac6aa90c84a49091619502bc4a5_t1",
            "auth_name": "",
            "code": 0,
            "expires": 1725832398000,
            "face": "http://static.hdslb.com/images/member/noface.gif",
            "game_open_id": null,
            "game_open_id_enable": false,
            "h5_paid_download": 1,
            "h5_paid_download_sign": "198167727e381e30aef5aecd1d66e527",
            "nonce": nonceHeader,
            "realname_verified": 0,
            "remind_status": 0,
            "requestId": "8546f9b5e97b49eb83e3a858b8949479",
            "s_face": null,
            "server_message": "",
            "timestamp": "1723240397977",
            "uid": 3546740797999545,
            "uname": "bili_43264016969"
        })
    })

}

export default routes;