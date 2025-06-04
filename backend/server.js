require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

// Configuration and Environment variables
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash";
const TEMPERATURE = process.env.GEMINI_TEMPERATURE || 1.0;
const DEFAULT_MESSAGE =
   "Begin the mock interview by asking: Tell me about yourself";

// Fail fast if there is no API key
if (!API_KEY) {
   console.error("GEMINI_API_KEY is not set in environment variables.");
   process.exit(1);
}

// Initialize express and middleware
const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Check if root endpoint is working
app.get("/", (req, res) => {
   res.status(200).json({ status: "backend is running" });
});

/**
 * Req: jobTitle: string, messages: {sender:"user"| "model", text: string}[]}
 * Res: {response: string, jobTitle: string}
 */
app.post("/api/interview", async (req, res) => {
   // Extract job title and message from request body

   try {
      const { jobTitle, messages } = req.body;

      // Input validation
      if (!jobTitle || !messages) {
         return res.status(400).json({ error: "Invalid input" });
      }

      // Prepare chat history for Gemini API
      const history = messages.map((message) => ({
         role: message.sender === "user" ? "user" : "assistant",
         parts: [{ text: message.text }],
      }));

      // Set system instructions and create chat
      const systemInstruction = {
         role: "user",
         parts: [
            {
               text: `You are a professional hiring manager conducting a mock interview for the role of ${jobTitle}.

                  Rules:
                     1. Begin the interview by asking: \"Tell me about yourself\" if no user response exists yet.
                     2. Ask a total of at least 6 questions, adapting follow-up questions to the user's answers.
                     3. Keep questions relevant to the role of ${jobTitle} (you may touch on technical skills, experience, teamwork, problem solving, etc.).
                     4. Ask only one question at a time.
                     5. After the sixth question has been answered, provide feedback on the user's performance (strengths and areas to improve).
                     6. Remain in character as an interviewer at all times.`,
            },
         ],
      };

      // If no existing messages, start with a default message

      const lastMessage =
         messages.length > 0
            ? messages[messages.length - 1].text
            : DEFAULT_MESSAGE;

      const chat = ai.chats.create({
         model: MODEL_NAME,
         history,
         systemInstruction,
         maxOutputTokens: 500,
         temperature: TEMPERATURE,
      });

      // Send message
      const response = await chat.sendMessage({ message: lastMessage });
      console.log("Chat response:", response.text);
      res.json({
         response: response.text,
         jobTitle,
         history: [...messages, { sender: "model", text: response.text }],
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
         error: "Something went wrong",
         details: error.message,
      });
   }
});

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

// module.exports = app; // Export the app for testing purposes
