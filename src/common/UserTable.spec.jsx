import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserTable from "./UserTable";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    phone: "555-1234",
    email: "john@example.com",
  },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe("render UserTable component", () => {
  test("renders UserTable with user data", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.address)).toBeInTheDocument();
      expect(screen.getByText(user.phone)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });
  test("should have defaultProps onEdit", () => {
    expect(UserTable.defaultProps.onEdit).toBeDefined();
  });

  test("expected defaultProps", () => {
    const result = UserTable.defaultProps.onEdit();
    expect(result).toBe(undefined);
  });

  test("should have defaultProps onDelete", () => {
    expect(UserTable.defaultProps.onDelete).toBeDefined();
  });

  test("expected defaultProps", () => {
    const result = UserTable.defaultProps.onDelete();
    expect(result).toBe(undefined);
  });
});
