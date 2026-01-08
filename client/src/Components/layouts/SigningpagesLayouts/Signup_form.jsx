import React from "react";
import { motion } from "framer-motion";
import display_data from "../../InputElements.json";
import Terms_Conditions from "./Terms_Conditions";
import Already_have_account from "./Already_have_account";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Signup_input from "./Signup_input";

function Signup_form({
  signin,
  handle_form_submission,
  form_styles,
  head_styles,
  sub_head_style,
}) {
  const section = signin ? "signin" : "signup";
  const elements = display_data[section];
  const keys = Object.keys(elements);
  return (
    <form onSubmit={handle_form_submission} className={form_styles}>
      <Label text="Create Account" class_name={head_styles} />
      <Label
        text="Create your account and start your career journey"
        class_name={sub_head_style}
      />
      <div className="flex flex-col p-1 items-center justify-start gap-2 w-full h-50 overflow-y-auto">
        {keys.map((key, index) => {
          return (
            <Signup_input
              key={index}
              element={elements[key]}
              display_data={display_data}
            />
          );
        })}
      </div>
      <Terms_Conditions />
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: {
            ease: "easeInOut",
            duration: 0.2,
            type: "tween",
          },
        }}
        className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue"
      >
        <Button
          text="Register Now"
          type="submit"
          class_name="cursor-pointer w-full p-1.5 z-1"
        />
        {/* <Icon icon="ri-arrow-right-line" class_name="z-0" /> */}
      </motion.div>
      <Already_have_account />
    </form>
  );
}

export default Signup_form;
