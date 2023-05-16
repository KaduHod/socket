import { tryCatch } from "./decorators.js";
const input = document.getElementById("register-input");

export const ClientSocketController = class {
    constructor(socket) {
        this.socket = socket
        this.user = null;
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
    onRegisterResponse = (user) => {
        this.user = user
        this.socket.user = user
    }

    emitRegister = (event) => {
        if(!input.value) return;
        this.socket.emit('register', {userName: input.value})
    }

    getUsersConnected = () => {
        this.socket.emit("get-users-connected", {})
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




