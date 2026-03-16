const {Router}= require("express")
const interviewRouter=Router()
const authMiddleware=require("../middlewares/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")

/**
 * @route POST /api/interview
 * @description generate new interview report based on job description , resume,self description 
 * @access Private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)







module.exports=interviewRouter