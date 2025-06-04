import React from "react";

function JobTitleInput({ jobTitle = "", setJobTitle, onStart }) {
   // prevent page reload if job title is not empty
   function handleSubmit(event) {
      event.preventDefault();
      if ((jobTitle || "").trim()) {
         onStart();
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <label htmlFor="jobTitle">Job Title</label>
         <input
            id="jobTitle"
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
         />
         <button type="submit" disabled={!jobTitle.trim()}>
            Send Message
         </button>
      </form>
   );
}

export default JobTitleInput;
