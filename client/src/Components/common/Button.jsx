import React from "react";

function Button({
  type,
  text,
  bg = false,
  class_name = `${
    bg ? "bg-blue text-whiter" : ""
  } border rounded-lg w-fit px-4 py-1`,
}) {
  return (
    <button type={type} className={`cursor-pointer ${class_name}`}>
      {text}
    </button>
  );
}

export default Button;
