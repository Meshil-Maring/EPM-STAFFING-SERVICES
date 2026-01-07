import React from "react";
import { createContext, useState } from "react";

export const SignContext = createContext(null);

function SigningContext({ children }) {
  const [signSection, setSignSection] = useState("signin");
  const changeSection = (section) => setSignSection(section);
  return (
    <SignContext.Provider value={{ signSection, changeSection }}>
      {children}
    </SignContext.Provider>
  );
}

export default SigningContext;
