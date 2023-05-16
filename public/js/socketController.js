import { tryCatch } from "./decorators.js";
const input = document.getElementById("register-input");
import { users, newMessageInput, chatBox } from "./main.js";
import { toogleListBisibility, styleDisconnected } from "./style.js";

export const ClientSocketController = class {
    constructor(socket) {
        this.socket = socket
        this.users = null;
    }

    connect = () => {
        this.socket.connect();
    }

    disconnect = () => {
        this.socket.disconnect();
    }

    getMyInfo = () => {
        this.socket.emit("get-my-info", {})
    }

    onMessage = (...args) => {
        console.log("On message", ...args)
    }

    onRegisterResponse = (args) => {
        this.logged = !!args.userName;
        if(!this.logged) {
            styleDisconnected();
            toogleListBisibility(true)
        }
    }

    emitRegister = (event) => {
        if(!input.value) return;
        if(users.find( v => v === input.value)) {
            alert("Username not available!")
        }
        this.socket.emit('register', {userName: input.value})
        toogleListBisibility(false)
    }

    getUsersConnected = () => {
        this.socket.emit("get-users-connected", {})
    }

    sendNewMessage = (message) => {
        this.socket.emit("new-message-chat", {message})
        console.log({message})
    }

    updateChatMessages = (chatMessages) => {
        chatBox.innerHTML = "";
        chatMessages.forEach((item, index) => {
            const li = document.createElement("li");
            li.id = `item-${index}`;
            li.innerText = item.message
            chatBox.appendChild(li)
        })
    }   
}

ClientSocketController.prototype.connect = tryCatch(ClientSocketController.prototype.connect)
ClientSocketController.prototype.emitRegister = tryCatch(ClientSocketController.prototype.emitRegister)
ClientSocketController.prototype.onMessage = tryCatch(ClientSocketController.prototype.onMessage)
ClientSocketController.prototype.onRegisterResponse = tryCatch(ClientSocketController.prototype.onRegisterResponse)
ClientSocketController.prototype.getUsersConnected = tryCatch(ClientSocketController.prototype.getUsersConnected)

export const SocketFactory = socket => {
    return new ClientSocketController(socket)
}




