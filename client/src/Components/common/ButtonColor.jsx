import React from "react";

function Button({
  text,
  onSelect,
  class_name = "px-2 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn",
}) {
  return (
    <button onClick={() => onSelect(text)} className={`${class_name}`}>
      {text}
    </button>
  );
}

export default Button;
