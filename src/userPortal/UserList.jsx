import React, { useState, useEffect } from "react";
import EditUser from "../components/EditUser";
import "../Styles/UserList.scss";
import AddContact from "../components/AddContact";
import UserTable from "../common/UserTable";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users", error));
  }, [users]);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users?.filter((user) => user?.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleModalClose = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <div className="userlist-container">
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        {editingUser && (
          <EditUser
            user={editingUser}
            onClose={handleModalClose}
            setUsers={setUsers}
          />
        )}
      </div>
      <AddContact setUsers={setUsers} />
    </div>
  );
};

export default UserList;
