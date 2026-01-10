import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Job_Form_data_authContext from "./context/Job_Form_data_authContext";
import DashboardSectionContext from "./context/DashboardSectionContext";
import ListGridViewContext from "./context/ListGridViewContext";
// Admin imports
const Admin_Client_Management = lazy(() =>
  import("./pages/Admin_Client_Management")
);
const ContentAppsView = lazy(() =>
  import("./Components/layouts/AdminClientManagement/ContentAppsView")
);

// signing pages imports
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
// dashboard imports
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./Components/sections/Jobs"));
const JobForm = lazy(() => import("./Components/sections/JobForm"));
const JobApplienceOverview = lazy(() =>
  import("./Components/sections/JobApplienceOverview")
);
import Home from "./pages/Home";
import SigningupDataContext from "./context/SigningupContext";

const CatchAll = lazy(() => import("./pages/CatchAll"));
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <>
      {/* context for job posting form*/}
      <Job_Form_data_authContext>
        {/* context for dashboard section navigation */}
        <DashboardSectionContext>
          {/* context for displaying list, grids */}
          <ListGridViewContext>
            {/* Signingup form data */}
            <SigningupDataContext>
              <Router>
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/api/auth/signin" element={<Signin />} />
                    <Route path="/api/auth/signup" element={<Signup />} />
                    <Route path="Dashboard" element={<Dashboard />}>
                      <Route index element={<Jobs />} />
                      <Route path="JobForm" element={<JobForm />} />
                      <Route
                        path="JobApplienceOverview"
                        element={<JobApplienceOverview />}
                      />
                    </Route>
                    <Route
                      path="Admin_Client_Management"
                      element={<Admin_Client_Management />}
                    >
                      <Route index element={<ContentAppsView />} />
                    </Route>
                    <Route path="*" element={<CatchAll />} />
                  </Routes>
                </Suspense>
              </Router>
            </SigningupDataContext>
          </ListGridViewContext>
        </DashboardSectionContext>
      </Job_Form_data_authContext>
    </>
  );
}

export default App;
