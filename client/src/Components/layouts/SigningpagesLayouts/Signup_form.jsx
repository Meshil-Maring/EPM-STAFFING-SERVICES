import React from "react";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Link } from "react-router-dom";

function Signup_form({
  signin,
  handle_form_submission,
  form_styles,
  head_styles,
  sub_head_style,
}) {
  const handleForgotPassword = () => {
    alert("Request password");
  };
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
          return (
            <div
              key={index}
              className="flex flex-col items-start justify-center gap-1 w-full"
            >
              <Label
                class_name="text-sm text-text_l_b font-lighter"
                text={elements[key].label}
              />

              <div
                className={`w-full rounded-standard flex items-center justify-start`}
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
              </div>
            </div>
          );
        })}
        <div className="flex flex-row items-start text-xs gap-2 justify-start w-full">
          <Input type="checkbox" class_name="bg-input_cream" />
          <Label text="I accept the terms and comditions and agree to the terms of Privacy Policy" />
        </div>
      </div>
      <div className="w-full text-text_white flex flex-row items-center relative justify-center rounded-standard bg-nevy_blue">
        <Button
          text="Register Now"
          type="submit"
          class_name="cursor-pointer w-full border p-1.5 z-1"
        />
        <Icon
          icon="ri-arrow-right-line"
          class_name="absolute right-24 top-0 bottom-0 m-auto w-3 h-3 z-0"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-2 w-full">
        <Label text="Already have an account?" />
        <Link to={"/"}>
          <Label
            text="Log in"
            class_name="font-lighter text-sm text-nevy_blue border-b border-nevy_blue"
          />
        </Link>
      </div>
    </form>
  );
}

export default Signup_form;
