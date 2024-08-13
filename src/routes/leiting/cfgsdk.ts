// cfgsdk.leiting.com

import { FastifyInstance, FastifyReply } from "fastify";

const routes = async (fastify: FastifyInstance) => {

    fastify.get("/wf/110001_config_20200619.json", (_, reply: FastifyReply) => {
        reply.status(200).send({
            "SdkConfig": "662a14bd16bef3c6d5ab3e907fafed5c12b0a3a3f5cf941d106d077941fd4fe70e59a4299782e0845c743f0107001d1720aa1a1048adc7850307967704d6bda27337b43809da65b90e59a4299782e0845abfe9ffde4ea2aacaa74591f9caacb6ad46e44adc2987eca0a36797787e06fe41df3e595ef3055c0ef69a9653f606a9cd6be86200a76a71181353d9676600e98d325c9f2606922da107335d3c76b34bf4c5e515d70412aed5ab3e907fafed5c4188664f5b3143b293bbb8dd45af2d19a17161018c347432eb7448beeac0dffb8e43824d3348fab67d7b8434bf5cc800290a5d3fc9fa3e1a1e06282cb6a360ab388118f1ee4c306332512246b5e2f49ea3d87c7824c5f46f9d5f48a841c2b136e2e8c1b221c9bccc76c834d8f8ecf53982da2e83169de83f01ca9c71c64d5d3d6e5972219cbeb27b8cc20b5062bb6a0c74cd293f62781c5d6ef5db3d43371cde1726b820ea8d918f5a6e985d3fb369175cf296a70158199152467b6c9b03f1611d4dfd2316aaaf3616fb77cd41613d038f72d9426c453374635a843e84d4268d1e06282cb6a360aba737635416adaa09eb9ccd49f0bb80a3b0932138aebaae5d566eca76d758284cbd7e64a31f39853e30ca206254ec97deefba74bd90f24b459d6b53bc6f3b1bedb0d99e73676bf30825d767d91712ff862c93fe29340da5542777afba7c528abef946ae220de354392414f810136bf9877872cb9ac4467a99b3c969da2b8dc13b327f25f3986f7b8dace3ef9cdab6a501fdb7aa5b46b537fde52d9ea9bdf10672f853fae9f644c961c5d2f85374f3611c147bba605a324202b4a9ae8a1d5f65dda296c7aa7e3d445b8573b93db19fcde33e0da90d36704d7bee52fac7d0b756541e06282cb6a360abb2b73ceef826a7b69fa4ab2cb5de1f4483f28842002e0129120854ff2317d17a2381e90f5b296019c79b0bd3535a97341c3dd01762eb9ec16eae85da1528a1f654e2749a44c225acfcd42910d3d0a58cf96f629a69263d4c647cc94d2967b9004fc8fec7763b331343304ea70d9bcd60706dee3183242e20b6661f981dc80c60a4e7a75781e7bbcd85bb560fc3a7aa5c29ee93f7a15ae36c4707762d4ceadaf0a0a9cb98dbd2058396cca10dbc9e219ab642d09f7110e5ca878ca6486e3a64a5a8565039a5a7c59c1bef9c03ce14dc053bb9ef18ce7557b9cad9040184a70e47213bb1c552e29b80acd03aeb600228620d4f14d4309f0137",
            "token": "b79c23a0d8a282931f5b1fe2801fbb17"
        })
    })

}

export default routes;