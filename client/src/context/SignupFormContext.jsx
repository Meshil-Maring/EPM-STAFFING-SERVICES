/**
 * SignupFormContext - Context provider for multi-step signup form management
 *
 * This context manages the state for the multi-step company registration form
 * including form data persistence across steps and current signup stage tracking.
 * It provides comprehensive form state management with sessionStorage persistence.
 */

import React, { createContext, useEffect, useState } from "react";

// Create contexts for form data and signup stage
export const signup_form_context = createContext(null);
export const signup_stage_context = createContext(null);

/**
 * Default form data structure for company registration
 */
const data = {
  email: "",
  password: "",
  confirm_password: "",
  recovery_email: "",
  company_name: "",
  industry_type: "",
  registration_number: "",
  description: "",
  mobile_number: "",
  contact_information: [],
  address: "",
  city: "",
  state: "",
  pin_code: "",
  terms: false,
};

/**
 * SignupFormContext provider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with signup form state management
 */
function SignupFormContext({ children }) {
  // Initialize signup stage from sessionStorage
  const [stage, setStage] = useState(() => {
    try {
      const saved = sessionStorage.getItem("signup_stage");
      return saved ? JSON.parse(saved) : ["signup_form"];
    } catch (error) {
      console.warn("Error parsing saved stage data:", error);
      return ["signup_form"];
    }
  });

  // Initialize form data from sessionStorage
  const [form, setForm] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("signup_form"));
      return saved
        ? typeof saved === "string"
          ? JSON.parse(saved)
          : saved
        : data;
    } catch (error) {
      console.warn("Error parsing saved form data:", error);
      return data;
    }
  });

  // Keep sessionStorage in sync for signup stage
  useEffect(() => {
    try {
      sessionStorage.setItem("signup_stage", JSON.stringify(stage));
    } catch (error) {
      console.warn("Error saving stage data:", error);
    }
  }, [stage]);

  // Keep sessionStorage in sync for form data
  useEffect(() => {
    try {
      const string = JSON.stringify(form);
      sessionStorage.setItem("signup_form", string);
    } catch (error) {
      console.warn("Error saving form data:", error);
    }
  }, [form]);

  /**
   * Clear form data and remove from sessionStorage
   */
  const clearForm = () => {
    setForm(data);
    sessionStorage.removeItem("signup_form");
  };

  return (
    <signup_stage_context.Provider value={{ stage, setStage }}>
      <signup_form_context.Provider value={{ form, setForm, clearForm }}>
        {children}
      </signup_form_context.Provider>
    </signup_stage_context.Provider>
  );
}

export default SignupFormContext;
