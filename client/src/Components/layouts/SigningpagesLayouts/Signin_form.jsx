import React, { useState, useEffect, useContext } from "react";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { signing_in_context } from "../../../context/SigningInDataContext";
import { Company_context } from "../../../context/AccountsContext";
import { useNavigate } from "react-router-dom";

function Signin_form() {
  // --- Styling Constants ---
  const head_styles = "text-2xl font-semibold w-full text-center text-text_b";
  const sub_head_style = "text-sm font-normal text-center w-full text-text_b_l";
  const form_styles =
    "text-text_b font-poppins w-100 h-fit p-6 border border-border1 rounded-small flex flex-col items-center tracking-wide text-md justify-start gap-4 bg-white shadow-sm";

  // --- Hooks and Contexts ---
  const navigate = useNavigate();

  // signin_form contains the current live values of email/password from the inputs
  const { signin_form } = useContext(signing_in_context);

  // companyAccounts contains the dummy object of all registered companies
  const { companyAccounts } = useContext(Company_context);

  // Local state for handling login error messages
  const [error, setError] = useState("");

  // Get the keys (e.g., "company-1", "company-2") to iterate over the accounts object
  const companyKeys = Object.keys(companyAccounts);

  // --- Authentication Handler ---
  const handle_form_submission = (e) => {
    e.preventDefault(); // Stop page refresh

    // Search through the accounts to find a match for both email and password
    const isClient = companyKeys.find(
      (key) =>
        companyAccounts[key].email === signin_form.email &&
        companyAccounts[key].password === signin_form.password,
    );

    if (isClient) {
      // If a match is found, clear errors and navigate to the dashboard
      setError("");
      const path = "/client/dashboard";
      navigate(path);
      alert("Welcome");
    } else {
      // If no match is found, update the UI with an error message
      setError("Wrong Credentials");
    }
  };

  // --- Auxiliary Button Handler ---
  const handleClicking = (name) => {
    if (name === "Sign up") {
      const path = "/api/auth/signup";
      navigate(path);
    } else if (name === "Forgot password?") {
      // Logic for password recovery
      alert("Request password reset");
    }
  };

  // Pulling structure for input fields from the JSON config
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

      {/* Conditional Rendering for Error Messages */}
      {error && <p className="text-xs font-lighter text-red-500">{error}</p>}

      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <fieldset className="w-full border-none p-0 m-0 flex flex-col gap-4">
          <legend className="sr-only">Login Credentials</legend>
          {/* Mapping through keys to render Email and Password inputs */}
          {keys.map((key) => (
            <Signin_input
              key={key}
              element={elements[key]}
              display_data={display_data}
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
        <Button
          onclick={""} // Empty string because the form 'onSubmit' handles the logic
          text="Login"
          type="submit"
          class_name="cursor-pointer w-full py-3 text-lg font-semibold"
        />
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
