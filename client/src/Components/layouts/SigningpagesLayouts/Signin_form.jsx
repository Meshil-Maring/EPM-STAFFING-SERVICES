import React, { useState, useEffect, useContext } from "react";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { signing_in_context } from "../../../context/SigningInDataContext";
import { Company_context } from "../../../context/AccountsContext";
import { LoggedCompanyContext } from "../../../context/LoggedCompanyContext";
import { useNavigate } from "react-router-dom";

/**
 * Signin Form Component
 * Handles user authentication with form validation and error handling
 */
function Signin_form() {
  // Form styling classes for professional appearance
  const head_styles = "text-2xl font-bold w-full text-center text-gray-900";
  const sub_head_style = "text-sm font-medium text-center w-full text-gray-600";
  const form_styles =
    "w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6";

  // --- Hooks and Contexts ---
  const navigate = useNavigate();

  // signin_form contains the current live values of email/password from the inputs
  const { signin_form } = useContext(signing_in_context);

  // companyAccounts contains the dummy object of all registered companies
  const { companyAccounts } = useContext(Company_context);

  // LoggedCompany context for session storage
  const { setLoggedCompany } = useContext(LoggedCompanyContext);

  // Local state for handling login error messages
  const [error, setError] = useState({
    type: "",
    text: "",
  });

  // Get the keys (e.g., "company-1", "company-2") to iterate over the accounts object
  const companyKeys = Object.keys(companyAccounts);

  // handles settings the error
  const setting_error = (typ, val) => {
    setTimeout(() => {
      setError({ type: typ, text: val });
      setTimeout(() => {
        setError({ type: "", text: "" });
      }, [2000]);
    }, []);
  };

  // --- Authentication Handler ---
  const handle_form_submission = (e) => {
    e.preventDefault(); // Stop page refresh

    const signing_email = signin_form.email;
    const signing_password = signin_form.password;
    if (!signing_email || !signing_password) {
      setting_error("error", "Enter email and password to continue...");
      return;
    }
    // Search through the accounts to find a match for both email and password
    const isClient = companyKeys.find(
      (key) =>
        companyAccounts[key].email === signing_email &&
        companyAccounts[key].password === signing_password,
    );

    if (isClient) {
      // If a match is found, clear errors and navigate to the dashboard
      setTimeout(() => {
        setError({ type: "success", text: "Logging in..." });
        setTimeout(() => {
          setError({ type: "", text: "" });
          setLoggedCompany(companyAccounts[isClient]);
          const path = "/client/dashboard";
          navigate(path);
        }, [2500]);
      }, []);
    } else {
      // If no match is found, update the UI with an error message
      setting_error("error", "Wrong Credentials");
    }
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

  // Pulling structure for input fields from the JSON config
  const elements = display_data["signin"];
  const keys = Object.keys(elements);

  return (
    <form
      onSubmit={(e) => handle_form_submission(e)}
      className={form_styles}
      noValidate
    >
      <header className="flex flex-col gap-2 w-full">
        <Label text="Welcome back!" class_name={head_styles} />
        <Label
          text="Access your account and continue your journey with EPM Staffing Services"
          class_name={sub_head_style}
        />
      </header>

      {/* Conditional Rendering for Error Messages */}
      {error.text !== "" && (
        <p
          className={`text-sm font-semibold ${error.type === "error" ? "text-red-500" : "text-text_green"}`}
        >
          {error.text}
        </p>
      )}

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
