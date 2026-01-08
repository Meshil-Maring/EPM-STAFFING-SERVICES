import React, { createContext, useState } from "react";
export const DashboardSection = createContext(null);

function DashboardSectionContext({ children }) {
  const [section, setSection] = useState("Jobs");
  const changeSection = (newSection) => {
    setSection(newSection);
  };
  return (
    <DashboardSection.Provider value={{ section, changeSection }}>
      {children}
    </DashboardSection.Provider>
  );
}

export default DashboardSectionContext;
