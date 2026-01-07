import React from "react";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JobForm from "./Components/layouts/Dashboard/JobForm";
import Dashboard from "./pages/Dashboard";
import Jobs from "./Components/sections/Jobs";
import Job_Form_data_authContext from "./context/Job_Form_data_authContext";
import JobApplienceOverview from "./Components/sections/JobApplienceOverview";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import WelcomePage from "./pages/WelcomePage";
import CatchAll from "./pages/CatchAll";
import SigningContext from "./context/SigningContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
      children: [
        {
          index: true,
          element: <Signin />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
        {
          path: "Dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
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
      ],
    },
    {
      path: "*",
      element: <CatchAll />,
    },
  ]);

  return (
    <Job_Form_data_authContext>
      <SigningContext>
        <RouterProvider router={router} />
      </SigningContext>
    </Job_Form_data_authContext>
  );
}

export default App;
