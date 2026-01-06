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
import JobApplienceOverview from "./Components/sections/JobApplienceOverview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/",
          element: <Jobs />,
        },
        {
          path: "JobForm",
          element: <JobForm />,
        },
        {
          path: "JobApplienceOverview",
          element: <JobApplienceOverview />,
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
