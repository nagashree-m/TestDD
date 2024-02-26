import reducer from "./reducer";

describe("setUsers reducer", () => {
  it("it should handle setUsers action", () => {
    const initialState = {
      users: [],
    };

    const action = {
      type: "SET_USERS",
      payload: [
        {
          id: 1,
          name: "John Doe",
          address: "123 Main St",
          phone: "555-1234",
          email: "john@example.com",
        },
      ],
    };
    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      users: [
        {
          id: 1,
          name: "John Doe",
          address: "123 Main St",
          phone: "555-1234",
          email: "john@example.com",
        },
      ],
    });
  });
});
