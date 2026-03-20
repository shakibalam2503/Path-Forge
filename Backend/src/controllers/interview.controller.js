const pdfParse = require("pdf-parse");
const generateInterviewReport=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")
/**
 * @name generateInterviewReportController
 * @description Generate Report by analyzing job description,self description and resume
 * @access Private
 */
async function generateInterviewReportController(req, res) {
  try{
  const resumeContent =await (new pdfParse.PDFParse(Uint8Array.from( req.file.buffer))).getText()  
  const { selfDescription, jobDescription } = req.body;
  
  const interViewReportByAi=await generateInterviewReport({selfDescription,resume:resumeContent.text,jobDescription})
  //console.log(interViewReportByAi)
  const interViewReport=await interviewReportModel.create(
    {
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    }
  )
  console.log(interViewReport)
  res.status(200).json({"message":"Inverview report generated and succussfully stored",
    interViewReport
  })
}
catch(err){
    console.error(err)
    res.status(500).json({ message: err.message });
}
}
/**
 * 
 * @name getInterViewByIdController 
 * @description Get interview Report based on Id 
 * @access Private
 */
async function getInterviewReportByIdController(req,res) {
  const { interviewReportId } = req.params;
  const report= await interviewReportModel.findOne({_id:interviewReportId,user:req.user.id})
  if(!report){
    return res.status(404).json({"message":"Not found or internal error occured"})
  }
  try{
    res.status(200).json({
      "message":"interview report fetched successfully",
      report

    })
  }
  catch(err){
    res.status(404).json({"message":"Not found or internal error occured"})
  }
  
}

/**
 * @name getAllInterviewReportController
 * @description show all the report of the user 
 * @access Private
 */
async function getAllInterviewReportController(req,res) { 
  try{
  const interviewReports= await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -__v -preparationPlan")
  res.status(200).json({"message":"Data fetched successfully",interviewReports})
  }
  catch(err){
    res.status(404).json({"message":"could not find "})
  }
}
module.exports = { generateInterviewReportController,getInterviewReportByIdController ,getAllInterviewReportController};
