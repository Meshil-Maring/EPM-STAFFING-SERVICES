import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../Components/common/Label";
import MainTop from "../Components/layouts/Settings/MainTop";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import LocationInformation from "../Components/layouts/Settings/LocationInformation";
import AuthenticationModal from "../Components/layouts/Settings/AuthenticationModal";
import SettingsActions from "../Components/layouts/Settings/SettingsActions";
import { Company_context } from "../context/AccountsContext";
import { DashboardSection } from "../context/DashboardSectionContext";
import { LoggedCompanyContext } from "../context/LoggedCompanyContext";

/**
 * SettingsMain Component
 *
 * Main settings page that manages company information, email/password verification,
 * and account deletion. Implements a comprehensive verification flow where users
 * must verify their email and password before making changes.
 *
 * @returns {JSX.Element} The Settings page component
 */

function SettingsMain() {
  const { changeSection } = useContext(DashboardSection);
  const { loggedCompany } = useContext(LoggedCompanyContext);
  const { companyAccounts, deleteCompany } = useContext(Company_context);
  const navigate = useNavigate();
  const [save_all, setSave_all] = useState(false);
  const [authError, setAuthError] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const [show, setShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  const [draftCompany, setDraftCompany] = useState(loggedCompany);
  const [del_account, setDel_account] = useState({
    email: "",
    password: "",
  });

  // State to manage pending email changes from verification flow
  const [pendingEmailChange, setPendingEmailChange] = useState("");

  const delete_account_input_change = (value, id) => {
    setDel_account((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePasswordShow = () => {
    setShow((prev) => !prev);
  };

  const update_company = (newValue, key) => {
    setDraftCompany((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const delete_account = () => {
    const input_email = del_account.email;
    const input_password = del_account.password;
    if (!input_email || !input_password) {
      setTimeout(() => {
        setMessage({
          type: "error",
          text: "Enter the current email and password to confirm account deletion",
        });
        setTimeout(() => {
          setMessage({
            type: "",
            text: "",
          });
        }, [3000]);
      }, []);
      const input = document.querySelector("#input_email");
      if (input) input.focus();
      return;
    }
    const isValid =
      input_email === draftCompany.email &&
      input_password === draftCompany.password;
    if (isValid) {
      setTimeout(() => {
        setMessage({
          type: "success",
          text: "Deleting account...",
        });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, [3000]);
      }, []);
      try {
        const company_key = Object.keys(companyAccounts).find(
          (key) => companyAccounts[key].email === draftCompany.email,
        );
        deleteCompany(company_key);
      } catch (error) {
        console.log("Failed to delete account", error);
        return;
      }
      setTimeout(() => {
        setMessage({
          type: "success",
          text: "Account deleted. Loading Home page...",
        });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, [3000]);
      }, []);
      navigate("/");
    }
    console.log("Failed to delete the account!!");
  };

  const [verify, setVerify] = useState("");

  const handleAuthenticity = (e) => {
    const value = e.target.value;
    setVerify(value);
  };

  /**
   * Handle authentication and save all changes including verified email changes
   * This function is called when user enters correct password in the authentication modal
   */
  const handleAuthentication = () => {
    if (verify === loggedCompany.password) {
      setTimeout(() => {
        setMessage({ type: "info", text: "Saving changes..." });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, []);
      }, [5000]);

      try {
        // Apply pending email changes if any
        let updatedCompany = { ...draftCompany };
        if (pendingEmailChange && pendingEmailChange !== loggedCompany.email) {
          updatedCompany.email = pendingEmailChange;
        }

        // Here you would typically call an API to save the changes
        // For now, we'll simulate the save process
        console.log("Saving company changes:", updatedCompany);

        setMessage({ type: "success", text: "Changes saved successfully!" });
        setAuthError("");
        setSave_all(false);

        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 2000);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to save changes. Please try again.",
        });
      } finally {
        navigate("/client/dashboard");
        changeSection("Jobs");
      }
    } else {
      setAuthError("Wrong Password");
    }
  };

  const handleUpdatingBranch = (newBranches) => {
    setDraftCompany((prev) => ({
      ...prev,
      branches: newBranches,
    }));
  };

  const handleClosingVerify = () => {
    setVerify("");
    setSave_all(false);
  };

  const handleSaveChanges = () => {
    setSave_all(true);
  };

  const handleCanceling = () => {
    changeSection("Jobs");
    navigate("/client/dashboard");
  };

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
      className="w-full p-6 overflow-y-auto h-full flex flex-col items-start justify-start gap-4 text-text_b_l text-sm"
    >
      <header className="w-full sticky top-0 z-20 flex flex-col items-start justify-center bg-b_white/80 backdrop-blur-md rounded-small p-4">
        <Label
          text="Company Settings"
          class_name="font-semibold text-2xl text-text_b"
        />
        <Label
          text="Manage your company information and preferences"
          class_name="font-lighter text-sm opacity-80"
        />
      </header>

      {message.text && (
        <div
          className={`absolute left-80 top-46 z-200 rounded-small ${
            message.type === "success"
              ? "text-text_green"
              : message.type === "error"
                ? "text-red-dark"
                : "text-d_blue"
          }`}
        >
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      <div className="flex w-full flex-col items-center justify-start gap-10 max-w-5xl mx-auto">
        <MainTop
          setError={setMessage}
          onCompanyDelete={delete_account}
          setPendingEmailChange={setPendingEmailChange}
        />

        <CompanyInformation
          company_information={draftCompany}
          onCompanyUpdate={update_company}
        />
        <ContactInformation
          contact_information={draftCompany}
          onCompanyUpdate={update_company}
        />
        <LocationInformation
          location_information={draftCompany}
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
