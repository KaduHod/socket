import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { LogArgs, TryCatch, tryCatch } from "../../utils/decorators";
import { AppRedisClient } from "../services/redis.service";
import { User, UserServiceT } from "./users";

export type socketClient = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export class SocketController {
    constructor(
        private io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
        private redisService:AppRedisClient,
        private userService: UserServiceT
    ){}

    @TryCatch
    public message(msg:any){
        console.log({msg})
    }

    @TryCatch
    public connect(client:socketClient){
        console.log(`[ Cliente ${client.id} se conectou ]`)
    }

    @TryCatch
    public disconnect(client:socketClient){
        console.log(`[ Cliente ${client.id} se desconectou ]`)
        this.userService.remove(client.id)
        client.disconnect()
    }

    @TryCatch
    public async register([args]:any, client:socketClient){
        let user:User = {
            userName: args.userName,
            socket: client ,
            address: client.handshake.address
        }
        this.userService.register(user, client.id)
        
        client.emit("register-response", {address: user.address, nickname: user.userName})
    }

    @TryCatch
    public getUsersConnected(client:socketClient){
        const users = [...this.userService.users.values()].map(({socket,...rest}) => ({...rest}));
        client.emit("get-users-connected-response", JSON.stringify({users}));
    }

    @TryCatch
    public getMyInfo(client:socketClient){
        const info = this.userService.users.get(client.id);
        if(!info) {
            return client.emit("get-my-info-response", {message: "Not found", statusCode: 400})
        }
        const {userName, address} = info
        client.emit("get-my-info-response", {userName, address});
    }

}