import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../common/Icon";

const Arrow = ({ icon, id, onArrowClick }) => {
  const [hovered, setHovered] = useState(false);
  const isRight = id === "right";

  return (
    <motion.div
      onClick={() => onArrowClick(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ x: hovered ? (isRight ? [2, 0, 2] : [-2, 0, -2]) : [0, 0] }}
      transition={{
        ease: "easeInOut",
        type: "tween",
        repeat: Infinity,
        duration: 0.5,
      }}
      className="h-5 w-5 cursor-pointer flex items-center justify-center"
    >
      <Icon
        icon={icon}
        class_name="flex items-center justify-center w-full h-full"
      />
    </motion.div>
  );
};

export default Arrow;
