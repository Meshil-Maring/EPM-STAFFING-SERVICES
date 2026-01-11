import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import display_data from "../../InputElements.json";
import Terms_Conditions from "./Terms_Conditions";
import Already_have_account from "./Already_have_account";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Signup_input from "./Signup_input";
import { signup_form_data_context } from "../../../context/SigningupContext";
import axios from "axios";

function Signup_form({ form_styles, head_styles, sub_head_style }) {
  const { form } = useContext(signup_form_data_context);
  const [error, setError] = useState("");
  const elements = display_data["signup"];
  const keys = Object.keys(elements);
  const handleSigningup = (e) => {
    e.preventDefault();
    const emptyKeys = Object.keys(form).filter((key) => !form[key]);
    if (emptyKeys) {
      setError("All fields must be filled");
      return;
    } else if (elements.password != elements.confirm_password) {
      setError(`Passwords don't match`);
    }
    setError("");
    axios
      .post("api", form)
      .then((response) => console.log(response))
      .catch((err) => console.log(`Error: ${err}`));
  };

  return (
    <form onSubmit={handleSigningup} className={form_styles}>
      <Label text="Create Account" class_name={head_styles} />
      <Label
        text="Create your account and start your career journey"
        class_name={sub_head_style}
      />
      {error != "" && (
        <Label
          text={error}
          class_name="text-red-500 font-lighter text-xs w-full text-center"
        />
      )}
      <div className="flex flex-col p-1 items-center justify-start gap-2 w-full h-52 overflow-y-auto">
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
      </motion.div>
      <Already_have_account />
    </form>
  );
}

export default Signup_form;
