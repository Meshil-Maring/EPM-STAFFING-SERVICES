import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";

function Signin_form({
  handle_form_submission,
  form_styles,
  head_styles,
  sub_head_style,
}) {
  const [btn_hover, setBtnHover] = useState(false);

  const handleForgotPassword = () => {
    alert("Request password");
  };
  const elements = display_data["signin"];
  const keys = Object.keys(elements);
  return (
    <form onSubmit={handle_form_submission} className={form_styles}>
      <Label text="Welcome back!" class_name={head_styles} />
      <Label
        text="Access your account and continue your journey with EMP Staffing Services"
        class_name={sub_head_style}
      />
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {/* imputs */}
        {keys.map((key, index) => {
          return (
            <Signin_input
              key={index}
              element={elements[key]}
              display_data={display_data}
            />
          );
        })}

        {/* forgot password */}
        <Button
          onClick={handleForgotPassword}
          text="Forgot password?"
          type="button"
          class_name="border-none hover:font-semibold transition-all duration-120 ease-in-out text-nevy_blue font-lighter ml-auto cursor-pointer "
        />
      </div>
      <motion.div
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        whileHover={{
          scale: btn_hover ? 1.02 : 1,
          text: btn_hover ? "bold" : "normal",
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
        className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue"
      >
        {/* login button */}
        <Button
          text="Login"
          type="submit"
          class_name="cursor-pointer w-full p-1 z-1 text-lg"
        />
      </motion.div>

      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <Label text="Don't have an account yet?" />
        <Link to={"/api/auth/signup"}>
          <Label
            text="Sign up"
            class_name="font-lighter text-nevy_blue border-b border-nevy_blue hover:font-bold transition-all duration-120 ease-in-out"
          />
        </Link>
      </div>
    </form>
  );
}

export default Signin_form;
