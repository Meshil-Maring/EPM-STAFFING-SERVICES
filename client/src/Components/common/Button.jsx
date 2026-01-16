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
  const handleButtonClick = () => {
    const isFunction = onclick ?? false;
    isFunction ? onclick(text) : "";
  };
  return (
    <button
      onClick={handleButtonClick}
      type={type}
      className={`cursor-pointer hover:scale-[1.05] transition-all ease-in-out duration-120 ${class_name}`}
    >
      {text}
    </button>
  );
}

export default Button;
