import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserActions from "./UserActions";

describe("UserActions Component", () => {
  const mockUser = {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    phone: "555-1234",
    email: "john@example.com",
  };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("renders UserActions component correctly", () => {
    const { getByTestId } = render(
      <UserActions
        user={mockUser}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(getByTestId("edit-icon")).toBeInTheDocument();
    expect(getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("calls onEdit function when edit icon is clicked", () => {
    const { getByTestId } = render(
      <UserActions
        user={mockUser}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(getByTestId("edit-icon"));

    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it("calls onDelete function when delete icon is clicked", () => {
    const { getByTestId } = render(
      <UserActions
        user={mockUser}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(getByTestId("delete-icon"));

    expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
  });
});
