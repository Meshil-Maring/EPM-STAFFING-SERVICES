import React from "react";

function TextInput({ onChange, placeholder = "I am waiting for input" }) {
  return (
    <input
      onChange={onChange}
      type="text"
      className="px-4 py-1 border text-sm border-lighter w-80 rounded-lg tracking-wide focus:ring-1 focus:ring-lighter focus:outline-none"
      placeholder={`Eg. ${placeholder}`}
    />
  );
}

export default TextInput;
