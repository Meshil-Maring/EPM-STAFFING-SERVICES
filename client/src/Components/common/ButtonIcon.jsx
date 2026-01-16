import React, { useState } from "react";
import Icon from "./Icon";
import Label from "./Label";

function ButtonIcon({
  text,
  icon,
  id,
  onSelect,
  clicked,
  set_gradient = false,
  shadow = false,
  class_name = "",
  className = `items-center justify-start w-full py-1 px-4 rounded-small ${class_name} ${
    id === "nav" ? `cursor-pointer` : ""
  } flex gap-1 ${
    clicked || set_gradient
      ? `bg-g_btn text-whiter`
      : "border border-lighter text-primary hover:bg-lighter"
  } ${shadow ? "shadow-heavy" : ""}`,
}) {
  return (
    <div
      onClick={() => onSelect(text)}
      className={`${className} ${
        text === "Settings"
          ? "after:w-full after:absolute after:-top-3 relative after:left-0 after:border-t after:border-lighter"
          : ""
      }`}
    >
      <Icon icon={icon} class_name="" />
      <Label text={text} />
    </div>
  );
}

export default ButtonIcon;
