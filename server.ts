import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI client lazily
let genaiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!genaiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not set. AI features will use fallback or fail.");
    }
    genaiClient = new GoogleGenAI({ apiKey: apiKey || "dummy_key" });
  }
  return genaiClient;
}

const SYSTEM_PROMPT = `
You are SkillBridge AI, an expert career coach and internship mentor.
Your goals are to:
- Analyze resumes professionally.
- Compare resumes with job descriptions.
- Identify missing technical and soft skills.
- Recommend practical improvements.
- Create realistic learning roadmaps.
- Suggest interview questions.
- Improve resume writing.
- Encourage users with constructive and actionable advice.
- Never fabricate certifications or experience.
- Be concise, supportive, and professional.
`;

// Helper to clean JSON string from markdown code blocks
function cleanJSON(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
  }
  return cleaned;
}

// 1. Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiConfigured: !!process.env.GEMINI_API_KEY });
});

// 2. Full Resume vs Job Description Analysis
app.post("/api/analyze-career", async (req, res) => {
  try {
    const { resumeText, jobDescription, targetRole = "Software Engineering Intern" } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Resume text and Job Description are required." });
    }

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

Analyze this candidate's resume against the provided job description for the target role: "${targetRole}".
Return ONLY a valid JSON object matching this exact schema without formatting markdown around it:
{
  "targetRole": string,
  "matchPercentage": number (0-100),
  "readinessScore": number (0-100),
  "readinessLevel": "Interview Ready" | "On the Right Track" | "Needs Polishing" | "Foundational Stage",
  "executiveSummary": string (2-3 supportive, professional sentences evaluating fit),
  "matchedSkills": string[] (skills candidate has that match job),
  "missingTechnicalSkills": string[] (crucial tech skills mentioned in JD or required for role that candidate lacks),
  "missingSoftSkills": string[] (communication, leadership, agile, etc. missing),
  "strengths": string[] (3-4 top highlights from resume),
  "improvementAreas": string[] (3-4 specific areas to upgrade),
  "bulletPointSuggestions": [
    {
      "original": string (a weak or basic bullet from their resume or generic example),
      "improved": string (a high-impact XYZ achievement formula bullet tailored to this JD),
      "rationale": string (why this change makes it stronger for recruiters)
    }
  ] (provide exactly 3 high-impact bullet suggestions),
  "topPriorityActions": string[] (3 immediate actionable steps candidate should take this week)
}

--- RESUME TEXT ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const responseText = response.text || "{}";
    const parsedData = JSON.parse(cleanJSON(responseText));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/analyze-career:", error);
    res.status(500).json({ error: "Failed to analyze career data.", details: error.message });
  }
});

