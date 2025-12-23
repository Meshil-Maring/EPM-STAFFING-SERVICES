import React from "react";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JobForm from "./Components/layouts/JobForm";
import Dashboard from "./pages/Dashboard";
import Jobs from "./Components/sections/Jobs";
import Job_Form_data_authContext from "./context/Job_Form_data_authContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Jobs />,
        },
        {
          path: "Jobs",
          element: <Jobs />,
        },
        {
          path: "JobForm",
          element: <JobForm />,
        },
      ],
    },
  ]);

  return (
    <Job_Form_data_authContext>
      <RouterProvider router={router} />
    </Job_Form_data_authContext>
  );
}

export default App;
