/**
 * Settings page component
 *
 * The main settings page for managing company information and preferences.
 * This component provides a comprehensive interface for users to update their
 * company details, contact information, and location branches. It includes
 * authentication verification before saving changes for security purposes.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import Label from "../Components/common/Label";
import MainTop from "../Components/layouts/Settings/MainTop";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import LocationInformation from "../Components/layouts/Settings/LocationInformation";
import AuthenticationModal from "../Components/layouts/Settings/AuthenticationModal";
import SettingsActions from "../Components/layouts/Settings/SettingsActions";
import { Company_context } from "../context/AccountsContext";
import { admin_accounts_context } from "../context/AdminAccountsContext";
import { showError } from "../utils/toastUtils";

/**
 * Main Settings page functional component
 *
 * @returns {JSX.Element} The complete settings page with all sections and modals
 */
function SettingsMain() {
  const { company_accounts, update_company_info } = useContext(Company_context);

  const { adminAccounts } = useContext(admin_accounts_context);
  const logged_user_id = sessionStorage.getItem("logged_user_id");
  const user_type = sessionStorage.getItem("logged_user_type");
  const logged_user =
    user_type === "admin"
      ? adminAccounts[logged_user_id]
      : company_accounts[logged_user_id];
  const navigate = useNavigate();
  const [save_all, setSave_all] = useState(false);

  const [show, setShow] = useState(false);
  const [logged_user_data, setLogged_user_data] = useState(logged_user || {});

  // Sync logged_user_data with context changes
  useEffect(() => {
    const user_data =
      user_type === "admin"
        ? adminAccounts[logged_user_id]
        : company_accounts[logged_user_id];
    if (user_data) {
      setLogged_user_data(user_data);
    }
  }, []);

  // State to manage pending email changes from verification flow

  // State for authentication
  const [verify, setVerify] = useState("");

  /**
   * Toggle password visibility in the authentication modal
   */
  const handlePasswordShow = () => {
    setShow((prev) => !prev);
  };

  /**
   * Update company information in local state
   * @param {any} newValue - The new value to update
   * @param {string} key - The key/field to update
   */
  const update_company = (newValue, key) => {
    setLogged_user_data((prev) => ({
      ...prev,
      [key]: newValue,
    }));
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

  /**
   * Handle authentication and save changes
   * Verifies password before applying changes to company information
   */
  const handleAuthentication = () => {
    if (verify === logged_user_data.password) {
      try {
        // Apply pending email changes if any
        update_company_info(logged_user_id, logged_user_data);

        setSave_all(false);

        navigate_home();

        navigate_home();
      } catch (error) {
        showError("Failed to save changes. Please try again.");
      }
    } else {
      showError("Wrong Password");
    }
  };

  /**
   * Update branch information callback
   * @param {Array} newBranches - Updated branch data
   */
  const handleUpdatingBranch = useCallback((newBranches) => {
    setLogged_user_data((prev) => ({
      ...prev,
      branches: newBranches,
    }));
  }, []);

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
    navigate_home();
  };

  return (
    <div className="w-full p-6 pt-0 overflow-y-auto h-full flex flex-col items-start justify-start gap-4 text-text_b_l text-sm md:p-8 lg:p-10 xl:p-12">
      {/* Page header with title and description */}
      <header className="w-full sticky top-0 pt-6 z-20 flex flex-col items-start justify-center bg-b_white/80 backdrop-blur-md rounded-small p-4">
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
        {user_type === "company" && <MainTop />}

        <CompanyInformation
          company_information={logged_user_data}
          onCompanyUpdate={update_company}
        />
        <ContactInformation
          contact_information={logged_user_data}
          onCompanyUpdate={update_company}
        />
        <LocationInformation
          branches_information={logged_user_data.branches}
          onBranchUpdate={handleUpdatingBranch}
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
