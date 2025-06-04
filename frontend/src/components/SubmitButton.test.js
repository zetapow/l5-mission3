import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SubmitButton from "./SubmitButton";

describe("SubmitButton component", () => {
   test("render SubmitButton", () => {
      const onStart = jest.fn();
      render(<SubmitButton onStart={onStart} disabled={false} />);

      // Using a case-insensitive regex (/submit/i) to match the button text,
      // ensuring the test remains valid even if the button text changes slightly.
      const button = screen.getByRole("button", { name: /submit/i });
      expect(button).toBeInTheDocument();
   });

   test("calls onStart when clicked", () => {
      const onStart = jest.fn();
      render(<SubmitButton onStart={onStart} disabled={false} />);
      const button = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(button);
      expect(onStart).toHaveBeenCalled();
   });

   test("is disabled when the disabled prop is true", () => {
      // This ensures the button is inaccessible or unclickable when disabled, improving accessibility and preventing unintended actions.
      render(<SubmitButton onStart={jest.fn()} disabled={true} />);
      const button = screen.getByRole("button", { name: /submit/i });
      expect(button).toBeDisabled();
   });
});
