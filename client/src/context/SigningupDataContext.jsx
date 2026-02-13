import React, { createContext, useState } from "react";

export const signup_form_data_context = createContext(null);

function SigningupDataContext({ children }) {
  const [form, setForm] = useState({
    company_name: "",
    cin: "",
    location: "",
    email: "",
    phone: "",
    description: "",
    password: "",
    confirm_password: "",
    checkbox: false,
  });

  return (
    <signup_form_data_context.Provider value={{ form, setForm }}>
      {children}
    </signup_form_data_context.Provider>
  );
}

export default SigningupDataContext;
