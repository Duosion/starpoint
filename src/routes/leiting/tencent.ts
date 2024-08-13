// nsv.tencentcloudapi.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("//tendinsv/accountInit/v3", (_, reply: FastifyReply) => {
        reply.status(200).send(`{
        "data": {
            "accOff": "0",
            "accountFlag": "0",
            "accountStatus": "0",
            "appId": "1sSyA4qd",
            "appMd5": "B5:D4:C6:86:B5:7C:53:C1:85:0E:A5:23:0F:A0:35:13",
            "appName": "世界弹射物语_android",
            "appPlatform": "2",
            "authPageFlag": "1",
            "backrp": "1",
            "cmccAppid": "300012393046",
            "cmccAppkey": "3F348120435053363275EC5BE4230457",
            "cmccChannelId": "CMCCZGYD",
            "cmccPreFlag": "3600",
            "cmccSecret": "7F7D89F232484E03B915F76955DDA119",
            "cmccfn": "1",
            "ctccAppid": "9390177208",
            "ctccAppkey": "9J03f50OUpE3m65RJqTLyHkQ08c3tf7T",
            "ctccChannelId": "CTCCPAKLWL",
            "ctccPreFlag": "3590",
            "cuccAppid": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwX9n0ZOBzZbZvU16fjnObeH0oZ8tjpN07JQtxsUF6RHIRMCWr1ii+GOajJkDfTq8eQ6Skgaa4b6ShMU+8XbmD1rII6AFjTbtV46XJnujjxmX7AKq4SQWKuM5rUejxcEmMtUxnOo8AmkZ4I5bekYP9Ul4wkCAggyIBzH0kmErGDQIDAQAB",
            "cuccAppkey": "6dc7ce0a7d60a1680877647720579116",
            "cuccChannelId": "CUCCJALWKE",
            "cuccPreFlag": "1700",
            "initFlag": "86400",
            "ispStatus": "0000",
            "packageName": "com.leiting.wf",
            "packageSign": "B5D4C686B57C53C1850EA5230FA03513",
            "preFailFlag": "0",
            "pstyle": "0",
            "reportCount": "1000",
            "reportFlag": "600",
            "reportMax": "10000",
            "rptDly": "120",
            "ssl": "1",
            "sto": "4,4,4",
            "woChannelId": "XIAOWOOZANEJ",
            "woClientId": "1",
            "woClientSecret": "1"
        },
        "retCode": "0",
        "retMsg": "Hello world!",
        "retSuccessCode": "0"
    }`)
    })

}

export default routes;