const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { redisClient } = require("../config/redis");
const { get } = require("mongoose");

require("dotenv").config();

/**
 * @name registerController
 * @description Expects Email password username from the user
 * @access Public
 */

async function registerController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });
    const token = jsonwebtoken.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "User Registerd successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error occured" });
  }
}

/**
 *
 * @name logInController
 * @description Expects username,email ,password from user
 * @access Public
 */

async function logInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jsonwebtoken.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "Log in successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error occured" });
  }
}
/**
 * @name LogoutController
 * @description Clear cookies and blacklist
 * @access Public
 */
async function logOutController(req, res) {
  try{
  const token = req.cookies.token;
  const decoded = jsonwebtoken.decode(token);
  const expiry = (decoded.exp = Math.floor(Date.now()/ 1000));
  await redisClient.set(token, "blacklisted", { Ex: expiry });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
  }
  catch(err){
    res.status(500).json({message:"External error"})
  }
}

/**
 * @name GetMeController
 * @description Get who have requested and use is logged in or not
 * @access private
 */
async function getMe(req,res) {
  const user=await userModel.findById(req.user.id)
  res.status(201).json({
    message:"User details fetch successfully ",
    user:{
      id:user.id,
      username:user.username,
      email:user.email
    }
  })
  
  
}
module.exports = { registerController, logInController, logOutController,getMe};
