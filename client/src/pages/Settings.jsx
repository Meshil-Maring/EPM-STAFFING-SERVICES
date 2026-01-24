import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Label from "../Components/common/Label";
import Button from "../Components/common/Button";
import Icon from "../Components/common/Icon";
import MainTop from "../Components/layouts/Settings/MainTop";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import LocationInformation from "../Components/layouts/Settings/LocationInformation";

import { signing_in_context } from "../context/SigningInDataContext";
import { Company_context } from "../context/AccountsContext";
import LabelInput2 from "../Components/common/LabelInput2";

function Settings() {
  const AuthDivRef = useRef(null);
  const AuthDivContainerRef = useRef(null);
  const navigate = useNavigate();
  const [save_all, setSave_all] = useState(false);
  const [authError, setAuthError] = useState("");
  const { signin_form } = useContext(signing_in_context);
  const { companyAccounts, updateWholeCompany, deleteCompany } =
    useContext(Company_context);

  useEffect(() => {
    const Auth = AuthDivRef.current;
    if (!Auth) return;
    const updateClicking = (e) => {
      if (!Auth.contains(e.target)) {
        setAuthError("");
        setSave_all(false);
      }
    };

    window.addEventListener("mousedown", updateClicking);
    return () => window.removeEventListener("mousedown", updateClicking);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  const [draftCompany, setDraftCompany] = useState(null);

  const CompanyKey = Object.keys(companyAccounts).find((key) => {
    const account = companyAccounts[key];
    return (
      account.email === signin_form.email &&
      account.password === signin_form.password
    );
  });

  useEffect(() => {
    if (CompanyKey && companyAccounts[CompanyKey]) {
      setDraftCompany(companyAccounts[CompanyKey]);
    }
  }, [CompanyKey, companyAccounts]);

  // handling updating company
  const handleUpdating = (newValue, key) => {
    setDraftCompany((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const [verify, setVerify] = useState("");
  const handleAuthenticity = (value) => {
    setVerify(value);
  };

  // handling Authenticity
  const handleAuthentication = () => {
    if (verify === signin_form.password) {
      alert("changes saved");
      setAuthError("");
    } else {
      setAuthError("Wrong Password");
    }
  };

  // handling updating branches
  const handleUpdatingBranch = (branchIndex, updatedBranchData) => {
    const updatedBranches = draftCompany.branches.map((branch, index) =>
      index === branchIndex ? { ...branch, ...updatedBranchData } : branch,
    );
    setDraftCompany((prev) => ({
      ...prev,
      branches: updatedBranches,
    }));
  };

  // handling deleting branches
  const handleDeletingBranch = (branchIndex) => {
    const updatedBranches = draftCompany.branches.filter(
      (_, index) => index !== branchIndex,
    );
    setDraftCompany((prev) => ({
      ...prev,
      branches: updatedBranches,
    }));
  };

  // handling deleting company
  const handleDeleting = () => {
    deleteCompany(CompanyKey);
  };

  // handling global saving changes
  const handleSaveChanges = () => {
    setSave_all(true);
  };

  // handling canceling making changes
  const handleCanceling = () => {
    navigate(-1);
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

      {draftCompany ? (
        <div className="flex w-full flex-col items-center justify-start gap-10 max-w-5xl mx-auto">
          {/* MainTop reverted to original props */}
          <MainTop
            onCompanyDelete={handleDeleting}
            onCompanyUpdate={handleUpdating}
          />

          <CompanyInformation
            company_information={draftCompany}
            onCompanyUpdate={handleUpdating}
          />
          <ContactInformation
            contact_information={draftCompany}
            onCompanyUpdate={handleUpdating}
          />
          <LocationInformation
            location_information={draftCompany}
            onBranchDelete={handleDeletingBranch}
            onBranchUpdate={handleUpdatingBranch}
          />
        </div>
      ) : (
        <div className="rounded-small bg-b_white flex items-center justify-center font-semibold text-xl">
          <Label text={"Loading Information..."} class_name={""} />
        </div>
      )}
      {save_all && (
        <div className="inset-0 z-200 absolute top-0 left-0 bg-slate-800/60 flex items-center justify-center rounded-smal">
          <motion.div
            ref={AuthDivRef}
            className="w-[30%] bg-b_white p-4 rounded-small h-[40%] flex flex-col gap-4 items-start justify-between"
          >
            <Label
              class_name={"font-semibold text-lg text-text_b"}
              text={"Verify Authenticity"}
            />
            {authError !== "" && (
              <p className="text-red text-md font-lighter">{authError}</p>
            )}
            <LabelInput2
              autoFocus={true}
              label_style="font-lighter text-sm"
              text="Enter Current Password"
              id="verify_password"
              placeholder="Enter password..."
              type="password"
              onChange={handleAuthenticity}
            />
            <Button
              text={"Submit"}
              onclick={handleAuthentication}
              class_name="bg-g_btn w-full rounded-small py-2 text-text_white "
            />
          </motion.div>
        </div>
      )}
      <div className="sticky bottom-0 ml-auto flex items-center justify-center gap-4 flex-row bg-b_white/50 p-2 rounded-small">
        <Button
          onclick={handleCanceling}
          text="Cancel"
          class_name="border px-4 shadow-sm py-1.5 rounded-small border-lighter font-lighter bg-lighter"
        />
        <div
          onClick={handleSaveChanges}
          className="bg-g_btn shadow-sm hover:scale-[1.05] transition-all duration-120 ease-in-out cursor-pointer rounded-small flex flex-row items-center justify-center py-1.5 px-2 text-text_white"
        >
          <Icon icon={"ri-save-line"} class_name="w-5 h-5 mr-1" />
          <Label text="Save All Changes" class_name="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
