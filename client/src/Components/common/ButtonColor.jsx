import React from "react";

function Button({ text, onSelect, class_name }) {
  return (
    <button onClick={() => onSelect(text)} className={`${class_name}`}>
      {text}
    </button>
  );
}

export default Button;
