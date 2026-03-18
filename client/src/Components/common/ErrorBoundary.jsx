/**
 * ErrorBoundary component
 *
 * A React error boundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * This is particularly useful for handling lazy loading errors and other runtime exceptions.
 */

import React from "react";

/**
 * ErrorBoundary class component
 *
 * Catches errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state to track if an error has occurred
    this.state = { hasError: false };
  }

  /**
   * Static method called when a child component throws an error
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state object with hasError set to true
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Lifecycle method called after an error has been thrown
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Additional error information
   */
  componentDidCatch(error, errorInfo) {
    console.error("Lazy loading error:", error, errorInfo);
  }

  /**
   * Render method that displays either the fallback UI or children
   * @returns {JSX.Element} Either error fallback UI or children components
   */
  render() {
    if (this.state.hasError) {
      // Fallback UI to display when an error occurs
      return (
        <div className="text-xl text-text_l_b w-full h-full flex items-center justify-center gap-2 flex-col">
          <h2>Something went wrong.</h2>
          <button
            className="bg-nevy_blue text-text_white py-1 px-4 rounded-small font-lighter  hover:font-semibold"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
