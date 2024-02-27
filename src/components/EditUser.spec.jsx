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
    jest.useFakeTimers(); 
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();
  
    const {getByTestId}= render(
      <EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />
    );

    fireEvent.click(screen.getByTestId("save"));
    jest.advanceTimersByTime(0);
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

  test("calls handleFieldChange when input field value changes",async () => {
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    const {getByTestId,getByLabelText}= render(
      <EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />
    );
    fireEvent.change(getByLabelText("Name"), {
      target: { value: "New Name" },
    });

    fireEvent.click(getByTestId("save"));


    await waitFor(() => {
      expect(mockSetUsers).toHaveBeenCalledWith(expect.any(Function));
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

  test("calls handleSave and updates user data on successful API response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: "New Name", address: "Updated Address", phone: "555-5678", email: "new@example.com" }),
    });

    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(<EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "New Name" } });
    fireEvent.change(screen.getByLabelText("Address"), { target: { value: "Updated Address" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "555-5678" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "new@example.com" } });
    fireEvent.click(screen.getByTestId("save"));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/users/${mockUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          name: "New Name",
          address: "Updated Address",
          phone: "555-5678",
          email: "new@example.com",
        }),
      });
      expect(mockSetUsers).toHaveBeenCalledWith(expect.any(Function));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    jest.restoreAllMocks();
  });

  test("handles error and logs message on failed API response", async () => {
    jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Failed to update user data"));
    const mockErrorLog = jest.spyOn(console, "error").mockImplementation(() => {});

    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(<EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />);
    fireEvent.click(screen.getByTestId("save"));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/users/${mockUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          name: mockUser.name,
          address: mockUser.address,
          phone: mockUser.phone,
          email: mockUser.email,
        }),
      });
      expect(mockErrorLog).toHaveBeenCalledWith("Error saving user data:", expect.any(Error));
      expect(mockSetUsers).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    jest.restoreAllMocks();
  });

  test("handles error and logs message on failed API response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500, 
    });
    const mockErrorLog = jest.spyOn(console, "error").mockImplementation(() => {});

    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();

    render(<EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />);
    fireEvent.click(screen.getByTestId("save"));

    await waitFor(() => {

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/users/${mockUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          name: mockUser.name,
          address: mockUser.address,
          phone: mockUser.phone,
          email: mockUser.email,
        }),
      });
      expect(mockErrorLog).toHaveBeenCalledWith("Error saving user data:", expect.any(Error));
      expect(mockSetUsers).not.toHaveBeenCalled();
      expect(mockOnClose).not.toHaveBeenCalled(); 
    });

    jest.restoreAllMocks();
  });

  test("calls handleSave and updates user data on successful API response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: "New Name", address: "Updated Address", phone: "555-5678", email: "new@example.com" }),
    });
  
    const mockOnClose = jest.fn();
    const mockSetUsers = jest.fn();
  
    render(<EditUser user={mockUser} onClose={mockOnClose} setUsers={mockSetUsers} />);
  
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "New Name" } });
    fireEvent.change(screen.getByLabelText("Address"), { target: { value: "Updated Address" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "555-5678" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "new@example.com" } });
  
    fireEvent.click(screen.getByTestId("save"));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3001/users/${mockUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          name: "New Name",
          address: "Updated Address",
          phone: "555-5678",
          email: "new@example.com",
        }),
      });
  
      expect(mockSetUsers).toHaveBeenCalledWith(expect.any(Function));
      const setUsersCallback = mockSetUsers.mock.calls[0][0];
      const mockPrevUsers = [
        { id: 1, name: "John Doe", address: "123 Main St", phone: "555-1234", email: "john@example.com" },
      ];
      const updatedUsers = setUsersCallback(mockPrevUsers);
      const updatedUser = updatedUsers.find(user => user.id === 1);
      expect(updatedUser).toEqual({
        id: 1,
        name: "New Name",
        address: "Updated Address",
        phone: "555-5678",
        email: "new@example.com",
      });
  
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    jest.restoreAllMocks();
  })
});
