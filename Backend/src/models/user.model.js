const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account already registered with this Email"],
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:20
    },
})
const userModel=mongoose.model("users",userSchema)
module.exports=userModel