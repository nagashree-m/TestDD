import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserList from "./UserList";

describe("UserList Component", () => {
  // it("renders user list with data", async () => {
  //   render(<UserList />);
  //   await waitFor(() => {
  //     expect(screen.getByText("Name")).toBeInTheDocument();
  //     expect(screen.getByText("Address")).toBeInTheDocument();
  //     expect(screen.getByText("Phone Number")).toBeInTheDocument();
  //     expect(screen.getByText("Email")).toBeInTheDocument();
  //   });
  //   expect(screen.getByText("John Doe")).toBeInTheDocument();
  // });

  it("handles user edit and delete", async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
      })
    );
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: "Updated User" }),
      })
    );
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Edit User")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated User" },
    });
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(screen.queryByText("Edit User")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Updated User")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(screen.queryByText("Updated User")).not.toBeInTheDocument();
    });
  });
});
