import Dashboard from "./pages/Dashboard";

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
