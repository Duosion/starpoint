// loginwf.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";
import { getServerTime } from "../../utils";

const routes = async (fastify: FastifyInstance) => {

  fastify.post("/sdk/v3-3/code_login.do", (_, reply: FastifyReply) => {
    reply.status(200).send({
      "status": "0",
      "message": "",
      "data": {
        "token": "user_authentication_token",
        "userId": "1234567890",
        "username": "testuser",
        "bind": "1,2",
        "isFast": "0",
        "adult": "1",
        "age": 25,
        "timestamp": "1678888888",
        "registTime": "1678888888",
        "isSetPwd": 1,
        "code": null,
        "mmid": "test_mmid",
        "showProtocol": "1"
      }
    })
  })

  fastify.post("/sdk/v3-3/pwd_login.do", (_, reply: FastifyReply) => {
    const timestamp = getServerTime()
    reply.status(200).send({
      "status": "success",
      "message": {"sid":"user_session_id","token":"auth_token","timestamp":"1678888888","auth":"0","age":25,"showProtocol":"1"}
    })
  })

}

export default routes;