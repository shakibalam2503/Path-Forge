const {Router}=require("express")
const authRouter=Router()
const authController=require("../controllers/auth.controller")
const authmiddleware=require("../middlewares/auth.middleware")


/**
 * @route POST api/auth/register
 * @description Register new user
 * @access Public 
 */

authRouter.post("/register",authController.registerController)

/**
 * @route POST api/auth/login
 * @description Log in user 
 * @access Public
 */
authRouter.post("/login",authController.logInController)


/**
 * @route GET api/auth/logout
 * @description Log out user and clear token from user cookie and blacklisting
 * @access Public
 */
authRouter.get("/logout",authController.logOutController)

/**
 * @route GET api/auth/get-me
 * @description give info of the user and either the user is logged in or not
 * @access Private
 */

authRouter.get("/get-me",authmiddleware.authUser,authController.getMe)

module.exports=authRouter