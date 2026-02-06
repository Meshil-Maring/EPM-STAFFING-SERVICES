import React, { createContext, useContext, useEffect, useState } from "react";

export const LoggedCompanyContext = createContext();

export const LoggedCompanyProvider = ({ children }) => {
  const [loggedCompany, setLoggedCompany] = useState(() => {
    const savedCompany_infor = sessionStorage.getItem("loggedCompany");
    if (savedCompany_infor) {
      const parsed_info = JSON.parse(savedCompany_infor);
      return parsed_info;
    }
  });

  useEffect(() => {
    const parsed_infor = JSON.stringify(loggedCompany);
    if (parsed_infor) {
      try {
        sessionStorage.setItem("loggedCompany", parsed_infor);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [loggedCompany]);

  const value = {
    loggedCompany,
    setLoggedCompany,
  };

  return (
    <LoggedCompanyContext.Provider value={value}>
      {children}
    </LoggedCompanyContext.Provider>
  );
};
