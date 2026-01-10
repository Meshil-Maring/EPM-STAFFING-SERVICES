import React, { useContext } from "react";
import { motion } from "framer-motion";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import { signup_form_data_context } from "../../../context/SigningupContext";

function Signup_input({ element, display_data }) {
  const { form, setForm } = useContext(signup_form_data_context);
  const handleChange = (e) => {};
  return (
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
        onchange={handleChange}
        placeholder={element.placeholder}
        type={element.type}
        class_name={display_data.input_element_styles}
      />
    </motion.div>
  );
}

export default Signup_input;
