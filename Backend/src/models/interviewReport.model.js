const mongoose = require("mongoose")

const technicalQuestionSchema = new mongoose.Schema({
   question:{
      type:String,
      required:true
   },
   intention:{
      type:String,
      required:true
   },
   answer:{
      type:String,
      required:true
   }
},{_id:false})

const behavioralQuestionSchema = new mongoose.Schema({
   question:{
      type:String,
      required:true
   },
   intention:{
      type:String,
      required:true
   },
   answer:{
      type:String,
      required:true
   }
},{_id:false})

const skillGapSchema = new mongoose.Schema({
   skill:{
      type:String,
      required:true
   },
   severity:{
      type:String,
      enum:["Low","Medium","High"],
      required:true
   }
},{_id:false})

const preparationPlanSchema = new mongoose.Schema({
   day:{
      type:Number,
      required:true
   },
   focus:{
      type:String,
      required:true
   },
   task:[String]
},{_id:false})

const interviewReportSchema = new mongoose.Schema({
   jobDescription:{
      type:String,
      required:true
   },
   resume:String,
   selfDescription:String,

   matchScore:{
      type:Number,
      min:0,
      max:100,
      required:true
   },

   technicalQuestions:[technicalQuestionSchema],
   behavioralQuestion:[behavioralQuestionSchema],
   skillGap:[skillGapSchema],
   preparation:[preparationPlanSchema]

})

const interviewReportModel = mongoose.model(
   "InterviewReport",
   interviewReportSchema
)

module.exports = interviewReportModel