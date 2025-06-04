import React, { useState } from "react";
import "./App.css";

import JobTitleInput from "./components/JobTitleInput/JobTitleInput";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import SubmitButton from "./components/Submit Button/SubmitButton";

import sendInterviewApi from "./apis/InterviewApi";

function App() {
   const [jobTitle, setJobTitle] = useState("");
   const [chatHistory, setChatHistory] = useState([]);
   const [userInput, setUserInput] = useState("");
   const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);

   const startInterview = async () => {
      const aiIntro = await sendInterviewApi("", jobTitle, []);
      setChatHistory([{ sender: "ai", message: aiIntro }]);
      setAwaitingUserResponse(true);
   };

   const handleSubmitAnswer = async () => {
      const newHistory = [
         ...chatHistory,
         { sender: "user", message: userInput },
      ];
      setChatHistory(newHistory);
      setUserInput("");
      setAwaitingUserResponse(false);

      const aiReply = await sendInterviewApi(userInput, jobTitle, newHistory);
      setChatHistory([...newHistory, { sender: "ai", message: aiReply }]);
      setAwaitingUserResponse(true);
   };

   return (
      <div className="app-container">
         <JobTitleInput
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            onSubmit={startInterview}
         />

         {chatHistory.length > 0 && (
            <>
               <ChatWindow chatHistory={chatHistory} />

               <div className="input-row">
                  <textarea
                     className="reply-input"
                     value={userInput}
                     onChange={(e) => setUserInput(e.target.value)}
                     placeholder="Type your reply..."
                     rows={2}
                  />
                  <SubmitButton
                     onClick={handleSubmitAnswer}
                     disabled={!userInput.trim()}
                  />
               </div>
            </>
         )}
      </div>
   );
}

export default App;
