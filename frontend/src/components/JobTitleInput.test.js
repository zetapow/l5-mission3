import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobTitleInput from "./JobTitleInput";

describe("JobTitleInput component", () => {
   let setJobTitle;
   let onStart;

   // reset mock functions
   beforeEach(() => {
      setJobTitle = jest.fn();
      onStart = jest.fn();
   });

   function renderComponent(jobTitle = "") {
      return render(
         <JobTitleInput
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            onStart={onStart}
         />
      );
   }

   test("Show job title input", () => {
      renderComponent();
      // find input by placeholder text, case-insensitive
      const input = screen.getByPlaceholderText(/job title/i);
      expect(input).toBeInTheDocument();
   });

   test("input change updates setJobTitle", () => {
      renderComponent();
      const input = screen.getByPlaceholderText(/job title/i);
      fireEvent.change(input, { target: { value: "Web Developer" } });
      // setJobTitle should be called with the new value
      expect(setJobTitle).toHaveBeenCalledWith("Web Developer");
   });

   test("onStart called when input is not empty", () => {
      renderComponent("Web Developer");
      const button = screen.getByRole("button", { name: /send message/i });
      fireEvent.click(button);
      expect(onStart).toHaveBeenCalled();
   });

   test("button is disabled when job title is empty", () => {
      renderComponent();
      const button = screen.getByRole("button", { name: /send message/i });
      expect(button).toBeDisabled();
   });
});
