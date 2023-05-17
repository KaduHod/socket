# socket

# Este projeto serve para me ajudar a entender um fluxo de web socket

## Funcionalidades
- Logar
- Listar usuarios conectados
- Chat
- Requisitar info de usuaário


## Logar
Cliente adiciona um userName, servidor verifica se username ja esta sendo usado, caso não servidor salva user e id do socket do client. Depois envia a lista de usuarios atualizada para todos os usuarios conectados. Caso um usuario ja esteja cadastrado, o servidor deve notificar o coket do cliente

client -> E(registrar-user) -> Servidor -> E(C -> registrado) -> E(All -> atualziar lista de usuarios)
 



# Eventos Servidor
- register -> registra username e id do socket
- register-response(c) -> devolve resultado do registro 
- list-users -> envia lista de ususarios para todos os usuários
- list-messages -> envia mensagems para usuarios
- *notify-logout -> notifica log-out
- *notify-log-in -> notifica log-in

# Eventos Client
- register-response -> resposta do registro
- list-users -> atualiza lista de usuarios
- list-messages -> atualiza lista de mensagens