// 3. Job Description Analyzer
app.post("/api/analyze-jd", async (req, res) => {
  try {
    const { jobDescriptionText } = req.body;
    if (!jobDescriptionText) {
      return res.status(400).json({ error: "Job description text is required." });
    }

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

Extract and analyze key requirements from this job description.
Return ONLY a valid JSON object matching this schema:
{
  "jobTitle": string (extracted or inferred),
  "companyName": string (extracted or "Not specified"),
  "experienceLevel": string (e.g., "Internship", "Entry-Level / Junior", "Mid-Level"),
  "requiredTechnicalSkills": string[] (list of technical tools, languages, frameworks),
  "requiredSoftSkills": string[] (collaboration, communication, problem-solving),
  "keyResponsibilities": string[] (4-6 main day-to-day duties),
  "minimumQualifications": string[] (must-have qualifications),
  "preferredQualifications": string[] (nice-to-have qualifications)
}

--- JOB DESCRIPTION ---
${jobDescriptionText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsedData = JSON.parse(cleanJSON(response.text || "{}"));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/analyze-jd:", error);
    res.status(500).json({ error: "Failed to analyze job description.", details: error.message });
  }
});

// 4. Learning Roadmap Generator
app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const { missingSkills, targetRole = "Tech Intern", timeframeWeeks = 6 } = req.body;
    if (!missingSkills || !Array.isArray(missingSkills) || missingSkills.length === 0) {
      return res.status(400).json({ error: "An array of missing skills is required." });
    }

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

Create a practical, structured ${timeframeWeeks}-week learning roadmap for a student aiming for a "${targetRole}" position who needs to learn or improve these missing skills: ${missingSkills.join(", ")}.
Return ONLY a valid JSON object matching this schema:
{
  "targetRole": string,
  "totalWeeks": number,
  "overview": string (motivational overview of the learning plan),
  "prioritySkills": string[] (top 3 skills to focus on first with highest job market ROI),
  "weeks": [
    {
      "weekNumber": number,
      "title": string (theme of the week, e.g. "Mastering React Hooks & State"),
      "focusSkills": string[],
      "learningObjectives": string[] (3 specific things they will learn),
      "freeResources": [
        {
          "title": string (e.g. "freeCodeCamp Responsive Web Design", "Harvard CS50 on YouTube", "Official React Docs"),
          "platform": string ("YouTube" | "Coursera" | "freeCodeCamp" | "MIT OpenCourseWare" | "Official Docs" | "GitHub"),
          "url": string (valid or general search link like "https://www.freecodecamp.org" or "https://www.youtube.com"),
          "type": "Video Course" | "Interactive Tutorial" | "Documentation" | "Project"
        }
      ] (provide 2-3 free resources),
      "estimatedHours": number (e.g., 8-12 hours),
      "practicalProject": string (a mini coding task or deliverable for this week to put on GitHub)
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsedData = JSON.parse(cleanJSON(response.text || "{}"));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/generate-roadmap:", error);
    res.status(500).json({ error: "Failed to generate learning roadmap.", details: error.message });
  }
});

// 5. AI Interview Preparation
app.post("/api/interview-prep", async (req, res) => {
  try {
    const { resumeText = "", jobDescription = "", targetRole = "Software Intern" } = req.body;

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

Generate a comprehensive interview preparation guide tailored for a candidate interviewing for "${targetRole}".
Consider their resume background and the job description if provided.
Return ONLY a valid JSON object matching this schema:
{
  "targetRole": string,
  "confidenceTips": string[] (4 practical tips for body language, communication clarity, and overcoming imposter syndrome),
  "technicalQuestions": [
    {
      "id": string ("tech-1", "tech-2", etc.),
      "question": string (realistic technical question for this role),
      "difficulty": "Easy" | "Medium" | "Hard",
      "whyAsked": string (what interviewer is evaluating),
      "suggestedAnswer": string (a clear, structured answer demonstrating mastery),
      "keyPointsToMention": string[]
    }
  ] (provide exactly 4 questions),
  "hrQuestions": [
    {
      "id": string ("hr-1", "hr-2", etc.),
      "question": string (e.g. why this company, strengths, weakness),
      "whyAsked": string,
      "suggestedAnswer": string,
      "keyPointsToMention": string[]
    }
  ] (provide exactly 3 questions),
  "behavioralQuestions": [
    {
      "id": string ("beh-1", "beh-2", etc.),
      "question": string (situational/STAR style question),
      "whyAsked": string,
      "suggestedAnswer": string (formatted clearly using Situation, Task, Action, Result),
      "keyPointsToMention": string[]
    }
  ] (provide exactly 3 questions)
}

--- RESUME SUMMARY ---
${resumeText ? resumeText.slice(0, 1500) : "Standard computer science / tech student background."}

--- JOB DESCRIPTION SUMMARY ---
${jobDescription ? jobDescription.slice(0, 1500) : `General requirements for ${targetRole}`}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsedData = JSON.parse(cleanJSON(response.text || "{}"));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/interview-prep:", error);
    res.status(500).json({ error: "Failed to generate interview questions.", details: error.message });
  }
});

// 6. Interactive Mock Interview Answer Evaluator
app.post("/api/evaluate-interview-answer", async (req, res) => {
  try {
    const { question, userAnswer, targetRole = "Intern" } = req.body;
    if (!question || !userAnswer) {
      return res.status(400).json({ error: "Question and user answer are required." });
    }

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

A candidate interviewing for "${targetRole}" answered the following interview question:
Question: "${question}"
Candidate's Answer: "${userAnswer}"

Evaluate their response constructively. Return ONLY a valid JSON object matching this schema:
{
  "score": number (1 to 10),
  "verdict": "Excellent" | "Good" | "Needs Improvement" | "Weak",
  "strengths": string[] (what they did well in this answer),
  "critique": string[] (constructive feedback on what was missing or unclear),
  "starAnalysis": {
    "situationTask": string (assessment of S/T setup),
    "action": string (assessment of actionable verbs used),
    "result": string (assessment of quantifiable outcomes)
  },
  "polishedVersion": string (a rewritten, professional model answer that preserves their real experience but elevates phrasing)
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsedData = JSON.parse(cleanJSON(response.text || "{}"));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/evaluate-interview-answer:", error);
    res.status(500).json({ error: "Failed to evaluate answer.", details: error.message });
  }
});

// 7. Resume Improvement Studio (AI Writer)
app.post("/api/improve-resume", async (req, res) => {
  try {
    const { sectionType, content, targetRole = "Software Intern", jobDescription = "" } = req.body;
    if (!sectionType || !content) {
      return res.status(400).json({ error: "sectionType and content are required." });
    }

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

You are helping a candidate upgrade their resume's "${sectionType}" section for the role of "${targetRole}".
Original Content from candidate:
"${content}"

${jobDescription ? `Target Job Description Keywords: ${jobDescription.slice(0, 1000)}` : ""}

Generate professional improvements. Never fabricate false experiences, but optimize structure, action verbs, quantification formulas, and keyword density.
Return ONLY a valid JSON object matching this schema:
{
  "sectionType": string,
  "originalContent": string,
  "overallCritique": string (why the original needs work),
  "suggestions": [
    {
      "optionName": string (e.g., "Option 1: Impact & Metric Driven", "Option 2: Concise & ATS Optimized", "Option 3: Leadership & Technical Depth"),
      "content": string (the full rewritten section or bullet points ready to copy-paste),
      "highlights": string[] (why this version works well)
    }
  ] (provide exactly 3 distinct, high-quality options)
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsedData = JSON.parse(cleanJSON(response.text || "{}"));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/improve-resume:", error);
    res.status(500).json({ error: "Failed to improve resume section.", details: error.message });
  }
});

// 8. Career & Networking Tips Generator
app.post("/api/career-tips", async (req, res) => {
  try {
    const { topic = "linkedin", targetRole = "Software Engineer Intern", userContext = "" } = req.body;

    const ai = getAI();
    const prompt = `${SYSTEM_PROMPT}

Generate actionable, highly practical mentorship advice for a student aiming for "${targetRole}" focusing on the topic: "${topic.toUpperCase()}".
${userContext ? `Additional context about student: "${userContext}"` : ""}

Return ONLY a valid JSON object matching this schema:
{
  "topic": string,
  "title": string,
  "overview": string,
  "actionChecklist": [
    {
      "task": string,
      "whyImportant": string,
      "difficulty": "Easy" | "Medium" | "High Impact"
    }
  ] (provide 5 specific checklist items),
  "templates": [
    {
      "title": string (e.g. "LinkedIn Recruiter Outreach Message", "About Section Formula", "Cold Email to Alumni"),
      "templateText": string (ready to customize with placeholders like [Company], [Skill]),
      "usageTip": string
    }
  ] (provide 2-3 ready-to-use templates),
  "proTips": string[] (3 insider secrets from tech recruiters)
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsedData = JSON.parse(cleanJSON(response.text || "{}"));
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/career-tips:", error);
    res.status(500).json({ error: "Failed to generate career tips.", details: error.message });
  }
});

// Vite middleware setup for SPA fallback in dev/prod
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    startListening();
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  startListening();
}

function startListening() {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SkillBridge AI Backend running on http://localhost:${PORT}`);
  });
}
