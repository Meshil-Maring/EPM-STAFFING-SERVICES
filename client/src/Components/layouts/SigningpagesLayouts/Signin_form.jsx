import React, { useState } from "react";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Signin_form({
  signin,
  handle_form_submission,
  form_styles,
  head_styles,
  sub_head_style,
}) {
  const [btn_hover, setBtnHover] = useState(false);
  const handleForgotPassword = () => {
    alert("Request password");
  };
  const section = signin ? "signin" : "signup";
  const elements = display_data[section];
  const keys = Object.keys(elements);
  return (
    <form onSubmit={handle_form_submission} className={form_styles}>
      <Label text="Welcome back!" class_name={head_styles} />
      <Label
        text="Access your account and continue your journey with EMP Staffing Services"
        class_name={sub_head_style}
      />
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {keys.map((key, index) => {
          const [hover, setHover] = useState(false);
          return (
            <div
              key={index}
              className="flex flex-col items-start justify-center gap-1 w-full"
            >
              <Label
                class_name="text-sm text-text_l_b font-lighter"
                text={elements[key].label}
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
                whileHover={{
                  scale: hover ? 1.05 : 1,
                  transition: {
                    ease: "easeInOut",
                    duration: 0.2,
                    type: "tween",
                  },
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={`w-full rounded-small flex items-center justify-start relative`}
              >
                <Icon
                  icon={elements[key].icon}
                  class_name={display_data.icon_styles}
                />
                <Input
                  placeholder={elements[key].placeholder}
                  type={elements[key].type}
                  class_name={display_data.input_element_styles}
                />
              </motion.div>
            </div>
          );
        })}
        <Button
          onClick={handleForgotPassword}
          text="Forgot password?"
          type="button"
          class_name="border-none hover:font-semibold transition-all duration-120 ease-in-out text-xs text-nevy_blue font-lighter ml-auto cursor-pointer "
        />
      </div>
      <motion.div
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        whileHover={{
          scale: btn_hover ? 1.05 : 1,
          text: btn_hover ? "bold" : "normal",
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
        className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue"
      >
        <Button
          text="Login"
          type="submit"
          class_name="cursor-pointer w-full p-2 z-1"
        />
        {/* <Icon
          icon="ri-arrow-right-line"
          class_name="absolute right-32 top-0 bottom-0 m-auto w-3 h-3 z-0"
        /> */}
      </motion.div>
      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <Label text="Don't have an account yet?" />
        <Link to={"Signup"}>
          <Label
            text="Sign up"
            class_name="font-lighter text-sm text-nevy_blue border-b border-nevy_blue hover:font-bold transition-all duration-120 ease-in-out"
          />
        </Link>
      </div>
    </form>
  );
}

export default Signin_form;
