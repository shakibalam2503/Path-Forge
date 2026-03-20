const { GoogleGenAI, Type } = require("@google/genai");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { z } = require("zod");
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// 1. Keep your Zod schema for strictly validating the final result
const interviewReportSchema = z.object({
    matchScore: z.number(),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),
    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum([ "low", "medium", "high" ])
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    })),
    title: z.string(),
});

// 2. Define the Native Gemini Schema using their Type enum
const geminiResponseSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { 
            type: Type.NUMBER, 
            description: "A score between 0 and 100 indicating how well the candidate's profile matches." 
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked in the interview.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    severity: { type: Type.STRING, description: "Must be exactly: low, medium, or high" }
                },
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER },
                    focus: { type: Type.STRING },
                    tasks: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
            }
        },
        title: { type: Type.STRING }
    },
    // Make sure to mark all top-level keys as required so the model doesn't skip them
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};


async function generateInterviewReport({ selfDescription, resume, jobDescription }) {
    try{
    const prompt = `
Generate a highly detailed interview preparation report.
Analyze the candidate's data deeply against the job description.

Candidate Data:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // Using standard stable flash model
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: geminiResponseSchema, // Pass the native schema here
        
        }
    });

    // Parsing  the text into a JSON object
    const rawJson = JSON.parse(response.text);

    // Validate and type-cast the result using your Zod schema
    const validatedReport = interviewReportSchema.parse(rawJson);
    
    //console.log(JSON.stringify(validatedReport, null, 2));
    return validatedReport;
}
catch(err){
    console.log("Api error")
}
}
async function generateHtmlResume({selfDescription,jobDescription,resume}) {
    resumePdfSchema=z.object({
        html:z.string().describe("The HTML content to be converted into PDF using any library like puppeteer or pdfkit")
    })
    const prompt = `
Generate a professional resume in HTML format.

Extract the candidate's NAME from the resume if available.
If not available, generate a realistic name.

Candidate Data:
Resume: ${resume || "Not provided"}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return JSON:
{
  "html": "<complete resume HTML>"
  the resume should be tailored to the job description and should highlight the candidate's strengths while addressing any potential weaknesses. The HTML should be well-structured, visually appealing, and suitable for conversion and minimal spacing  to PDF format.
  The content of the resume should not sound generic or AI-generated and should be as close to human-written as possible, with a focus on authenticity and relevance to the job description.
  you can highlight the content using some colours 
  The content should be ats friendly and should include relevant keywords from the job description to increase the chances of passing through applicant tracking systems.
  The resume should not be lengthy and should ideally be one page, but can extend to two pages if necessary to effectively showcase the candidate's qualifications and experience.

}
`;
    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(resumePdfSchema)
        }
    })
    const jsonContent=JSON.parse(response.text)
    return jsonContent.html;
}
async function convertHtmlToPdf(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();   
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4',margin:{top:"15mm",bottom:"15mm",left:"15mm",right:"15mm"} });
    await browser.close();
    return pdfBuffer;

}

module.exports = {generateInterviewReport,generateHtmlResume,convertHtmlToPdf};