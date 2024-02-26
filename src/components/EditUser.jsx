import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Fade,
  TextField,
} from "@mui/material";

const EditUser = ({ user, onClose, setUsers }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleClose = () => {
    onClose();
  };

  const handleFieldChange = (field, value) => {
    setEditedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${editedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const updatedUserData = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser.id === updatedUserData.id ? updatedUserData : prevUser
        )
      );
      onClose();
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const renderTextField = (label, field) => (
    <TextField
      label={label}
      value={editedUser[field]}
      onChange={(e) => handleFieldChange(field, e.target.value)}
      fullWidth
      margin="normal"
    />
  );

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      BackdropComponent={Backdrop}
    >
      <Fade in={true}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Edit User Information
          </Typography>
          {renderTextField("Name", "name")}
          {renderTextField("Address", "address")}
          {renderTextField("Phone", "phone")}
          {renderTextField("Email", "email")}
          <Box mt={1} gap={3} display="flex" alignItems="center" p={0}>
            <button variant="contained" color="primary" onClick={handleSave}>
              Save
            </button>
            <button variant="contained" color="default" onClick={handleCancel}>
              Cancel
            </button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

EditUser.defaultProps = {
  user: {},
  onClose: () => {},
  setUsers: () => {},
};

export default EditUser;
