import React, { createContext, useState } from "react";
export const signing_in_context = createContext(null);

function SigningInDataContext({ children }) {
  const [signin_form, set_signin_form] = useState({
    email: "",
    password: "",
  });
  return (
    <signing_in_context.Provider value={{ signin_form, set_signin_form }}>
      {children}
    </signing_in_context.Provider>
  );
}

export default SigningInDataContext;
