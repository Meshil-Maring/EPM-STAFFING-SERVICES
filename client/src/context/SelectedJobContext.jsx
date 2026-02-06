import React, { createContext, useEffect, useState } from "react";

export const selected_job_context = createContext(null);

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

  useEffect(() => {
    if (selected_job && Object.keys(selected_job).length > 0) {
      try {
        sessionStorage.setItem("selected_job", JSON.stringify(selected_job));
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [selected_job]);

  return (
    <selected_job_context.Provider value={{ selected_job, setSelected_job }}>
      {children}
    </selected_job_context.Provider>
  );
}

export default SelectedJobContext;
