import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.get("/v2/appGroup", (_, reply: FastifyReply) => {
        // Although this route has a sig header in the captured network traffic, the client doesn't verify it.
        reply.header("sig", "0;F8rysQxii/VL6Rca6Gnw/lq1AXA0N1RfAkKHosaiYWM=")
        reply.status(200).send({
            "status": 200,
            "desc": "OK",
            "content": {
                "timestamp": 1719346274118,
                "apps": [
                    {
                        "notices": [],
                        "appId": "535877",
                        "dataMap": {
                            "countryCodes": "kr",
                            "countryCodeList": "kr",
                            "displayName": "월드 플리퍼",
                            "forceServerSelectDeviceList": "iPad6,4 iPad7,2 iPad7,4 iPad13,6",
                            "bannedCountryCodeList": "-",
                            "isServiceAvailable": "true"
                        }
                    },
                    {
                        "notices": [],
                        "appId": "561429",
                        "dataMap": {
                            "countryCodes": "us",
                            "countryCodeList": "ag,ai,an,ar,aw,bb,bl,bm,bo,bq,br,bs,bz,ca,cl,co,cr,cu,cw,dm,do,ec,fk,gd,gf,gp,gs,gt,gy,hn,ht,jm,kn,ky,lc,mf,mq,ms,mx,ni,pa,pe,pm,pr,py,sr,sv,sx,tc,tt,um,us,uy,vc,ve,vg,vi",
                            "displayName": "World Flipper (NA)",
                            "forceServerSelectDeviceList": "iPad6,4 iPad7,2 iPad7,4 iPad13,6",
                            "bannedCountryCodeList": "-",
                            "isServiceAvailable": "true"
                        }
                    },
                    {
                        "notices": [],
                        "appId": "561430",
                        "dataMap": {
                            "countryCodes": "de",
                            "countryCodeList": "ad,ae,al,am,ao,at,ax,az,ba,be,bf,bg,bh,bi,bj,bv,bw,by,cd,cf,cg,ch,ci,cm,cv,cy,cz,de,dj,dk,dz,ee,eg,eh,er,es,et,fi,fo,fr,ga,gb,ge,gg,gh,gi,gl,gm,gn,gq,gr,gw,hr,hu,ie,il,im,iq,ir,is,it,je,jo,ke,km,kw,lb,li,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mk,ml,mr,mt,mu,mw,mz,na,ne,ng,nl,no,om,pl,ps,pt,qa,re,ro,rs,ru,rw,sa,sc,sd,se,sh,si,sj,sk,sl,sm,sn,so,ss,st,sy,sz,td,tf,tg,tn,tr,tz,ua,ug,uz,va,ye,yt,za,zm,zw",
                            "displayName": "World Flipper (EU)",
                            "forceServerSelectDeviceList": "iPad6,4 iPad7,2 iPad7,4 iPad13,6",
                            "bannedCountryCodeList": "-",
                            "isServiceAvailable": "true"
                        }
                    },
                    {
                        "notices": [],
                        "appId": "561432",
                        "dataMap": {
                            "countryCodes": "th",
                            "countryCodeList": "af,as,au,bd,bn,bt,cc,ck,cx,fj,fm,gu,hm,id,in,io,kg,kh,ki,kz,la,lk,mh,mm,mn,mp,mv,my,nc,nf,np,nr,nu,nz,pf,pg,ph,pk,pn,pw,sb,sg,th,tj,tk,tl,tm,to,tv,vn,vu,wf,ws",
                            "displayName": "World Flipper (SEA)",
                            "forceServerSelectDeviceList": "iPad6,4 iPad7,2 iPad7,4 iPad13,6",
                            "bannedCountryCodeList": "-",
                            "isServiceAvailable": "true"
                        }
                    }
                ]
            }
        })
    })

    fastify.get("/v2/app", (_, reply: FastifyReply) => {
        // The client does some hmacsha256 hash checking with this sig header
        // Since I haven't been able find the HMAC key, we have to resend previously captured data.
        reply.header("sig", "0;vAbSSdX5LPWU1RzParxOFtK53kTej/zvostVM6USl0w=")
        reply.status(200).send({"status":200,"desc":"OK","content":{"supportedFeatures":["urgentNotice","maintenance","push","delivery","promotion","coupon","notice"],"marketUrl":"market://details?id=com.kakaogames.wdfp","publicKeyMap":{},"secondaryPwOption":null,"capriAppOption":{"ageLimit":0,"lazyAgeAuth":null,"appType":"LEGACY_PARTNER","appCategory":"Games","ageAuthLevel":"NONE"},"isTubeApp":false,"verRecent":"0.0.81","appOption":{"urlCommunity":"https://twitter.com/Worldflipper_kg","urlOtherMenuOfficialCafe":"https://twitter.com/Worldflipper_kg","urlTitleMenuContact":"oqupie","cdnAddr":"http://patch.wdfp.kakaogames.com/Live/2.0.0","agreementUrl":"https://web-data-game.kakaocdn.net/real/www/html/agreement/index.html?tid=13","useCoupon":"true","useGoogleGame":"FALSE","urlPrivacyPolicy":"https://web-data-cdn.kakaogames.com/real/www/html/terms/index.html?service=S0001&type=T003","urlFriendFollowServer":"https://na.wdfp.kakaogames.com","useHttpHeartbeat":"true","isReproduceS3UploadOpen":"false","urlTermsAndConditions":"https://web-data-game.kakaocdn.net/real/www/html/terms/index.html?service=S0001&type=T001&country=us&lang=en","urlHomeNews":"https://worldflipper.playkakaogames.com/news","gameServerAddr":"https://na.wdfp.kakaogames.com","modTime":1617070960617,"urlTitleMenuNews":"https://worldflipper.playkakaogames.com/news","refreshInfodeskIntervalMin":"5","urlOtherMenuContact":"oqupie","urlNotice":"https://worldflipper.playkakaogames.com/news","urlReviewContact":"https://kakaogames.oqupie.com/portals/2060"},"notices":[],"traceSampleRate":0,"isWhitelist":false,"svcStatus":"open","supportedIdpCodes":["facebook","google","siwa","zd3"],"serverConnectionType":"https","appVerStatus":"noNeedToUpdate","publisher":{"privacyUrl":"https://www.kakao.com/ko/privacy","privacySummaryUrl":"https://gameevent.kakao.com/supports/terms/3?tabbar=false","noticeUrl2":"https://cus-zinny3.kakaogames.com/view/notice","agreementUrl":"https://web-data-game.kakaocdn.net/real/www/html/agreement/index.html?tid=13","servicePolicyUrl":"https://gameevent.kakao.com/terms/operation","termsUrl":"https://gameevent.kakao.com/supports/terms/1","kakaogameCommunityUrl":"https://playgame.kakao.com/bridge/auth/zinny","termsSummaryUrl":"https://gameevent.kakao.com/supports/terms/1?tabbar=false","eventWallUrl":"https://cus-zinny3.kakaogames.com/view/event","noticeUrl":"https://cus-zinny3.kakaogames.com/notice","customerServiceUrl":"https://cus-zinny3.kakaogames.com/support/list","eventWinnerUrl":"http://event-winner.kakaogames.com/event","policyVer":"1.0","publisherId":"kakao","modTime":1651813742832},"sdk":{"heartbeatInterval":120000,"PercentOfSendingAPICallLog":0,"stopSendGeoDNS":"y","snsShareUrl":"https://invite.kakaogame.com","zrtiOSError":"{\"kakaocapri\":[500, 502, 503, -1, -7, -9]}","aesEncryptKey":"djfdskj12328438djdgjcjeejhdew15","aesEncryptIV":"7gnfn7f96rnanmt1s5iaa3kdruhuneu","cafeLoginUrl":"https://accounts.kakao.com/weblogin/sso_login?token={tgt_token}&token_type=tgt&continue={url}","zrtAOSError":"{\"kakaocapri\":[500, 502, 503, -1, -7, -9],\"google\":[8]}","zrtWindowsError":"{\"kakaocapri\":[500, 502, 503, -1, -7, -9]}","snsShareHostUrl":"https://invite.kakaogame.com/host/main","invitationUrl":"https://webinvite.nzincorp.com","csUrl":"http://customer.kakaogames.com:18080","platformVersion":3,"sessionTimeout":10000,"registerDeviceUrl":"https://device-enrollment.kakaogames.com/main","customDialogModels":["SM-T976N"],"unregisterAgreementUrl":"https://web-data-cdn.kakaogames.com/real/www/html/terms/index.html?service=S0001&type=T016","snsShareGuestUrl":"https://invite.kakaogame.com/guest/reward"},"deviceSecurityOption":null,"onlineNotifications":[],"timestamp":1719346275028}})
    })

}



export default routes;