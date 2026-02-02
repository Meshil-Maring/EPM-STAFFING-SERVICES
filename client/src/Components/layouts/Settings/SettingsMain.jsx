import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Label from "../../common/Label";
import MainTop from "./MainTop";
import CompanyInformation from "./CompanyInformation";
import ContactInformation from "./ContactInformation";
import LocationInformation from "./LocationInformation";
import AuthenticationModal from "./AuthenticationModal";
import SettingsActions from "./SettingsActions";

import { LoggedCompanyContext } from "../../context/LoggedCompanyContext";
import { Company_context } from "../../context/AccountsContext";
import { DashboardSection } from "../../context/DashboardSectionContext";

function SettingsMain() {
  const { changeSection } = useContext(DashboardSection);
  const { loggedCompany, setLoggedCompany } = useContext(LoggedCompanyContext);
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
      const input = document.querySelector("#input_confirm");
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

  const handleAuthentication = () => {
    if (verify === loggedCompany.password) {
      setMessage({ type: "info", text: "Saving changes..." });
      try {
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
      <motion.header
        animate={{
          boxShadow: isScrolled
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            : "0 0px 0px rgba(0 0 0 / 0)",
          borderBottom: isScrolled
            ? "1px solid #e5e7eb"
            : "1px solid transparent",
        }}
        className="w-full sticky top-0 z-20 flex flex-col items-start justify-center bg-b_white/80 backdrop-blur-md rounded-small p-4"
      >
        <Label
          text="Company Settings"
          class_name="font-semibold text-2xl text-text_b"
        />
        <Label
          text="Manage your company information and preferences"
          class_name="font-lighter text-sm opacity-80"
        />
      </motion.header>

      {message.text && (
        <div
          className={`absolute left-70 top-46 z-200 rounded-small ${
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
          onCompanyDelete={delete_account}
          onCompanyInputChange={delete_account_input_change}
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
