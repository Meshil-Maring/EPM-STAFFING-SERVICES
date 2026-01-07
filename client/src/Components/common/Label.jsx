import React from "react";
import { motion } from "framer-motion";

function Label({ class_name, text }) {
  return (
    <motion.p
      initial={{
        opacity: 0,
        scale: -0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { type: "spring", duration: 1, delay: 0.1, stiffness: 60 },
      }}
      className={class_name}
    >
      {text}
    </motion.p>
  );
}

export default Label;
