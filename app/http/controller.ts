import { Router, Request, Response } from "express"
import path from "path";

const Controller = (router: Router): Router => {
    const index = (req:Request, res:Response) => {
        res.sendFile("index.html");
    }

    router.get("/", index)

    return router
}

const router = Router()

export default Controller(router)