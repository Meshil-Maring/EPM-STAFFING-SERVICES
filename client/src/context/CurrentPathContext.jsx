import React, { createContext, useState, useEffect } from "react";

export const current_path_context = createContext(null);

function CurrentPathContext({ children }) {
  const [current_path, set_current_path] = useState(() => {
    sessionStorage.getItem("currentPath") || "home";
  });

  useEffect(() => {
    sessionStorage.setItem("currentPath", current_path);
  }, [current_path]);

  return (
    <current_path_context.Provider value={{ current_path, set_current_path }}>
      {children}
    </current_path_context.Provider>
  );
}

export default CurrentPathContext;
