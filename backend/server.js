require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

// Iniialize express app
const PORT = process.env.PORT || 3000;
const app = express();

// Initialize middlewares
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

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

      const history = messages.map((message) => ({
         role: message.sender === "user" ? "user" : "model",
         parts: [{ text: message.text }],
      }));

      const chat = ai.chats.create({
         model: "gemini-2.0-flash",
         history: history,
         systemInstruction: {
            role: "model",
            parts: [
               {
                  text: `You are a professional hiring manager conducting a mock interview for the role of ${jobTitle}.

                     1. Begin the interview by asking: \"Tell me about yourself\" if no user response exists yet.
                     2. Ask a total of at least 6 questions, adapting follow-up questions to the user's answers.
                     3. Keep questions relevant to the role of ${jobTitle} (you may touch on technical skills, experience, teamwork, problem solving, etc.).
                     4. Ask only one question at a time.
                     5. After the sixth question has been answered, provide feedback on the user's performance (strengths and areas to improve).
                     6. Remain in character as an interviewer at all times.`,
               },
            ],
         },
         maxOutputTokens: 500,
      });

      const lastMessage =
         messages.length > 0
            ? messages[messages.length - 1].text
            : "Tell me about yourself";

      // Send message
      const response = await chat.sendMessage({ message: lastMessage });
      console.log("Chat response:", response.text);
      res.json({
         response: response.text,
         jobTitle,
         history: [...messages, { sender: "model", text: response.text }],
      });
   } catch (error) {
      console.error("Could not generate a response:", error);
      res.status(500).json({
         error: "Something went wrong",
         details: error.message,
      });
   }

   // async function getAIResponse(jobTitle, messages) {
   //    const response = await ai.models.generateContent({
   //       model: "gemini-2.0-flash",
   //       contents: "What is 1 + 1?",
   //       maxOutputTokens: 500,
   //    });
   //    console.log(response.text);
   // }
});

// getAIResponse();

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
