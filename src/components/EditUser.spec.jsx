import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditUser from "./EditUser";

describe("EditUser component", () => {
  const mockUser = {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    phone: "555-1234",
    email: "john@example.com",
  };

  test("renders EditUser component with user data", () => {
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(
      <EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />
    );

    expect(screen.getByText("Edit User Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue(mockUser.name);
    expect(screen.getByLabelText("Address")).toHaveValue(mockUser.address);
    expect(screen.getByLabelText("Phone")).toHaveValue(mockUser.phone);
    expect(screen.getByLabelText("Email")).toHaveValue(mockUser.email);
  });

  test("calls onClose and setUsers when Save button is clicked", async () => {
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(
      <EditUser user={user} onClose={mockOnClose} setUsers={mockSetUsers} />
    );

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(mockSetUsers).toHaveBeenCalledTimes(1);
    });
  });

  test("calls onClose when Cancel button is clicked", () => {
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(
      <EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("calls handleFieldChange when input field value changes", () => {
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(
      <EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />
    );
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "New Name" },
    });
    fireEvent.click(screen.getByText("Save"));

    expect(mockSetUsers).toHaveBeenCalledWith({
      ...mockUser,
      name: "New Name",
    });
  });

  test("should have defaultProps onClose", () => {
    expect(EditUser.defaultProps.onClose).toBeDefined();
  });

  test("expected defaultProps", () => {
    const result = EditUser.defaultProps.onClose();
    expect(result).toBe(undefined);
  });

  test("should have defaultProps setUsers", () => {
    expect(EditUser.defaultProps.setUsers).toBeDefined();
  });

  test("expected defaultProps", () => {
    const result = EditUser.defaultProps.setUsers();
    expect(result).toBe(undefined);
  });
});
