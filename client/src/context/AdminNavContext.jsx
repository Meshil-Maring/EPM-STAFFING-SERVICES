import React, { createContext, useEffect, useState } from "react";
export const admin_navbar_context = createContext(null);

function AdminNavContext({ children }) {
  const [section, setSection] = useState(() => {
    return sessionStorage.getItem("currentSection") || "Client Management";
  });

  useEffect(() => {
    sessionStorage.setItem("currentSection", section);
  }, [section]);
  return (
    <admin_navbar_context.Provider value={{ section, setSection }}>
      {children}
    </admin_navbar_context.Provider>
  );
}

export default AdminNavContext;
