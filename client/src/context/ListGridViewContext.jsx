import React, { createContext, useState } from "react";
export const listGridViewContext = createContext(null);

function ListGridViewContext({ children }) {
  const [view, setView] = useState("apps");
  const changeView = (view) => setView(view);
  return (
    <listGridViewContext.Provider value={{ view, changeView }}>
      {children}
    </listGridViewContext.Provider>
  );
}

export default ListGridViewContext;
