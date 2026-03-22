const express= require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[ "http://localhost:5173",
        "https://path-forge-flax.vercel.app/"],
    credentials:true
}))

/**
 * @import routes
 */
const authRouter = require("./routes/auth.routes");
const interviewRouter=require("./routes/interview.routes")




/**
 * @route All the routes
 */
app.use("/api/auth", authRouter);
app.use("/api/interview",interviewRouter)

module.exports=app