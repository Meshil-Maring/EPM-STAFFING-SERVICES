import React from "react";
import Dashboard from "./pages/Dashboard";
import React from "react";

function App() {
  const onSelect = (name) => {
    alert(`Button ${name} is cliked!`);
  };

  return (
    <div className="w-full h-dvh">
      <Dashboard />
    </div>
  );
}

export default App;
