import React from "react";

function Button({ text, onSelect }) {
  return (
    <button
      onClick={() => onSelect(text)}
      className="px-2 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-gradient-btn"
    >
      {text}
    </button>
  );
}

export default Button;
