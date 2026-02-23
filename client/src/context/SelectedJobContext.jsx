import React, { createContext, useEffect, useState } from "react";

export const selected_job_id_context = createContext(null);
export const selected_company_id_context = createContext(null);

function SelectedJobContext({ children }) {
  const [selected_job_id, setSelected_job_id] = useState(() => {
    return sessionStorage.getItem("selected_job_id") || "";
  });

  //selected compnany context
  const [selected_company_id, setselected_company_id] = useState(() => {
    return sessionStorage.getItem("selected_company_id") || "";
  });

  useEffect(() => {
    // Always save to sessionStorage when state changes (with basic validation)
    sessionStorage.setItem("selected_job_id", selected_job_id);
    sessionStorage.setItem("selected_company_id", selected_company_id);
  }, [selected_job_id, selected_company_id]);

  return (
    <selected_job_id_context.Provider
      value={{
        selected_job_id,
        setSelected_job_id,
      }}
    >
      <selected_company_id_context.Provider
        value={{ selected_company_id, setselected_company_id }}
      >
        {children}
      </selected_company_id_context.Provider>
    </selected_job_id_context.Provider>
  );
}

export default SelectedJobContext;
