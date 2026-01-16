import React, { createContext, useState, useMemo, useContext } from "react";

export const signup_form_data_context = createContext(null);

function SigningupDataContext({ children }) {
  const [form, setForm] = useState({
    company_name: "",
    cin: "",
    location: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    checkbox: false,
  });

  const value = useMemo(
    () => ({
      form,
      setForm,
    }),
    [form]
  );

  return (
    <signup_form_data_context.Provider value={value}>
      {children}
    </signup_form_data_context.Provider>
  );
}

export default SigningupDataContext;

export const useSignupForm = () => {
  const context = useContext(signup_form_data_context);
  if (!context) {
    throw new Error(
      "useSignupForm must be used within a SigningupDataContext Provider"
    );
  }
  return context;
};
