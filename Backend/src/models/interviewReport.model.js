const mongoose= require("mongoose")

/**
 * - Self description
 * - Resume
 * - Job Description
 * 
 * 
 * 
 * 
 * MatchScore=Number
 * - Technical Question [
 *          {
 *              Question:string,
 *              Intention:string
 *              Answer:string
 *          }
 *         ]
 * - Behavioural Question [
 *          {
 *              Qustion:string,
 *              Intention:string
 *              Answer:string
 *          }
 *         ]
 * -Skill Gaps [
 *           {
 *              name:""
 *              severity:""
 *                  enum:["low,medium,high"]
 *           }
 * ]
 * - Preparation Plan [
 * 
 * 
 *          {
 *              day:Number
 *              focus:String
 *              task:[]
 *          }
 * 
 * ]
 */
const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        require:[true,"Technical Question is required"]
    },
    intention:{
        type:String,
        require:[true,"Intention is required"]

    },
    answer:{
        type:String,
        require:[true,"Answer is required"]

    },

},{_id:false})


const behavioralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]

    },
    answer:{
        type:String,
        required:[true,"Answer is required"]

    },

},{_id:false})


const  skillSchema=new mongoose.Schema({
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

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Day is required"]
    },
    task:
        [
            {
                type:String,
                required:true
            }
        ]
    
})



const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skill:[skillSchema],
    preparation:[preparationPlanSchema]

})
const interviewReportModel=new mongoose.model("interviewReport",interviewReportSchema)
module.exports(interviewReportModel)