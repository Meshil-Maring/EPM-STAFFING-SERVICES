import React from "react";
import { motion } from "framer-motion";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Input from "../../common/Input";

function Signin_input({ element, display_data }) {
  return (
    <div className="flex flex-col items-start justify-center gap-1 w-full">
      <Label
        class_name="text-sm text-text_l_b font-lighter"
        text={element.label}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 75,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 1, delay: 0.1 },
        }}
        className={`w-full rounded-small flex items-center justify-start relative`}
      >
        <Icon icon={element.icon} class_name={display_data.icon_styles} />
        <Input
          placeholder={element.placeholder}
          type={element.type}
          class_name={display_data.input_element_styles}
        />
      </motion.div>
    </div>
  );
}

export default Signin_input;
