import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";

export const DashboardSection = createContext(null);

export function DashboardSectionContext({ children }) {
  const [section, setSection] = useState(() => {
    try {
      return sessionStorage.getItem("currentSection") || "Jobs";
    } catch (error) {
      return "Jobs";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("currentSection", section);
    } catch (error) {
      console.error("SessionStorage error:", error);
    }
  }, [section]);

  const value = useMemo(
    () => ({
      section,
      changeSection: setSection,
    }),
    [section]
  );

  return (
    <DashboardSection.Provider value={value}>
      {children}
    </DashboardSection.Provider>
  );
}

export const useDashboardSection = () => {
  const context = useContext(DashboardSection);
  if (!context) {
    throw new Error(
      "useDashboardSection must be used within a DashboardSectionContext Provider"
    );
  }
  return context;
};

export default DashboardSectionContext;
