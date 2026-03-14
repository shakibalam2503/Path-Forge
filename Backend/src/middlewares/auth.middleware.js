const jwtwebtoken=require("jsonwebtoken")
const { redisClient } = require("../config/redis")

async function authUser(req,res,next) {
    const token=req.cookies.token
    if(!token){
        return res.status(400).json({message:"cookie failed"})
    }
    try{
    const isBlackListed=await redisClient.get(token)
    if(isBlackListed){
        return res.status(400).json({message:"expired or invalid token"})
    }
    const decoded=jwtwebtoken.verify(token,process.env.JWT_SECRET_KEY)
    req.user=decoded
    next()
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"})
    }
}
module.exports={authUser}