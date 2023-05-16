const filterRegister = (item) => item?.id !== "register-&-button";
import { buttons, listOfUsers, listDiv } from './main.js'

export const styleConnected = () => {
    Object
    .values(buttons)
    .filter(filterRegister)
    .filter(Boolean)
    .forEach( button => { button.disabled = false }); 
    buttons.registerButton.disabled = true;
}

export const toogleListBisibility = (hide) => {
    hide
    ? listDiv.classList.add("hidden") 
    : listDiv.classList.remove("hidden")
}

export const styleDisconnected = () => {
    Object
    .values(buttons)
    .filter(filterRegister)
    .filter(Boolean)
    .forEach( button => { button.disabled = true });
    buttons.registerButton.disabled = false;
}


export const updateListOfusers = (users) => {
    listOfUsers.innerHTML = ""
    users.forEach( user => {
        const {userName, id} = user 
        const li = document.createElement('li')
        li.id = id;
        li.innerText = userName
        listOfUsers.appendChild(li)
    })

}