import React from "react";
import { Link } from "react-router-dom";
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
  const handleForgotPassword = () => {
    console.log("Request password reset");
  };

  const elements = display_data["signin"];
  const keys = Object.keys(elements);

  return (
    <form onSubmit={handle_form_submission} className={form_styles} noValidate>
      <header className="flex flex-col gap-2 w-full">
        <Label text="Welcome back!" class_name={head_styles} />
        <Label
          as="p"
          text="Access your account and continue your journey with EMP Staffing Services"
          class_name={sub_head_style}
        />
      </header>

      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <fieldset className="w-full border-none p-0 m-0 flex flex-col gap-4">
          <legend className="sr-only">Login Credentials</legend>
          {keys.map((key) => (
            <Signin_input
              key={key}
              element={elements[key]}
              display_data={display_data}
            />
          ))}
        </fieldset>

        <Button
          onClick={handleForgotPassword}
          text="Forgot password?"
          type="button"
          class_name="border-none hover:text-blue-700 transition-colors text-nevy_blue text-sm font-medium ml-auto cursor-pointer p-0"
          aria-label="Recover forgotten password"
        />
      </div>

      <div className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue overflow-hidden">
        <Button
          text="Login"
          type="submit"
          class_name="cursor-pointer w-full py-3 text-lg font-semibold"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-2 w-full pt-2">
        <Label text="Don't have an account yet?" class_name="text-sm" />
        <Link
          to="/auth/signup"
          className="focus:outline-none focus-visible:underline"
        >
          <Label
            text="Sign up"
            class_name="font-semibold text-nevy_blue border-b border-nevy_blue hover:text-blue-700 transition-colors"
          />
        </Link>
      </div>
    </form>
  );
}

export default Signin_form;
