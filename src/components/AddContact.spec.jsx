import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddContact from "./AddContact";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("AddContact Component", () => {
  test("renders AddContact component and adds a contact", async () => {
    const mockSetUsers = jest.fn();

    render(<AddContact setUsers={mockSetUsers} />);

    fireEvent.change(screen.getByPlaceholderText("Enter a name..."), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter an address..."), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter a phone number..."), {
      target: { value: "555-1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter an email..."), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/users",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John Doe",
            address: "123 Main St",
            phone: "555-1234",
            email: "john.doe@example.com",
          }),
        })
      );
    });

    expect(mockSetUsers).toHaveBeenCalledWith(expect.any(Function));
    mockSetUsers((prevUsers) => {
      expect(prevUsers).toEqual([]);
      return [
        ...prevUsers,
        {
          name: "John Doe",
          address: "123 Main St",
          phone: "555-1234",
          email: "john.doe@example.com",
        },
      ];
    });

    // expect(mockSetUsers).toHaveBeenCalledWith((prevUsers) =>
    //   expect(prevUsers).toEqual([])
    // );

    // expect(mockSetUsers).toHaveBeenCalledWith((prevUsers) =>
    //   expect(prevUsers).toEqual([
    //     {
    //       name: "John Doe",
    //       address: "123 Main St",
    //       phone: "555-1234",
    //       email: "john.doe@example.com",
    //     },
    //   ])
    // );

    expect(screen.getByPlaceholderText("Enter a name...")).toHaveValue("");
    expect(screen.getByPlaceholderText("Enter an address...")).toHaveValue("");
    expect(screen.getByPlaceholderText("Enter a phone number...")).toHaveValue(
      ""
    );
    expect(screen.getByPlaceholderText("Enter an email...")).toHaveValue("");
  });

  test("should have defaultProps setUsers", () => {
    expect(AddContact.defaultProps.setUsers).toBeDefined();
  });

  test("expected defaultProps", () => {
    const result = AddContact.defaultProps.setUsers();
    expect(result).toBe(undefined);
  });
});
