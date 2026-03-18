/**
 * LogState context - Authentication state management
 *
 * This context manages the user authentication state (logged in/out status)
 * throughout the application. It provides a simple boolean state that persists
 * across browser sessions using sessionStorage.
 */

import React, { createContext, useEffect, useState } from "react";

// Create the context with default null value
export const log_state = createContext(null);

/**
 * LogState provider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with authentication state management
 */
function LogState({ children }) {
  // Initialize state from sessionStorage
  const [log, setLog] = useState(() => {
    const saved = sessionStorage.getItem("log_state");
    return saved === "true";
  });

  // Keep sessionStorage in sync whenever the 'log' state changes
  useEffect(() => {
    sessionStorage.setItem("log_state", log.toString());
  }, [log]);

  return (
    <log_state.Provider value={{ log, setLog }}>{children}</log_state.Provider>
  );
}

export default LogState;
