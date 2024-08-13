// loginwf.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";
import { getServerTime } from "../../utils";

const routes = async (fastify: FastifyInstance) => {

    fastify.post("/sdk/v3-3/code_login.do", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "status": 0,
            "data": {
                "showProtocol": "0",
                "username": "StarpointUser",
                "userpwd": "hello",
                "sid": '1',
                "bind": "1",
                "cookie": "1",
                "phoneBind": "1",
                "emailBind": "1",
                "questionBind": "1",
                "pwd": "hello",
                "imei": "hello",
                "serial": "",
                "phoneNum": "11111111111",
                "phoneModel": "hello",
                "phoneActiveKey": "1",
                "token": "hello",
                "needActivate": "0",
                "adult": "1",
                "age": 20,
                "realNameAuth": "1",
                "lang": "cn",
                "timestamp": getServerTime(),
                "status": "0",
                "mmid": "hello",
                "isFast": "0",
                "privacyEndDate": "2099-12-31",
                "registTime": getServerTime(),
                "guestUpgrade": "0",
                "noticeId": ""
            }
            
        })
    })

}

export default routes;