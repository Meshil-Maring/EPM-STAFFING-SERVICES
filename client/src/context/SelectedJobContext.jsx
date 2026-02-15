import React, { createContext, useEffect, useState } from "react";

export const selected_job_context = createContext(null);
export const selected_company_context = createContext(null);

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
  const [selected_company, setSelected_company] = useState(() => {
    try {
      const company = sessionStorage.getItem("selected_company");
      if (!company || company === "undefined") return {};
      return JSON.parse(company);
    } catch (error) {
      console.error("Failed to parse session storage:", error);
      return {};
    }
  });

  useEffect(() => {
    const isJob = selected_job && Object.keys(selected_job).length > 0;
    const isCompany =
      selected_company && Object.keys(selected_company).length > 0;

    if (isJob || isCompany) {
      try {
        sessionStorage.setItem("selected_job", JSON.stringify(selected_job));
        sessionStorage.setItem(
          "selected_company",
          JSON.stringify(selected_company),
        );
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [selected_job, selected_company]);

  return (
    <selected_job_context.Provider
      value={{
        selected_job,
        setSelected_job,
        selected_company,
        setSelected_company,
      }}
    >
      {children}
    </selected_job_context.Provider>
  );
}

export default SelectedJobContext;
