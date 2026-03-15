const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");

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


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

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

    // Parse the text into a JSON object
    const rawJson = JSON.parse(response.text);

    // Validate and type-cast the result using your Zod schema
    const validatedReport = interviewReportSchema.parse(rawJson);
    
    console.log(JSON.stringify(validatedReport, null, 2));
    return validatedReport;
}

module.exports = generateInterviewReport;