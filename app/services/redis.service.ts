
import { createClient } from "redis";
import * as dotenv from 'dotenv';
import {APP} from '../config/app.config'
dotenv.config()

const {REDIS_HOST, REDIS_PORT} = process.env

export type AppRedisClient = {
    set: (key: any, value: any) => Promise<string | Buffer | null>;
    get: (key: any) => Promise<string | null>;
    all: () => Promise<(string | null)[]>;
    disconnect: () => Promise<any>
}

export const RedisService = async ():Promise<AppRedisClient> => {
    try {
        const client = createClient({url: `redis://${REDIS_HOST}:${REDIS_PORT}`})
        await client.connect();
    
        const set = async (key:any, value:any ) => {
            return await client.set(key, value, {EX: APP.EXPIRATION_TIME as number})
        }
    
        const get = async (key:any) => {
            return await client.get(key)
        }
    
        const all = async () => (
            Promise.all( 
                (await client.keys("*")).map( (key:any) => get(key)) 
            )
        )
    
        const disconnect = async () => client.quit()
    
        return {set, get, all, disconnect}
    } catch(error) {
        throw error
    }
}
