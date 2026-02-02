import React from "react";

function Button({
  type = "button",
  onclick,
  text,
  isSubmitting = false,
  bg = false,
  class_name = `${
    bg ? "bg-blue text-whiter" : ""
  }  rounded-small w-fit px-4 py-1`,
}) {
  return (
    <button
      disabled={isSubmitting}
      type={type}
      onClick={() => onclick(text)}
      className={`cursor-pointer hover:scale-[1.02] transition-all ease-in-out duration-120 ${class_name} `}
    >
      {text}
    </button>
  );
}

export default Button;
