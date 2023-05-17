import { tryCatch } from "./decorators.js";
const input = document.getElementById("register-input");
import { users, newMessageInput, chatBox, chat } from "./main.js";
import { toogleListVisibility, styleDisconnected, styleConnected } from "./style.js";

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
            toogleListVisibility(true)
        }
    }

    emitRegister = (event) => {
        if(!input.value) return;
        if(users.find( v => v === input.value)) {
            alert("Username not available!")
        }
        this.socket.emit('register', {userName: input.value})
        toogleListVisibility(false)
    }

    register = () => {

    }

    getUsersConnected = () => {
        this.socket.emit("get-users-connected", {})
    }

    sendNewMessage = (message) => {
        this.socket.emit("new-message-chat", {message})
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


export function ClientSocketControlerV2(socket){
    this.socket = socket;

    this.register = () => {
        if(!input.value) return;
        if(users.find( v => v === input.value)) {
            alert("Username not available!")
        }
        this.socket.emit('register/v1', {userName: input.value})
    }
        
    this.disconnect = () => {
        this.socket.disconnect()
        users = [];
        styleDisconnected()
        toogleListVisibility(true)
    }

    this.registerResponse = (data) => {
        if(data.logged) {
            styleConnected();
            toogleListVisibility(false);
            return;
        }
        alert(data.error.message);
    }

    this.updateUsersList = (data) => {
        users = [...data.users]
        console.log("Updated users", {users})
        //disparar funcao para modificar UI
    }

    this.updateMessagesList = (data) => {
        chat = [...data.chat]
        console.log("Updated chat", {chat})
        //disparar funcao para modificar UI
    }

    this.register = tryCatch(this.register);
    this.disconnect = tryCatch(this.disconnect);
    this.registerResponse = tryCatch(this.registerResponse);
    this.updateUsersList = tryCatch(this.updateUsersList);
    this.updateMessagesList = tryCatch(this.updateMessagesList);
    this.socket.on("register-response", this.registerResponse);
    this.socket.on("update-users-list", this.updateUsersList);
    this.socket.on("update-messages-list", this.updateMessagesList);
}