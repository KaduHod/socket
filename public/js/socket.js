const socket = io("ws://localhost:3333");

socket.on("connection", (socket) => {
    socket.on("message", (msg) => {
        console.log({msg})
    })
    socket.on("register-response", (args) => {
        console.log({args})
    })
});

const input = document.getElementById("login-input")

document.getElementById('login-botao')
    .addEventListener("click", (event) => {
        socket.emit("register", {userName: input.value})
    })