import React, { useState, useEffect, useContext } from "react";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { signing_in_context } from "../../../context/SigningInDataContext";
import { Company_context } from "../../../context/AccountsContext";
import { LoggedCompanyContext } from "../../../context/LoggedCompanyContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Signin_form() {
  // Form styling classes for professional appearance
  const head_styles = "text-2xl font-bold w-full text-center text-gray-900";
  const sub_head_style = "text-sm font-medium text-center w-full text-gray-600";
  const form_styles =
    "w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6";

  // --- Hooks and Contexts ---
  const navigate = useNavigate();

  // signin_form contains the current live values of email/password from the inputs

  // companyAccounts contains the dummy object of all registered companies

  // LoggedCompany context for session storage
  const { setLoggedCompanyEmail } = useContext(LoggedCompanyContext);

  // Local state for handling login error messages
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // --- Authentication Handler ---
  const handle_form_submission = async (e) => {
    e.preventDefault(); // Stop page refresh

    if (!form.email || !form.password) {
      toast.error("Enter both email and password to continue...");
      return;
    }

    axios
      .post(".../api/auth/signin", userData)
      .then((response) => {
        setTimeout(() => {
          toast.success(response.data.message);
        }, 500);
        return toast.success("Welcome");
      })
      .catch((error) => {
        toast.error("Error sending data:", error);
      });
  };

  // --- Auxiliary Button Handler ---
  const handleClicking = (name) => {
    if (name === "Sign up") {
      const path = "/api/auth/signup";
      navigate(path);
    } else if (name === "Forgot password?") {
      // Logic for password recovery
      alert("Not yet implemented");
    }
  };

  // Form filling
  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Pulling structure for input fields from the JSON config
  const elements = display_data["signin"];
  const keys = Object.keys(elements);

  return (
    <form onSubmit={(e) => handle_form_submission(e)} className={form_styles}>
      <header className="flex flex-col gap-2 w-full">
        <Label text="Welcome back!" class_name={head_styles} />
        <Label
          text="Access your account and continue your journey with EPM Staffing Services"
          class_name={sub_head_style}
        />
      </header>

      {/* Conditional Rendering for Error Messages */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <fieldset className="w-full border-none p-0 m-0 flex flex-col gap-4">
          <legend className="sr-only">Login Credentials</legend>
          {/* Mapping through keys to render Email and Password inputs */}
          {keys.map((key) => (
            <Signin_input
              key={key}
              element={elements[key]}
              display_data={display_data}
              handleInputChange={handleInputChange}
            />
          ))}
        </fieldset>

        {/* Forgot Password Link styled as a Button */}
        <Button
          onclick={handleClicking}
          text="Forgot password?"
          type="button"
          class_name="border-none hover:text-blue-700 transition-colors text-nevy_blue text-sm font-medium ml-auto cursor-pointer p-0"
          aria-label="Recover forgotten password"
        />
      </div>

      {/* Main Submit Action */}
      <div className="w-full text-text_white flex flex-row items-center relative justify-center rounded-small bg-nevy_blue overflow-hidden">
        <button className="w-full flex" type="submit">
          <Label
            text="Login"
            class_name="cursor-pointer text-center w-full py-3 text-lg font-semibold"
          />
        </button>
      </div>

      {/* Footer: Redirection to Signup */}
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
