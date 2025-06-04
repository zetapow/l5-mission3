import React from "react";

function SubmitButton({ onStart, disabled }) {
   return (
      <button onStart={onStart} disabled={disabled} name="submit" type="submit">
         Submit
      </button>
   );
}

export default SubmitButton;
