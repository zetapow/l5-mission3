import React, { useState } from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import JobTitleInput from '../../components/JobTitleInput/JobTitleInput';
import SubmitButton from '../../components/Submit Button/SubmitButton';
import sendInterviewApi from '../apis/interviewApi'; 
import './InterviewPage.css';

const InterviewPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);

  const startInterview = async () => {
    const intro = await sendInterviewApi('', jobTitle, []);
    setChatHistory([{ sender: 'ai', message: intro }]);
    setAwaitingUserResponse(true);
  };

  const handleSubmitAnswer = async () => {
    const newHistory = [...chatHistory, { sender: 'user', message: userInput }];
    setChatHistory(newHistory);
    setUserInput('');
    setAwaitingUserResponse(false);

    const aiReply = await sendInterviewApi(userInput, jobTitle, newHistory);
    setChatHistory([...newHistory, { sender: 'ai', message: aiReply }]);
    setAwaitingUserResponse(true);
  };

  return (
    <div className="app-container">
      {!chatHistory.length ? (
        <JobTitleInput
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          onSubmit={startInterview}
        />
      ) : (
        <>
          <ChatWindow chatHistory={chatHistory} />
          <div className="input-row">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={3}
              placeholder="Your answer..."
              className="reply-input"
            />
            <SubmitButton onClick={handleSubmitAnswer} disabled={!userInput.trim()} />
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewPage;