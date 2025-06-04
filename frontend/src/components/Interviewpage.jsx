import React, { useState } from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import JobTitleInput from '../../components/JobTitleInput/JobTitleInput';
import SubmitButton from '../../components/Submit Button/SubmitButton';
import sendInterviewApi from '../apis/interviewApi'; 

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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {!chatHistory.length ? (
        <JobTitleInput
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          onSubmit={startInterview}
        />
      ) : (
        <>
          <ChatWindow chatHistory={chatHistory} />
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={3}
            placeholder="Your answer..."
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
          />
          <SubmitButton onClick={handleSubmitAnswer} disabled={!userInput.trim()} />
        </>
      )}
    </div>
  );
};

export default InterviewPage;