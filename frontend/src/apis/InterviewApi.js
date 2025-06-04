// This is just a mock function until the backend is ready, just so I can test the front end. Not a real API

export default async function sendInterviewApi(userMessage, jobTitle, chatHistory) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReply = userMessage
        ? `Thanks for your answer about ${jobTitle}. Let's continue.`
        : `Welcome to your interview for ${jobTitle}. Let's begin!`;

      resolve(mockReply);
    }, 1000);
  });
}
