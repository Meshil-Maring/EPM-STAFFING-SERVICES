import React, { createContext, useState, useMemo, useContext } from "react";

export const listGridViewContext = createContext(null);

function ListGridViewContext({ children }) {
  const [view, setView] = useState("apps");

  const value = useMemo(
    () => ({
      view,
      changeView: setView,
    }),
    [view]
  );

  return (
    <listGridViewContext.Provider value={value}>
      {children}
    </listGridViewContext.Provider>
  );
}

export default ListGridViewContext;

export const useListView = () => {
  const context = useContext(listGridViewContext);
  if (!context) {
    throw new Error(
      "useListView must be used within a ListGridViewContext Provider"
    );
  }
  return context;
};
