import React from "react";

function Button({ type, text, bg = false }) {
  return (
    <button
      type={type}
      className={`${
        bg ? "bg-blue text-whiter" : ""
      } border rounded-lg w-fit px-4 py-1`}
    >
      {text}
    </button>
  );
}

export default Button;
