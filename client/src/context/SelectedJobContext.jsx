import React, { createContext, useEffect, useState } from "react";

export const selected_job_context = createContext(null);
export const selected_company_id_context = createContext(null);

function SelectedJobContext({ children }) {
  const [selected_job, setSelected_job] = useState(() => {
    try {
      const rawData = sessionStorage.getItem("selected_job");
      if (!rawData || rawData === "undefined") return {};
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Failed to parse session storage:", error);
      return {};
    }
  });

  //selected compnany context
  const [selected_company_id, setselected_company_id] = useState(() => {
    try {
      const company = sessionStorage.getItem("selected_company_id");
      if (!company || company === "undefined") return "undefined";
      return company;
    } catch (error) {
      console.error("Failed to parse session storage:", error);
      return {};
    }
  });

  useEffect(() => {
    const isJob = selected_job && Object.keys(selected_job).length > 0;

    if (
      isJob ||
      selected_company_id !== "" ||
      selected_company_id !== "undefined"
    ) {
      try {
        sessionStorage.setItem("selected_job", JSON.stringify(selected_job));
        sessionStorage.setItem("selected_company_id", selected_company_id);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [selected_job, selected_company_id]);

  return (
    <selected_job_context.Provider
      value={{
        selected_job,
        setSelected_job,
      }}
    >
      <selected_company_id_context.Provider
        value={{ selected_company_id, setselected_company_id }}
      >
        {children}
      </selected_company_id_context.Provider>
    </selected_job_context.Provider>
  );
}

export default SelectedJobContext;
