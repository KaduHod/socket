import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AppRedisClient, RedisService } from "../services/redis.service";

const socketHandler = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, redisService:AppRedisClient ) => {
    const message = (msg:any) => {
        console.log({msg})
    }

    const connect = () => {
        console.log(`[ Cliente se conectou ]`)
    }

    const disconnect = () => {
        console.log(`[ Cliente se desconectou ]`)
    }

    const register = async (args:any, client:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
        try {
            const {userName} = args[0] 
            const {id} = client
            const exist = await redisService.get(userName)
            if(!exist) {
                await redisService.set(userName, JSON.stringify({id}))
            }
            io.emit("register-response", `registered-${userName}`)
            console.log("aqui")
        } catch (error) {
            console.log(error)
        }
    }

    io.on("connection", (client, ...rest) => {
        connect()
        client.on("message", message)
        client.on("disconnect", disconnect)
        client.on("register", (...args) => register(args, client)) 
    })
}


export default socketHandler;