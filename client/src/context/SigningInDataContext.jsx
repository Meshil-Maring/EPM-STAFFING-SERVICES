import React, { createContext, useState, useEffect } from "react";

export const signing_in_context = createContext(null);

function SigningInDataContext({ children }) {
  const [signin_form, set_signin_form] = useState(() => {
    const savedForm = sessionStorage.getItem("emp_signin_data");
    return savedForm ? JSON.parse(savedForm) : { email: "", password: "" };
  });

  useEffect(() => {
    sessionStorage.setItem("emp_signin_data", JSON.stringify(signin_form));
  }, [signin_form]);

  const clearSession = () => {
    set_signin_form({ email: "", password: "" });
    sessionStorage.removeItem("emp_signin_data");
  };

  return (
    <signing_in_context.Provider
      value={{ signin_form, set_signin_form, clearSession }}
    >
      {children}
    </signing_in_context.Provider>
  );
}

export default SigningInDataContext;
