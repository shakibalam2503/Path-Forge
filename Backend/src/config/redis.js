require("dotenv").config()
const { createClient } = require("redis");

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
redisClient.on('error', err => console.log('Redis Client Error', err));

async function connectRedis(){
    try{
    await redisClient.connect();
    console.log("Redis Connected successfully at port "+process.env.REDIS_PORT)
    }
    catch(err){
        console.error(err)
    }
}
module.exports={connectRedis,redisClient}

