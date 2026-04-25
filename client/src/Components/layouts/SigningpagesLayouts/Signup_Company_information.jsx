import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import SelectComponent from "./SelectComponent";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import TextArea from "../../common/TextArea";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import { useQuery } from "@tanstack/react-query";

import { checkSession } from "../../../services/session.service.js";
import {
  getByUserIdService,
  updateByIdService,
  insertDataService,
} from "../../../utils/server_until/service.js";

const FORM_ELEMENTS = [
  {
    type: "text",
    placeholder: "Enter company name",
    label: "Company name*",
    id: "company_name",
  },
  {
    type: "select",
    placeholder: "Select industry type",
    label: "Industry Type*",
    id: "industry_type",
  },
  {
    type: "text",
    placeholder: "Enter company registration number",
    label: "Registration Number*",
    id: "registration_number",
  },
  {
    type: "textarea",
    placeholder: "Tell us about your company",
    label: "Description (optional)",
    id: "description",
  },
];

function Signup_Company_information() {
  const [form, setForm] = useState({
    company_name: "",
    industry_type: "",
    registration_number: "",
    description: "",
  });

  const [expand, setExpand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const target_containerRef = useRef();
  const companyInfoIdRef = useRef(null);
  const navigate = useNavigate();

  // ─── Resolve session once on mount ──────────────────────────────────────────
  useEffect(() => {
    const resolveSession = async () => {
      const { loggedIn, userId: uid } = await checkSession();
      if (!loggedIn) {
        showError("Not authenticated");
        return;
      }
      setUserId(uid);
    };
    resolveSession();
  }, []);

  // ─── Fetch company info via useQuery ────────────────────────────────────────
  const { data: companyData, isLoading: isFetching } = useQuery({
    queryKey: ["company_info", userId],
    queryFn: () =>
      getByUserIdService("api/dr/get/user-id/company_info", userId),
    enabled: !!userId,
  });

  // ─── Sync fetched data into form state ──────────────────────────────────────
  useEffect(() => {
    const data = companyData?.data?.[0];
    if (!data) return;

    setForm({
      company_name: data.company_name || "",
      industry_type: data.industry_type || "",
      registration_number: data.registration_number || "",
      description: data.description || "",
    });
    companyInfoIdRef.current = data.id;
  }, [companyData]);

  // ─── Outside click to close select ──────────────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        target_containerRef.current &&
        !target_containerRef.current.contains(e.target)
      ) {
        setExpand(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const getPayload = (uid) => ({
    company_name: form.company_name,
    industry_type: form.industry_type,
    registration_number: form.registration_number,
    description: form.description,
    user_id: uid,
  });

  // ─── Create ──────────────────────────────────────────────────────────────────
  const createCompany = async (uid) => {
    const company = await insertDataService(
      "api/dr/insert/company_info",
      getPayload(uid),
    );
    if (!company.success) throw new Error(company.message);

    await updateByIdService(
      "api/dr/update/id",
      { signup_stage: "3" },
      "users",
      uid,
    );
    showSuccess(company.message || "Company information saved!");
  };

  // ─── Update ──────────────────────────────────────────────────────────────────
  const updateCompany = async (uid) => {
    const update = await updateByIdService(
      "api/dr/update/id",
      getPayload(uid),
      "company_info",
      companyInfoIdRef.current,
    );
    if (!update.success) throw new Error(update.message);

    await updateByIdService(
      "api/dr/update/id",
      { signup_stage: "3" },
      "users",
      uid,
    );
    showSuccess(update.message || "Company information updated!");
  };

  // ─── Input handlers ──────────────────────────────────────────────────────────
  const handleInputChange = (value, id) =>
    setForm((prev) => ({ ...prev, [id]: value }));

  const handleClicking = () => setExpand((prev) => !prev);

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleNextForm = async () => {
    if (isLoading) return;

    const emptyFields = Object.keys(form).filter(
      (key) => key !== "description" && form[key] === "",
    );
    if (emptyFields.length > 0)
      return showError(`Fill ${emptyFields.join(", ")} to continue!`);

    if (!userId) return showError("Not authenticated");

    try {
      setIsLoading(true);
      if (companyInfoIdRef.current) {
        await updateCompany(userId);
      } else {
        await createCompany(userId);
      }
      navigate("/auth/signup_form/contact_information");
    } catch (err) {
      console.error(err);
      showError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Styles ──────────────────────────────────────────────────────────────────
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="w-full flex flex-col gap-2">
        <Label
          text="Create Account"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label
          text="Provide details about your company"
          class_name={label_style}
        />
      </header>

      <div className="flex overflow-y-auto mt-8 px-1 flex-col items-center justify-start gap-4 w-full text-sm">
        {FORM_ELEMENTS.map((el) => (
          <div
            key={el.id}
            className="w-full flex flex-col items-start justify-start space-y-1"
          >
            <Label text={el.label} class_name={label_style} />

            {el.type === "select" ? (
              <div
                onClick={handleClicking}
                ref={target_containerRef}
                className="relative w-full rounded-small"
              >
                <span
                  className={`absolute right-2 z-1 top-0 bottom-0 my-auto h-5 w-5 flex items-center justify-center text-md transition-all duration-150 ease-in-out ${
                    expand ? "rotate-180" : ""
                  }`}
                >
                  <Icon icon="ri-arrow-down-s-line" />
                </span>
                <Input
                  type={el.type}
                  read_only={true}
                  id={el.id}
                  onchange={handleInputChange}
                  placeholder={el.placeholder}
                  class_name={`cursor-pointer z-2 ${input_style}`}
                  value={form.industry_type}
                />
                {expand && (
                  <SelectComponent
                    toggleExpand={handleClicking}
                    handleSelecting={handleInputChange}
                  />
                )}
              </div>
            ) : el.type === "textarea" ? (
              <TextArea
                id={el.id}
                onchange={handleInputChange}
                placeholder={el.placeholder}
                class_name={`min-h-20 ${input_style}`}
                value={form.description}
              />
            ) : (
              <Input
                id={el.id}
                onchange={handleInputChange}
                placeholder={el.placeholder}
                class_name={input_style}
                value={form[el.id]}
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-full mt-4">
        <div
          onClick={handleNextForm}
          className={`flex flex-row-reverse items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small bg-g_btn text-text_white justify-center space-x-1 w-full ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <Icon icon="ri-arrow-right-line" />
          <Label text={isLoading ? "Loading..." : "Continue"} />
        </div>
      </div>

      <Already_have_account />
    </div>
  );
}

export default Signup_Company_information;
