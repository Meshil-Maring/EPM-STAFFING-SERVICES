import React, { useState } from "react";
import Icon from "./Icon";
import Label from "./Label";
import { motion } from "framer-motion";

function ButtonIcon({
  text,
  icon,
  id,
  onSelect,
  clicked,
  set_gradient = false,
  shadow = false,
  class_name = `items-center justify-start w-full py-1 px-4 rounded-small ${
    id === "nav" ? `cursor-pointer` : ""
  } flex gap-1 ${
    clicked || set_gradient
      ? `bg-gradient-btn text-whiter`
      : "border border-lighter text-primary hover:bg-lighter"
  } ${shadow ? "shadow-heavy" : ""}`,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.05 : 1,
        transition: { type: "tween", duration: 0.2 },
      }}
      onClick={() => onSelect(text)}
      className={`${class_name}`}
    >
      <Icon icon={icon} class_name="text-lg" />
      <Label text={text} />
    </motion.div>
  );
}

export default ButtonIcon;
