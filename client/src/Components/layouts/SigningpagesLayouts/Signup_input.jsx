import React, { useContext } from "react";
import { motion } from "framer-motion";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import Label from "../../common/Label";
import { signup_form_data_context } from "../../../context/SigningupDataContext";

function Signup_input({ element, display_data, id }) {
  const { setForm } = useContext(signup_form_data_context);

  const handleChange = (value, id) => {
    console.log(`The value is: ${value} and the id is: ${id}`);
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <Label
        as="label"
        htmlFor={element.id}
        text={element.label}
        class_name="sr-only"
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
        className="w-full flex items-center justify-center relative group"
      >
        <div className="absolute left-0 flex items-center pointer-events-none z-10 text-text_l_b group-focus-within:text-nevy_blue transition-colors">
          <Icon icon={element.icon} class_name={display_data.icon_styles} />
        </div>

        <Input
          id={id}
          autoComplete={element.type === "password" ? "new-password" : "on"}
          onchange={handleChange}
          placeholder={element.placeholder}
          type={element.type}
          class_name={`${display_data.input_element_styles} pl-10 w-full focus:ring-2 focus:ring-nevy_blue outline-none border-border1 focus:border-nevy_blue transition-all`}
        />
      </motion.div>
    </div>
  );
}

export default Signup_input;
