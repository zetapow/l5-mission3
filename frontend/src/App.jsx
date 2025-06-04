import "./App.css";
import React from "react";
import { useState } from "react";

import SubmitButton from "./components/SubmitButton";
import JobTitleInput from "./components/JobTitleInput";
import ChatWindow from "./components/ChatWindow";

function App() {
   const [jobTitle, setJobTitle] = useState(""); // hook for job title
   const [started, setStarted] = useState(false); // hook for started state

   function handleStart() {
      setStarted(true);
   }
   return (
      <>
         <h2>Mock Interviewer</h2>
         <JobTitleInput
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            onStart={handleStart}
         />
         <ChatWindow />
         <SubmitButton onStart={handleStart} disabled={!jobTitle.trim()} />
      </>
   );
}

export default App;
