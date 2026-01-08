import React, { useState } from "react";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Signup_form({
  signin,
  handle_form_submission,
  form_styles,
  head_styles,
  sub_head_style,
}) {
  const [spanHover, setSpanHover] = useState(false);
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
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        {keys.map((key, index) => {
          const [hover, setHover] = useState(false);
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
              whileHover={{
                scale: hover ? 1.05 : 1,
                transition: {
                  ease: "easeInOut",
                  duration: 0.2,
                  type: "tween",
                },
              }}
              key={index}
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
          );
        })}
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
          className="flex flex-row items-start text-xs gap-2 justify-start w-full"
        >
          <Input type="checkbox" class_name="bg-input_cream" />
          <div>
            <p>
              I accept the{" "}
              <a
                className="text-nevy_blue font-semibold hover:underline transition-all ease-in-out"
                href="#"
              >
                terms and conditions
              </a>{" "}
              and agree to the terms of{" "}
              <a
                href="#"
                className="text-nevy_blue font-semibold hover:underline transition-all ease-in-out"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>
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
      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <Label text="Already have an account?" />
        <Link to={"/"}>
          <motion.span
            whileHover={{
              scale: spanHover ? 1.08 : 1,

              transition: {
                ease: "easeInOut",
                duration: 0.2,
                type: "tween",
              },
            }}
            onMouseEnter={() => setSpanHover(true)}
            onMouseLeave={() => setSpanHover(false)}
            className="cursor-pointer"
          >
            <Label
              text="Log in"
              class_name="font-semibold hover:font-bold transition-all ease-in-out duration-120 text-sm text-nevy_blue border-b border-nevy_blue"
            />
          </motion.span>
        </Link>
      </div>
    </form>
  );
}

export default Signup_form;
