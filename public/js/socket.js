import { tryCatch } from "/js/decorators.js";
import { SocketFactory } from "./socketController.js";
const buttons = {
    registerButton : document.getElementById("register-&-button"),
    getUsersConnectedButton : document.getElementById("show-users-connected-button"),
    disconnectButton : document.getElementById("disconnect-button"),
    myInfoButton: document.getElementById("my-info-button")
}
const filterRegister = (item) => item?.id !== "register-&-button";

const styleConnected = () => {
    Object
    .values(buttons)
    .filter(filterRegister)
    .filter(Boolean)
    .forEach( button => { button.disabled = false }); 

    buttons.registerButton.disabled = true
}

const styleDisconnected = () => {
    Object
    .values(buttons)
    .filter(filterRegister)
    .filter(Boolean)
    .forEach( button => { button.disabled = true });

    buttons.registerButton.disabled = false
}

let socket;
let socketEventsHandler = async (socket) => {
    const socketController = SocketFactory(socket)
    socketController.emitRegister();

    socket.on("message", socketController.onMessage)
    socket.on("register-response", socketController.onRegisterResponse)
    socket.on("disconnect", (reason) => console.log("Disconected", {reason}))
    socket.on("get-users-connected-response", (...args) => console.log(...args))
    socket.on("get-my-info", (...args) => console.log(...args))
    socket.on("get-my-info-response", (...args) => console.log(...args))
    buttons.myInfoButton.addEventListener('click', socketController.getMyInfo)
    buttons.getUsersConnectedButton.addEventListener('click', socketController.getUsersConnected)
    buttons.disconnectButton.addEventListener('click', () => {
        styleDisconnected();
        socketController.disconnect();
    })
}

socketEventsHandler = tryCatch(socketEventsHandler)

buttons
.registerButton
.addEventListener('click', () => {
    socket = io("ws://localhost:3333");
    socket.on("connect", () => socketEventsHandler(socket));
    styleConnected()
})


document
.getElementById('register-input')
.addEventListener('input', ({target}) => {
    buttons.registerButton.disabled = !Boolean(target.value.length)
})
