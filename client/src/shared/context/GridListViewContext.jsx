/**
 * GridListViewContext - Context provider for view type management
 *
 * This context manages the current view type (grid or list) for displaying
 * content throughout the application. It provides a simple state management
 * solution for switching between different display modes with sessionStorage
 * persistence.
 */

import React, { createContext, useEffect, useState } from "react";

// Create the context with default null value
export const grid_list_context = createContext(null);

/**
 * GridListViewContext provider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with view type management
 */
function GridListViewContext({ children }) {
  // Initialize view state from sessionStorage
  const [view, setView] = useState(() => {
    return sessionStorage.getItem("view_type") || "apps";
  });

  // Keep sessionStorage in sync whenever the 'view' state changes
  useEffect(() => {
    sessionStorage.setItem("view_type", view);
  }, [view]);

  return (
    <grid_list_context.Provider value={{ setView, view }}>
      {children}
    </grid_list_context.Provider>
  );
}

export default GridListViewContext;
