import React from "react";

function Button({ type = "button", onclick, text, class_name }) {
  return (
    <button
      type={type}
      onClick={() => onclick(text)}
      className={`cursor-pointer hover:scale-[1.02] transition-all ease-in-out duration-120 ${class_name} `}
    >
      {text}
    </button>
  );
}

export default Button;
