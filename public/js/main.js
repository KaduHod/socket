import { socketEventsHandler } from "./socket.js";
import { styleConnected } from "./style.js";

export const buttons = {
    registerButton : document.getElementById("register-&-button"),
    getUsersConnectedButton : document.getElementById("show-users-connected-button"),
    disconnectButton : document.getElementById("disconnect-button"),
    myInfoButton: document.getElementById("my-info-button"),
    buttonEnviarMensagem: document.getElementById("chat-enviar-mensagem")
};

console.log({buttons})

export const listDiv = document.getElementById("list-users-container");
export const listOfUsers = document.getElementById("users-connected");
export const newMessageInput = document.getElementById("new-message-chat");
export const chatBox = document.getElementById("chat-messages")

export let users = [];

let socket;

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
