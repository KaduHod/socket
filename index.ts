import ENV from './app/config/env'
import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
import indexController from './app/http/controller';
import socketHandler from './app/socket/controller';
import path from 'path';
import { RedisService } from './app/services/redis.service';

async function start() {
    
    const app = express()
        .use(express.static(path.join(__dirname, 'public')))
        .use(express.json())
        .use(express.urlencoded())
        .use('/', indexController)

    const redis = await RedisService()

    console.log("[ Bootstrap server ]")

    const httpServer = createServer(app)
    const ioServer = new Server(httpServer)
    httpServer.listen(ENV.APP_PORT)

    console.log(`[ Server Listening: ${ENV.APP_HOST}:${ENV.APP_PORT} ]`)
    
    socketHandler(ioServer, redis)

    console.log(`[ Socket Listening: ${ENV.APP_HOST}:${ENV.APP_PORT} ]`)
}

start()
