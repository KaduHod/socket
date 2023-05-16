import { Socket } from "socket.io"

export type User = {
    address: string,
    userName: string
    socket: Socket & {user?:User}
}

export type UserServiceT = {
    register: (user:User, socketId: string) => any;
    remove: (address: string) => any;
    users: Map<string,User>;
}

export const UserService = ():UserServiceT => {
    const users = new Map<string,User>()
    const register = (user:User, socketId: string) => {
        return users.get(socketId) ?? users.set(socketId,user);
    }

    const remove = (id:string) => {
        return users.delete(id)
    }

    return {register, remove, users}
}
