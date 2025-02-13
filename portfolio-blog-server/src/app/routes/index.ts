import { Router } from "express";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { OrderRoutes } from "../modules/order/order.route";
import { MsgRoutes } from "../modules/messages/msg.route";

const router=Router();
const moduleRoutes=[
    {
        path:'/blogs',
        route:BlogRoutes,
    },
    {
        path:'/msg',
        route:MsgRoutes,
    },
    {
        path:'/order',
        route:OrderRoutes,
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;