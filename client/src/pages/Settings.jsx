/**
 * Settings page component
 *
 * The main settings page for managing company information and preferences.
 * This component provides a comprehensive interface for users to update their
 * company details, contact information, and location branches. It includes
 * authentication verification before saving changes for security purposes.
 *
 * Backend data structure expected:
 * {
 *   id, email, role, active, signup_stage, user_created_at, user_updated_at,
 *   contact_email, phone, others, street, city, state, pin_code,
 *   company_name, industry_type, registration_number, company_description
 * }
 */

import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../Components/common/Label";
import MainTop from "../Components/layouts/Settings/MainTop";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import AuthenticationModal from "../Components/layouts/Settings/AuthenticationModal";
import SettingsActions from "../Components/layouts/Settings/SettingsActions";
import { showError, showInfo } from "../utils/toastUtils";
import { AuthContext } from "../context/AuthContext";
import {
  getUserInfo,
  updateUser,
} from "../Components/layouts/Settings/end-point-function/setting";

/**
 * Main Settings page functional component
 *
 * @returns {JSX.Element} The complete settings page with all sections and modals
 */
function SettingsMain() {
  // State to hold user data from backend
  const [userInformation, setUserInformation] = useState(null);
  const { user } = useContext(AuthContext);

  // Load user data from backend API
  const load_user_data = async () => {
    const user_info = await getUserInfo(user.id);
    if (!user_info?.success) return showError("Something went wrong!");
    setUserInformation(user_info.data);
  };

  // Determine user type for conditional rendering and navigation
  const user_type = user?.role;

  const navigate = useNavigate();
  const [save_all, setSave_all] = useState(false);

  const [show, setShow] = useState(false);

  // Load user information on first render
  useEffect(() => {
    load_user_data();
  }, []);

  // State for authentication password verification
  const [verify, setVerify] = useState("");

  /**
   * Toggle password visibility in the authentication modal
   */
  const handlePasswordShow = () => {
    setShow((prev) => !prev);
  };

  /**
   * Update company information in local state
   * Handles both simple fields and the 'others' object
   * @param {any} newValue - The new value to update
   * @param {string} key - The key/field to update
   */
  const update_company = (newValue, key) => {
    // Allow updating even if the field doesn't exist yet (for new fields)
    setUserInformation((prev) => {
      const newState = { ...prev, [key]: newValue };
      return newState;
    });
  };

  /**
   * Handle authentication input changes
   * @param {Object} e - Event object from input change
   */
  const handleAuthenticity = (e) => {
    const value = e.target.value;
    setVerify(value);
  };

  /**
   * Navigate to home page based on user type
   */
  const navigate_home = () =>
    user_type === "admin"
      ? (navigate("/admin/management"),
        sessionStorage.setItem("current_navbutton", "client_management"))
      : (navigate("/client/dashboard"),
        sessionStorage.setItem("current_navbutton", "jobs"));

  const handleAuthentication = async () => {
    const res = await updateUser(user?.id);
    if (!res.success)
      return showError("Failed to save changes. Please try again.");
    showInfo("Changes saved ✔");
    setSave_all(false);
  };

  /**
   * Close verification modal and reset state
   */
  const handleClosingVerify = () => {
    setVerify("");
    setSave_all(false);
  };

  /**
   * Trigger save changes flow
   */
  const handleSaveChanges = () => {
    setSave_all(true);
  };

  /**
   * Cancel changes and navigate back to dashboard
   */
  const handleCanceling = () => {
    save_all(false);
    setVerify("");
  };

  return (
    <div className="w-full p-6 pt-0 overflow-y-auto h-full flex flex-col items-start justify-start gap-4 text-text_b_l text-sm md:p-8 md:pt-0 lg:p-10 lg:pt-0 xl:p-12 xl:pt-0">
      {/* Page header with title and description */}
      <header className="w-full sticky top-0 pt-2 z-20 flex flex-col items-start justify-start bg-b_white/80 p-4">
        <Label
          text="Company Settings"
          class_name="font-semibold text-2xl text-text_b"
        />
        <Label
          text="Manage your company information and preferences"
          class_name="font-lighter text-sm opacity-80"
        />
      </header>

      {/* Main settings content */}
      <div className="flex w-full flex-col items-center justify-start gap-10 max-w-5xl mx-auto">
        <MainTop logged_user_data={userInformation} />

        <CompanyInformation
          company_information={userInformation}
          onCompanyUpdate={update_company}
        />
        <ContactInformation
          contact_information={userInformation}
          onCompanyUpdate={update_company}
        />
      </div>

      {/* Authentication modal for saving changes */}
      <AuthenticationModal
        isOpen={save_all}
        onClose={handleClosingVerify}
        onAuthenticate={handleAuthentication}
        onPasswordChange={handleAuthenticity}
        showPassword={show}
        onTogglePassword={handlePasswordShow}
      />

      {/* Save/Cancel action buttons */}
      <SettingsActions onCancel={handleCanceling} onSave={handleSaveChanges} />
    </div>
  );
}

export default SettingsMain;
