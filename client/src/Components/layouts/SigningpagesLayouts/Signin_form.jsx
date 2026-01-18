import React, { useState, useContext } from "react";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { signing_in_context } from "../../../context/SigningInDataContext";
import { useNavigate } from "react-router-dom";

function Signin_form() {
  const head_styles = "text-2xl font-semibold w-full text-center text-text_b";
  const sub_head_style = "text-sm font-normal text-center w-full text-text_b_l";
  const form_styles =
    "text-text_b font-poppins w-100 h-fit p-6 border border-border1 rounded-small flex flex-col items-center tracking-wide text-md justify-start gap-4 bg-white shadow-sm";

  const navigate = useNavigate();
  const { signin_form } = useContext(signing_in_context);
  const [error, setError] = useState("");
  const credintials = [
    {
      email: "client@gmail.com",
      password: "123",
    },
    {
      email: "admin@gmail.com",
      password: "123",
    },
  ];
  const handle_form_submission = (e) => {
    e.preventDefault();

    const matchedUser = credintials.find(
      (cred) => cred.email === signin_form.email,
    );

    if (matchedUser) {
      if (matchedUser.email.startsWith("client")) {
        const path = "/client/dashboard";
        navigate(path);
        alert("Welcome");
      } else if (matchedUser.email.startsWith("admin")) {
        const path = "/admin/management";
        navigate(path);
        alert("Welcome");
      }
    } else {
      setError("Wrong Credentials");
    }
  };

  const handleClicking = (name) => {
    if (name === "Sign up") {
      const path = "/api/auth/signup";
      navigate(path);
    } else if (name === "Forgot password?") {
      console.log("Request password reset");
    }
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
      {error && <p className="text-xs font-lighter text-red">{error}</p>}

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
          onclick={handleClicking}
          text="Forgot password?"
          type="button"
          class_name="border-none hover:text-blue-700 transition-colors text-nevy_blue text-sm font-medium ml-auto cursor-pointer p-0"
          aria-label="Recover forgotten password"
        />
      </div>

      <div className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue overflow-hidden">
        <Button
          onclick={""}
          text="Login"
          type="submit"
          class_name="cursor-pointer w-full py-3 text-lg font-semibold"
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-2 w-full pt-2">
        <Label text="Don't have an account yet?" class_name="text-sm" />
        <Button
          type={"button"}
          text={"Sign up"}
          onclick={handleClicking}
          class_name="font-semibold text-nevy_blue border-b border-nevy_blue hover:text-blue-700 transition-colors"
        />
      </div>
    </form>
  );
}

export default Signin_form;
