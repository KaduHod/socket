import { tryCatch } from "/js/decorators.js";
import { SocketFactory } from "./socketController.js";
import { buttons } from './main.js'
import { styleDisconnected, toogleListBisibility, updateListOfusers } from './style.js'
import { users } from './main.js'

let socketEventsHandler = async (socket) => {
    const socketController = SocketFactory(socket)
    let logged = true
    socketController.emitRegister();
    socket.on("message", socketController.onMessage)
    socket.on("register-response", socketController.onRegisterResponse)
    socket.on("disconnect", (reason) => console.log("Disconected", {reason}))
    socket.on("get-users-connected-response", (...args) => console.log(...args))
    socket.on("get-my-info", (...args) => console.log(...args))
    socket.on("get-my-info-response", (...args) => console.log(...args))
    socket.on("notify-login", (args) => {
        users.push(args.userName)
        console.log(`User ${args.userName} loged in!`)
    })
    socket.on("notify-logout", (args) => {
        users = users.filter(userName => userName !== args.userName);
        console.log(console.log(`User ${args.userName} loged out!`))
    })
    socket.on("notify", (...args) => console.log(...args))
    socket.on("update-users-list", ({users}) => updateListOfusers(users))
    buttons.myInfoButton.addEventListener('click', socketController.getMyInfo)
    buttons.getUsersConnectedButton.addEventListener('click', socketController.getUsersConnected)
    buttons.disconnectButton.addEventListener('click', () => {
        styleDisconnected();
        toogleListBisibility(true)
        socketController.disconnect();
    })
}

socketEventsHandler = tryCatch(socketEventsHandler)
export { socketEventsHandler } 
