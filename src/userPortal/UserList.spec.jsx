import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserList from "./UserList";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("render component", () => {
  test("renders UserList component", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: "Mocked User" }]));
    render(<UserList />);
    
  
    const mockedUser = await waitFor(() => screen.getByText("Mocked User"));

   
    expect(mockedUser).toBeInTheDocument();

 
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

  
    expect(screen.getByText("Edit User")).toBeInTheDocument();

 
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Edit User")).not.toBeInTheDocument();
  });
});
