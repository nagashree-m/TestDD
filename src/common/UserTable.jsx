import React from "react";
import UserActions from "../components/UserActions";
import "../Styles/UserList.scss";
import "../Styles/UserActions.scss";
import PropTypes from "prop-types";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="tablelist">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <UserActions user={user} onEdit={onEdit} onDelete={onDelete} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

UserTable.defaultProps = {
  users: [],
  onEdit: () => {},
  onDelete: () => {},
};

export default UserTable;
