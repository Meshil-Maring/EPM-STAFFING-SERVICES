import React, { createContext, useState } from "react";

export const Admin_context = createContext(null);

export function AdminProvider({ children }) {
  const [AdminAccounts, setAdminAccounts] = useState(AdminAccounts);

  const updateAdmin = (companyId, key, newValue) => {
    setCompanyAccounts((prev) => ({
      ...prev,
      [companyId]: {
        ...prev[companyId],
        [key]: newValue,
      },
    }));
  };

  const deleteAdmin = (companyId) => {
    setCompanyAccounts((prev) => {
      const newCopy = { ...prev };
      delete newCopy[companyId];
      return newCopy;
    });
  };

  return (
    <Admin_context.Provider value={{ AdminAccounts, updateAdmin, deleteAdmin }}>
      {children}
    </Admin_context.Provider>
  );
}
