import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lazy loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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

    return this.props.children;
  }
}

export default ErrorBoundary;
