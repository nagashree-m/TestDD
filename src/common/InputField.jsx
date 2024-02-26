import React from "react";
import PropTypes from "prop-types";

const InputField = ({ name, placeholder, register, required }) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      {...register(name, { required })}
    />
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  required: false,
};

export default InputField;
