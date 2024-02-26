import React from "react";
import { useForm } from "react-hook-form";
import "../Styles/AddContact.scss";
import PropTypes from "prop-types";
import InputField from "../common/InputField";

const AddContact = ({ setUsers }) => {
  const { register, handleSubmit, reset } = useForm();

  const inputFields = [
    { name: "name", placeholder: "Enter a name...", required: true },
    { name: "address", placeholder: "Enter an address...", required: true },
    {
      name: "phone",
      placeholder: "Enter a phone number...",
      required: true,
    },
    { name: "email", placeholder: "Enter an email...", required: true },
  ];

  const onSubmit = async (data) => {
    try {
      const newContact = { ...data };
      setUsers((prevContacts) => [...prevContacts, newContact]);
      reset();
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="addContact-container">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            register={register}
            required={field.required}
          />
        ))}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

AddContact.propTypes = {
  setUsers: PropTypes.func.isRequired,
};

AddContact.defaultProps = {
  setUsers: () => {},
};

export default AddContact;
