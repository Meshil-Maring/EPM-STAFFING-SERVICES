import React from "react";

function Button({
  type,
  onclick,
  text,
  bg = false,
  class_name = `${
    bg ? "bg-blue text-whiter" : ""
  }  rounded-small w-fit px-4 py-1`,
}) {
  return (
    <button
      onClick={() => onclick(text)}
      type={type}
      className={`cursor-pointer hover:font-semibold transition-all ease-in-out duration-120 ${class_name}`}
    >
      {text}
    </button>
  );
}

export default Button;
