import React from "react";

function ButtonPlain({
  onSelect,
  text,
  class_name = "px-2 py-1 cursor-pointer font-primary-1 text-light tracking-wider border border-lighter rounded-lg",
}) {
  return (
    <button onClick={() => onSelect(text)} className={`${class_name}`}>
      {text}
    </button>
  );
}

export default ButtonPlain;
