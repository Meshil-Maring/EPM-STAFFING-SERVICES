import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

/**
 * Create the root React component and render the application
 *
 * - Uses StrictMode for development-time warnings and checks
 * - Includes ToastContainer for global toast notifications with:
 *   - 2 second auto-close timeout
 *   - Top-right positioning
 *   - Hidden progress bar for cleaner UI
 */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      autoClose={2000}
      position="top-right"
      hideProgressBar={true}
    />
    <App />
  </StrictMode>,
);
