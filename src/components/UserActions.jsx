import React from "react";
import "../Styles/UserActions.scss";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import PropTypes from "prop-types";

const UserActions = ({ user, onEdit, onDelete }) => {
  const largeIconSize = 20;
  return (
    <div className="userActions-container">
      <MdEdit
        data-testid="edit-icon"
        onClick={() => onEdit(user)}
        size={largeIconSize}
        style={{cursor:'pointer'}}
      />
      <AiFillDelete
        data-testid="delete-icon"
        onClick={() => onDelete(user.id)} 
        size={largeIconSize}
      />
    </div>
  );
};

UserActions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

UserActions.defaultProps = {
  user: {},
  onEdit: () => {},
  onDelete: () => {},
};
export default UserActions;
