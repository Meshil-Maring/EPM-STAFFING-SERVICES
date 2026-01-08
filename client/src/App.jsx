import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Job_Form_data_authContext from "./context/Job_Form_data_authContext";
import SigningContext from "./context/SigningContext";
import DashboardSectionContext from "./context/DashboardSectionContext";
const Admin_Client_Management = lazy(() =>
  import("./pages/Admin_Client_Management")
);
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./Components/sections/Jobs"));
const JobForm = lazy(() => import("./Components/sections/JobForm"));
const JobApplienceOverview = lazy(() =>
  import("./Components/sections/JobApplienceOverview")
);
const mainContent = lazy(() =>
  import("./Components/layouts/AdminClientManagement/mainContent")
);
const CatchAll = lazy(() => import("./pages/CatchAll"));
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <>
      {/* context for job posting form*/}
      <Job_Form_data_authContext>
        {/* context for dashboard section navigation */}
        <DashboardSectionContext>
          <SigningContext>
            <Router>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/api/auth/signin" index element={<Signin />} />
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
                    path="AdminClientManagement"
                    element={<Admin_Client_Management />}
                  >
                    <Route index element={<mainContent />} />
                  </Route>
                  <Route path="*" element={<CatchAll />} />
                </Routes>
              </Suspense>
            </Router>
          </SigningContext>
        </DashboardSectionContext>
      </Job_Form_data_authContext>
    </>
  );
}

export default App;
