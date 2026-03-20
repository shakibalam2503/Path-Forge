const {Router}= require("express")
const interviewRouter=Router()
const authMiddleware=require("../middlewares/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")
const generateInterviewReport = require("../services/ai.service")

/**
 * @route POST /api/interview
 * @description generate new interview report based on job description , resume,self description 
 * @access Private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET /report/allInterviewReport
 * @description Get all the reports of the users
 * @access Private 
 */
interviewRouter.get("/report/allInterviewReport",authMiddleware.authUser,interviewController.getAllInterviewReportController)

/**
 * @route GET /report/:intervieId
 * @description Get interview report based on interview id
 * @access Private
 */
interviewRouter.get("/report/:interviewReportId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)







module.exports=interviewRouter