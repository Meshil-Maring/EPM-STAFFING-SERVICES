import React, { useEffect, useState, useContext } from "react";
import Label from "../Components/common/Label";
import MainTop from "../Components/layouts/Settings/MainTop";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import AuthenticationModal from "../Components/layouts/Settings/AuthenticationModal";
import SettingsActions from "../Components/layouts/Settings/SettingsActions";
import { showError, showInfo, showSuccess } from "../utils/toastUtils";
import { AuthContext } from "../context/AuthContext";
import {
  getUserInfo,
  updateUser,
  upateCompanyInfo,
  updateUserContact,
  updateUserAddress,
} from "../Components/layouts/Settings/end-point-function/setting";

function SettingsMain() {
  const [userInformation, setUserInformation] = useState(null);
  const { user } = useContext(AuthContext);
  const [save_all, setSave_all] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [verify, setVerify] = useState("");

  console.log(userInformation);
  console.log(user);

  // Track new credentials from MainTop
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    emailVerified: false,
    passwordVerified: false,
    isPasswordVerifying: false,
    isEmailVerifying: false,
  });

  const load_user_data = async () => {
    const user_info = await getUserInfo(user.id);
    if (!user_info?.success) return showError("Failed to fetch user data");
    setUserInformation(user_info.data);
    // Initialize credentials with current email but marked as not "new/verified"
    setCredentials((prev) => ({ ...prev, email: user_info.data.email }));
  };

  useEffect(() => {
    if (user?.id) load_user_data();
  }, [user?.id]);

  const update_company = (newValue, key) => {
    setUserInformation((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleAuthentication = async (currentPassword) => {
    try {
      setSubmitting(true);

      // 1. Update User (Email/Password) - Use new ones if verified, else use existing
      const finalEmail = credentials.emailVerified
        ? credentials.email
        : userInformation.email;
      const finalPassword = credentials.passwordVerified
        ? credentials.password
        : currentPassword;

      const userRes = await updateUser(user?.id, finalEmail, finalPassword);
      if (!userRes?.success) throw new Error("Credential update failed");

      // 2. Update Company Info
      await upateCompanyInfo(
        user?.id,
        userInformation.company_name,
        userInformation.registration_number,
        userInformation.company_description,
        userInformation.industry_type,
      );

      // 3. Update Contact
      await updateUserContact(
        user?.id,
        userInformation.contact_email,
        userInformation.phone,
        userInformation.others,
      );

      // 4. Update Address
      await updateUserAddress(
        user?.id,
        userInformation.street,
        userInformation.city,
        userInformation.state,
        userInformation.pin_code,
      );

      showSuccess("All settings synchronized successfully!");
      setSave_all(false);
      setVerify("");
      load_user_data(); // Refresh data
    } catch (error) {
      showError(error.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 pt-0 overflow-y-auto h-full flex flex-col gap-4 bg-b_white">
      <header className="w-full sticky top-0 pt-2 z-20 bg-b_white/80 p-4">
        <Label
          text="Company Settings"
          class_name="font-semibold text-2xl text-text_b"
        />
        <Label
          text="Manage your security and company profile"
          class_name="opacity-80 text-sm"
        />
      </header>

      <div className="flex w-full flex-col gap-10 max-w-5xl mx-auto pb-20">
        <MainTop
          logged_user_data={userInformation}
          credentials={credentials}
          setCredentials={setCredentials}
        />
        <CompanyInformation
          company_information={userInformation}
          onCompanyUpdate={update_company}
        />
        <ContactInformation
          contact_information={userInformation}
          onCompanyUpdate={update_company}
        />
      </div>

      <AuthenticationModal
        submit={submitting}
        isOpen={save_all}
        onClose={() => setSave_all(false)}
        onAuthenticate={handleAuthentication}
        onPasswordChange={(e) => setVerify(e.target.value)}
        showPassword={show}
        onTogglePassword={() => setShow(!show)}
      />

      <SettingsActions
        onCancel={() => window.location.reload()}
        onSave={() => setSave_all(true)}
      />
    </div>
  );
}

export default SettingsMain;
