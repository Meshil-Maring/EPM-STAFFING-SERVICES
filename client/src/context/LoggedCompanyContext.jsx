import React, { createContext, useContext, useEffect, useState } from "react";

export const LoggedCompanyContext = createContext();

export const LoggedCompanyProvider = ({ children }) => {
  const [loggedCompanyEmail, setLoggedCompanyEmail] = useState(() => {
    return sessionStorage.getItem("loggedCompanyEmail") || "Undefined";
  });

  useEffect(() => {
    sessionStorage.setItem("loggedCompanyEmail", loggedCompanyEmail);
  }, [loggedCompanyEmail]);

  return (
    <LoggedCompanyContext.Provider
      value={{ loggedCompanyEmail, setLoggedCompanyEmail }}
    >
      {children}
    </LoggedCompanyContext.Provider>
  );
};
