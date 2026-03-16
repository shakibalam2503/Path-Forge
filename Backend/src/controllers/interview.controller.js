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
module.exports = { generateInterviewReportController };
