import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { TryCatch } from "../../utils/decorators";
import { AppRedisClient } from "../services/redis.service";
import { User, UserServiceT } from "./users";
import { ChatMessage, chatMessages } from "./chat";

export type BroadcastMessage = {
    type: "login" | "logout" | "message",
    info: {[key:string]:any} | string,
    userName?: string
}

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
    public notifyAllUsers(client:socketClient, event: string, message: BroadcastMessage) {
        client.broadcast.emit(event, JSON.stringify(message))
    }

    @TryCatch
    public disconnect(client:socketClient){
        console.log(`[ Cliente ${client.id} se desconectou ]`)
        let user = this.userService.users.get(client.id)
        const message: BroadcastMessage = {
            type: "logout",
            info: `${user?.userName ?? client.id} has left!`
        }
        if(!user) {
            return this.notifyAllUsers(client, 'notify', message)
        }

        this.userService.remove(client.id)
        client.disconnect()
        this.updateUsersListClient()
    }

    @TryCatch
    public register([args]:any, client:socketClient){
        let user:User = {
            userName: args.userName,
            socket: client ,
            address: client.handshake.address
        }
        const alreadyRegisteredUserName = [...this.userService.users.values()].find((u) => u.userName === user.userName)
        if(alreadyRegisteredUserName) {
            return this.io.to(client.id).emit("register-response", {message: "Username already in use", logged: false})
        }
        this.userService.register(user, client.id)
        
        client.emit("register-response", {userName: user.userName})
        this.updateUsersListClient()
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

    @TryCatch
    public updateUsersListClient() {
        const users = [...this.userService.users.values()].map(u => ({userName : u.userName, id: u.socket.id}));
        this.io.emit("update-users-list", {users})
    }

    @TryCatch
    public newChatMessage(client: socketClient, message: string) {
        console.log({message})
        const user = this.userService.users.get(client.id)
        if(!user) {
            return this.io.to(client.id).emit("notify", {message:"Not found user!"});
        }
        const msg:ChatMessage = {
            user: {
                userName: user.userName,
                address: user.address
            },
            message,
            socketId: client.id
        }
        chatMessages.push(msg)
        this.io.emit("update-messages-list", {chatMessages})
    }

}