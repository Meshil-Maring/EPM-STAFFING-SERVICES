/**
 * SignupFormContext - Context provider for multi-step signup form management
 *
 * This context manages the state for the multi-step company registration form
 * including form data persistence across steps and current signup stage tracking.
 * It provides comprehensive form state management with sessionStorage persistence.
 */

import React, { createContext, useEffect, useState } from "react";

// context signup stage
export const signup_stage_context = createContext(null);

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
      return saved ? JSON.parse(saved) : ["account_credentials"];
    } catch (error) {
      console.warn("Error parsing saved stage data:", error);
      return ["account_credentials"];
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

  return (
    <signup_stage_context.Provider value={{ stage, setStage }}>
      {children}
    </signup_stage_context.Provider>
  );
}

export default SignupFormContext;
