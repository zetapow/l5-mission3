export default async function sendInterviewApi(
   userMessage,
   jobTitle,
   chatHistory
) {
   const response = await fetch("http://localhost:3000/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         jobTitle,
         messages: [
            ...chatHistory.map(({ sender, message }) => ({
               sender,
               text: message,
            })),
            ...(userMessage ? [{ sender: "user", text: userMessage }] : []),
         ],
      }),
   });

   const data = await response.json();
   if (data.error) throw new Error(data.error);
   return data.response;
}
