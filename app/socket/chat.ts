import { User } from "./users"

export type ChatMessage = {
    user: Omit<User, "socket">
    message: string,
    socketId: string
}

export const chatMessages:ChatMessage[] = []