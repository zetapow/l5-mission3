require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { GoogleGenAI } = require("@google/genai");

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

async function main() {
   const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:
         "As a hiring manager with over 20 years of experience, how would you suggest a new full-stack developer approach a job search? What key skills and strategies should they focus on to stand out in the current job market?",
      maxOutputTokens: 500,
   });
   console.log(response.text);
}

main();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${process.env.PORT}`);
});
