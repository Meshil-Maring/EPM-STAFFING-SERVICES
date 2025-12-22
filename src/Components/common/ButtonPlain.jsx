import React from "react";

function ButtonPlain({ onSelect, text }) {
  return (
    <button
      onClick={onSelect}
      className="px-2 py-1 font-primary-1 text-light tracking-wider border border-lighter rounded-lg"
    >
      {text}
    </button>
  );
}

export default ButtonPlain;
