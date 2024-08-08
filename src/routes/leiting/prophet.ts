// prophet.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.get("/upload/sdk_config.json", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "catch_.me_.if_.you_.can_": "GGxiugaiqi",
            "com.GG.Pro": "slcbfz",
            "com.Optimus.Prime": "qtfuzhu",
            "com.a": "liuxingmiaojs",
            "com.aotumanwendao": "aotumanwendao",
            "com.apk.azwdjl": "wdjl",
            "com.cjml": "20210423v2",
            "com.com.leige": "FZLG",
            "com.com.ll.qh": "lzfz2021",
            "com.com.tencent.mobileqq": "fzzl12",
            "com.dgsdsfcs.hello": "FZHT",
            "com.dianping.v1": "zzxfz",
            "com.eec6e1e69aeee6f7": "qipa_base2",
            "com.gbits.atm.leiting": "ast",
            "com.gbits.atm.leiting1": "hmroot202306",
            "com.gbits.atm.leiting2": "hmnoroot202306",
            "com.gh.gamecenter": "guanghuaizhushou",
            "com.gh.universalaccelerator": "wannengjiasuqi",
            "com.heima": "hm0630v1",
            "com.iplay.assistant": "GGdawanjia",
            "com.kpqigai": "FZMM",
            "com.lrab": "lanrenaobi",
            "com.mcmljojkjgjpjijjjljjjj.lelewdao": "20210502v1",
            "com.netease.mhxyhtb": "FZNG",
            "com.nhmpmemnnamomhmejhjijj.nbwd": "2021yj",
            "com.ogqfppxclbjmagzbuh": "slcbzb2",
            "com.redfinger.app": "hognshouzhi",
            "com.rovio.angrybirds": "FZFN",
            "com.tencent.android.qqdownloader": "hm1210v1",
            "com.tencent.mm": "weixin",
            "com.tencent.mobileqq": "FZQQ",
            "com.tencent.qqpimsecure": "20210423v1",
            "com.tencent.wifimanager": "com.tencent.wifimanager",
            "com.touchsprite.android": "chudongjingling",
            "com.variable.apkhook": "HOOKLYH",
            "com.wandoujia.phoenix2": "FZDJ",
            "com.wendao": "com.wendao",
            "com.xyn.wskai": "qipa_qunxing",
            "com.zdnewproject": "xingguangzhushou"
        })
    })

}

export default routes;