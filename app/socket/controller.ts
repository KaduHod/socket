import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";



const socketHandler = (socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const message = (msg:any) => {
        socket.emit("message", msg)
    }

    const connect = (...args:any[]) => {
        console.log(`[ Cliente se conectou ]`, {args})
    }

    const disconnect = (...args:any[]) => {
        console.log(`[ Cliente se desconectou ]`, {args})
    }

    socket.on("connection", (socket, ...rest) => {
        connect(...rest)
        socket.on("message", message)
        socket.on("disconnect", disconnect)
    })
}


export default socketHandler;