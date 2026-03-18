/**
 * Main App component - Entry point for the Employee Staffing Services application
 *
 * This component sets up the entire application structure including:
 * - Error boundaries for graceful error handling
 * - Context providers for state management
 * - Router configuration with protected and admin routes
 * - Lazy loading for performance optimization
 */

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
import CompanyProvider from "./context/AccountsContext";
import CandidatesContext from "./context/CandidatesContext";
import AdminCompanyOverview from "./Components/layouts/Admin/AdminCompanyOverview/AdminCompanyOverview";
import AdminAccountsContext from "./context/AdminAccountsContext";
import GridListViewContext from "./context/GridListViewContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import LogState from "./context/LogState";
import AdminRoutes from "./utils/AdminRoutes";
import SignupFormContext from "./context/SignupFormContext";

// Lazy loaded components for performance optimization
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
const Signup_form = lazy(
  () => import("./Components/layouts/SigningpagesLayouts/Signup_form"),
);
const Signin_form = lazy(
  () => import("./Components/layouts/SigningpagesLayouts/Signin_form"),
);
const Signup_Company_information = lazy(
  () =>
    import("./Components/layouts/SigningpagesLayouts/Signup_Company_information"),
);
const Signup_Contact_information = lazy(
  () =>
    import("./Components/layouts/SigningpagesLayouts/Signup_Contact_information"),
);
const Signup_Address_information = lazy(
  () =>
    import("./Components/layouts/SigningpagesLayouts/Signup_Address_information"),
);
const Signup_Account_credentials = lazy(
  () =>
    import("./Components/layouts/SigningpagesLayouts/Signup_Account_credentials"),
);

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./Components/sections/Jobs"));
const JobApplienceOverview = lazy(
  () => import("./Components/sections/JobApplienceOverview"),
);

const Home = lazy(() => import("./pages/Home"));
const CatchAll = lazy(() => import("./pages/CatchAll"));

/**
 * Loading component displayed during route transitions and lazy loading
 * Provides user feedback while components are being loaded
 * @returns {JSX.Element} Loading indicator
 */
const Loading = () => (
  <div
    className="w-full h-dvh flex items-center justify-center text-xl tracking-wide text-text_b bg-b_cream"
    aria-live="polite"
  >
    <p>Loading application...</p>
  </div>
);

/**
 * PathNormalizer component
 * Ensures all URLs are normalized to lowercase to prevent routing issues
 * Must run before Routes to prevent CatchAll from rendering incorrectly
 * @returns {null} This component doesn't render anything
 */
function PathNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();
  const normalized = React.useRef(false);

  useEffect(() => {
    const { pathname, search, hash } = location;
    const lower = pathname.toLocaleLowerCase();

    // Normalize path to lowercase if needed
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

/**
 * Main App component that sets up the application structure
 *
 * @returns {JSX.Element} The complete application with routing and context providers
 */
function App() {
  return (
    <ErrorBoundary>
      <LogState>
        <SignupFormContext>
          <JobsContext>
            <AdminAccountsContext>
              <GridListViewContext>
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
                          {/* Public routes */}
                          <Route index element={<Home />} />

                          {/* Authentication routes */}
                          <Route path="auth/signin" element={<Signin_form />} />
                          <Route
                            path="auth/signup_form"
                            element={<Signup_form />}
                          >
                            <Route
                              index
                              element={<Signup_Company_information />}
                            />
                            <Route
                              path="contact_information"
                              element={<Signup_Contact_information />}
                            />
                            <Route
                              path="address_information"
                              element={<Signup_Address_information />}
                            />
                            <Route
                              path="account_credentials"
                              element={<Signup_Account_credentials />}
                            />
                          </Route>

                          {/* Protected routes - require authentication */}
                          <Route element={<ProtectedRoutes />}>
                            <Route
                              path="client/dashboard"
                              element={<Dashboard />}
                            >
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
                          </Route>

                          {/* Admin routes - require admin privileges */}
                          <Route element={<AdminRoutes />}>
                            <Route
                              path="admin/management"
                              element={<Admin_Client_Management />}
                            >
                              <Route index element={<ContentAppsView />} />
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
                                element={<Settings />}
                              />
                            </Route>
                          </Route>

                          {/* Catch-all route for 404 pages */}
                          <Route path="*" element={<CatchAll />} />
                        </Routes>
                      </Suspense>
                    </Router>
                  </CompanyProvider>
                </CandidatesContext>
              </GridListViewContext>
            </AdminAccountsContext>
          </JobsContext>
        </SignupFormContext>
      </LogState>
    </ErrorBoundary>
  );
}

export default App;
