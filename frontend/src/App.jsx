import "./App.css";

import SubmitButton from "./components/SubmitButton";
import JobTitleInput from "./components/JobTitleInput";
import ChatWindow from "./components/ChatWindow";

function App() {
   return (
      <>
         <JobTitleInput />
         <ChatWindow />
         <SubmitButton />
      </>
   );
}

export default App;
