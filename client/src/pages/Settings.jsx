import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { toast } from "react-toastify";
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
import { showInfo, showSuccess } from "../utils/toastUtils";

function SettingsMain() {
  const { company_accounts, deleteCompany, addBranch } =
    useContext(Company_context);

  const { adminAccounts } = useContext(admin_accounts_context);
  const logged_user_id = sessionStorage.getItem("logged_user_id");
  const user_type = sessionStorage.getItem("logged_user_type");

  const logged_user =
    user_type === "admin"
      ? adminAccounts[logged_user_id]
      : company_accounts[logged_user_id];
  const navigate = useNavigate();
  const [save_all, setSave_all] = useState(false);

  if (user_type === "admin") {
  }

  const [show, setShow] = useState(false);
  const containerRef = useRef(null);

  const [logged_user_data, setLogged_user_data] = useState(logged_user || {});

  // Sync logged_user_data with context changes
  useEffect(() => {
    const updatedUser =
      user_type === "admin"
        ? adminAccounts[logged_user_id]
        : company_accounts[logged_user_id];
    if (updatedUser) {
      setLogged_user_data(updatedUser);
    }
  }, [company_accounts, adminAccounts, logged_user_id, user_type]);
  const [del_account, setDel_account] = useState({
    email: "",
    password: "",
  });

  // State to manage pending email changes from verification flow
  const [pendingEmailChange, setPendingEmailChange] = useState("");

  // State for authentication
  const [verify, setVerify] = useState("");
  const [authError, setAuthError] = useState("");

  const handlePasswordShow = () => {
    setShow((prev) => !prev);
  };

  const update_company = (newValue, key) => {
    setLogged_user_data((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const add_newBranch = (newBranches) => {
    setLogged_user_data((prev) => ({
      ...prev,
      branches: newBranches,
    }));
  };

  const delete_account = () => {
    const input_email = del_account.email;
    const input_password = del_account.password;
    if (!input_email || !input_password) {
      toast.error(
        "Enter the current email and password to confirm account deletion",
      );
      const input = document.querySelector("#input_email");
      if (input) input.focus();
      return;
    }
    const isValid =
      input_email === logged_user_data.email &&
      input_password === logged_user_data.password;
    if (isValid) {
      toast.success("Deleting account...");
      try {
        const company_key = Object.keys(company_accounts).find(
          (key) => company_accounts[key].email === logged_user_data.email,
        );
        deleteCompany(company_key);
        toast.success("Account deleted. Loading Home page...");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete account");
      }
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleAuthenticity = (e) => {
    const value = e.target.value;
    setVerify(value);
  };

  /**
   * Handle authentication and save all changes including verified email changes
   * This function is called when user enters correct password in the authentication modal
   */
  const handleAuthentication = () => {
    if (verify === logged_user_data.password) {
      try {
        // Apply pending email changes if any
        let updatedCompany = { ...logged_user_data };

        // Here you would typically call an API to save the changes
        // For now, we'll simulate the save process

        showSuccess("Changes saved successfully!");
        setAuthError("");
        setSave_all(false);

        navigate("/client/dashboard");

        sessionStorage.setItem("current_navbutton", "jobs");
      } catch (error) {
        toast.error("Failed to save changes. Please try again.");
      }
    } else {
      setAuthError("Wrong Password");
    }
  };

  const handleUpdatingBranch = useCallback((newBranches) => {
    setLogged_user_data((prev) => ({
      ...prev,
      branches: newBranches,
    }));
  }, []);

  const handleClosingVerify = () => {
    setVerify("");
    setSave_all(false);
  };

  const handleSaveChanges = () => {
    setSave_all(true);
  };

  const handleCanceling = () => {
    navigate("/client/dashboard");
  };

  // State for scroll detection
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = () => {
      setIsScrolled(container.scrollTop > 20);
    };

    container.addEventListener("scroll", updateScroll);
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full p-6 pt-0 overflow-y-auto h-full flex flex-col items-start justify-start gap-4 text-text_b_l text-sm"
    >
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

      <div className="flex w-full flex-col items-center justify-start gap-10 max-w-5xl mx-auto">
        <MainTop
          onCompanyDelete={delete_account}
          setPendingEmailChange={setPendingEmailChange}
        />

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

      <AuthenticationModal
        isOpen={save_all}
        onClose={handleClosingVerify}
        onAuthenticate={handleAuthentication}
        authError={authError}
        onPasswordChange={handleAuthenticity}
        showPassword={show}
        onTogglePassword={handlePasswordShow}
      />

      <SettingsActions onCancel={handleCanceling} onSave={handleSaveChanges} />
    </div>
  );
}

export default SettingsMain;
