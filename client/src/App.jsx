import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ErrorBoundary from "./Components/common/ErrorBoundary";
import JobsContext from "./context/JobsContext";
import { CompanyProvider } from "./context/AccountsContext";
import CandidatesContext from "./context/CandidatesContext";
import AdminCompanyOverview from "./Components/layouts/Admin/AdminCompanyOverview/AdminCompanyOverview";
import AdminAccountsContext from "./context/AdminAccountsContext";

const SubmittedCandidates = lazy(
  () =>
    import("./Components/layouts/Admin/SubmittedCondidates/SubmittedCandidates"),
);
const OfferReleased = lazy(
  () => import("./Components/layouts/Dashboard/OfferReleased/OfferReleased"),
);
const Admin_Client_Management = lazy(
  () => import("./pages/Admin_Client_Management"),
);
const ContentAppsView = lazy(
  () =>
    import("./Components/layouts/Admin/AdminClientManagement/ContentAppsView"),
);
const Settings = lazy(() => import("./pages/Settings"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./Components/sections/Jobs"));
const JobApplienceOverview = lazy(
  () => import("./Components/sections/JobApplienceOverview"),
);
const AdminSettings = lazy(
  () => import("./Components/layouts/Admin/AdminSettings/AdminSettings"),
);

const Home = lazy(() => import("./pages/Home"));
const CatchAll = lazy(() => import("./pages/CatchAll"));

const Loading = () => (
  <div
    className="w-full h-dvh flex items-center justify-center text-xl tracking-wide text-text_b bg-b_cream"
    aria-live="polite"
  >
    <p>Loading application...</p>
  </div>
);

function App() {
  // Component that ensures the pathname is normalized to lowercase
  // Must run before Routes to prevent CatchAll from rendering
  function PathNormalizer() {
    const location = useLocation();
    const navigate = useNavigate();
    const normalized = React.useRef(false);

    useEffect(() => {
      const { pathname, search, hash } = location;
      const lower = pathname.toLocaleLowerCase();

      if (pathname !== lower && !normalized.current) {
        normalized.current = true;
        // Use replace to avoid adding to browser history
        navigate(lower + search + hash, {
          replace: true,
          state: { from: "normalizer" },
        });
      } else if (pathname === lower) {
        normalized.current = false;
      }
    }, [location, navigate]);

    return null;
  }

  return (
    <ErrorBoundary>
      <JobsContext>
        <AdminAccountsContext>
          <CandidatesContext>
            <CompanyProvider>
              <Router>
                <title>Job Portal | Manage Your Career</title>
                <meta
                  name="description"
                  content="Effortlessly manage job postings and applications."
                />
                <Suspense fallback={<Loading />}>
                  <PathNormalizer />
                  <Routes>
                    <Route index element={<Home />} />

                    <Route path="signing">
                      <Route index element={<Signin />} />
                      <Route path="signup" element={<Signup />} />
                    </Route>

                    <Route path="client/dashboard" element={<Dashboard />}>
                      <Route index element={<Jobs />} />
                      <Route
                        path="offer_released"
                        element={<OfferReleased />}
                      />
                      <Route
                        path="interview_pipeline"
                        element={<JobApplienceOverview />}
                      />
                      <Route path="settings" element={<Settings />} />
                    </Route>

                    <Route
                      path="admin/management"
                      element={<Admin_Client_Management />}
                    >
                      <Route index element={<ContentAppsView />} />
                      <Route
                        path="client_management"
                        element={<ContentAppsView />}
                      />
                      <Route
                        path="submitted_candidates"
                        element={<SubmittedCandidates />}
                      />
                      <Route
                        path="admin_company_overview"
                        element={<AdminCompanyOverview />}
                      />
                      <Route
                        path="admin_settings"
                        element={<AdminSettings />}
                      />
                    </Route>

                    <Route path="*" element={<CatchAll />} />
                  </Routes>
                </Suspense>
              </Router>
            </CompanyProvider>
          </CandidatesContext>
        </AdminAccountsContext>
      </JobsContext>
    </ErrorBoundary>
  );
}

export default App;
