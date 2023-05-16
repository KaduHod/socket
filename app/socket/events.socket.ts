import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketController } from "./socketController";

export const SocketHandler = (
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, 
    sockerController:SocketController
) => {    
    io.on("connection", (client) => {
        sockerController.connect(client);
        client.on("message", () => sockerController.message(client))
        client.on("disconnect", () => sockerController.disconnect(client))
        client.on("register", (...args) => sockerController.register(args, client)) 
        client.on("get-users-connected", () => sockerController.getUsersConnected(client)) 
        client.on("get-my-info", () => sockerController.getMyInfo(client)) 
        client.on("new-message-chat", ({message}) => {
            sockerController.newChatMessage(client, message)
        }) 
    })
}