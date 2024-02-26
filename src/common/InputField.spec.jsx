import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./InputField";
import { useForm } from "react-hook-form";

describe("InputField component", () => {
  test("renders InputField component with the provided props", () => {
    const mockRegister = jest.fn();
    const { container } = render(
      <InputField
        name="testName"
        placeholder="Test Placeholder"
        register={mockRegister}
        required={true}
      />
    );

    const inputElement = screen.getByPlaceholderText("Test Placeholder");

    // Check if the input element is rendered with the correct attributes
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("name", "testName");

    // Check if the register function is called with the correct parameters
    expect(mockRegister).toHaveBeenCalledWith("testName", { required: true });
  });

  test("allows user input and triggers register function", () => {
    const mockRegister = jest.fn();
    const { container } = render(
      <InputField
        name="testName"
        placeholder="Test Placeholder"
        register={mockRegister}
        required={true}
      />
    );

    const inputElement = screen.getByPlaceholderText("Test Placeholder");
    userEvent.type(inputElement, "Test Input");
    expect(mockRegister).toHaveBeenCalledWith("testName", {
      required: true,
      value: "Test Input",
    });
  });
});
