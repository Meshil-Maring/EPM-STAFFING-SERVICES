import React from "react";

function Input({ placeholder, type, class_name }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${class_name}`}
      required
    />
  );
}

export default Input;
