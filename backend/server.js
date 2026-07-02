const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

// ============================
// Gemini Setup
// ============================

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY Missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log("✅ Gemini API Loaded");

// ============================
// Middleware
// ============================

app.use(cors());
app.use(express.json());

// ============================
// Multer
// ============================

const upload = multer({
  dest: "uploads/",
});

// ============================
// Test Route
// ============================

app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend Running 🚀");
});

// ============================
// Analyze Resume
// ============================

app.post("/analyze", upload.single("resume"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required."
      });
    }

    console.log("========== NEW REQUEST ==========");

    // Read Resume

    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    // Gemini Model

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Prompt

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume against the Job Description.

Resume:
${pdfData.text}

Job Description:
${req.body.jobDescription}

Return ONLY valid JSON.

Do NOT return Markdown.

Do NOT explain anything.

Return ONLY this structure.

{
  "atsScore": 0,
  "strengths": [],
  "missingSkills": [],
  "weaknesses": [],
  "suggestions": [],
  "finalVerdict": ""
}

Rules:

- atsScore must be a number from 0-100.
- strengths must be an array.
- missingSkills must be an array.
- weaknesses must be an array.
- suggestions must be an array.
- finalVerdict must be 2-3 sentences.

Return ONLY JSON.
`;

    // Gemini Response

    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    console.log("========== RAW GEMINI RESPONSE ==========");
    console.log(responseText);

    // Remove Markdown JSON fences if Gemini adds them

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse JSON

    const analysis = JSON.parse(responseText);

    // Delete uploaded file

    fs.unlinkSync(req.file.path);

    // Send to Frontend

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.error(error);

    // Delete uploaded file if exists

    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {}
    }

    res.status(500).json({
      success: false,
      message: "Unable to analyze resume.",
      error: error.message,
    });

  }

});

// ============================
// Start Server
// ============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});