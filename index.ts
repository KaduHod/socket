import ENV from './app/config/env'
import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
import indexController from './app/http/controller';
import { SocketHandler } from './app/socket/events.socket'
import path from 'path';
import { RedisService } from './app/services/redis.service';
import { SocketController } from './app/socket/socketController';
import { UserService } from './app/socket/users';

async function start() {
    const app = express()
        .use(express.static(path.join(__dirname, 'public')))
        .use(express.json())
        .use(express.urlencoded())
        .use('/', indexController)

    console.log("[ Bootstrap server ]")

    const httpServer = createServer(app)
    const redis = await RedisService()
    const userService = UserService()
    const ioServer = new Server(httpServer)
    const controller = new SocketController(ioServer, redis, userService)
    SocketHandler(ioServer, controller)

    httpServer.listen(ENV.APP_PORT)

    console.log(`[ Server Listening: ${ENV.APP_HOST}:${ENV.APP_PORT} ]`)
    console.log(`[ Socket Listening: ${ENV.APP_HOST}:${ENV.APP_PORT} ]`)
}

start()
