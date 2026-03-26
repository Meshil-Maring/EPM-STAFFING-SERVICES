import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import SelectComponent from "./SelectComponent";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import TextArea from "../../common/TextArea";
import { useNavigate, Link } from "react-router-dom";
import Already_have_account from "./Already_have_account";

import { createCompanyInfo } from "../../../services/user.service";
import {
  getDataByUserIdService,
  updateDataService,
} from "../../../utils/server_until/user.service.js";
import { checkSession } from "../../../services/user.service";

function Signup_Company_information() {
  const [form, setForm] = useState({
    company_name: "",
    industry_type: "",
    registration_number: "",
    description: "",
  });

  const [expand, setExpand] = useState(false);
  const target_containerRef = useRef();
  const navigate = useNavigate();

  // Varible
  let companyInfoId = "";

  // ==============================
  // Helper function
  // ===============================

  // ==============================
  // Use Effect function
  // ===============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const { loggedIn, userId } = await checkSession();

        if (!loggedIn) {
          showError("Not authenticated");
          return;
        }

        const { data } = await getDataByUserIdService(
          "api/users/get/company_info",
          userId,
        );

        if (data) {
          setForm({
            company_name: data.company_name || "",
            industry_type: data.industry_type || "",
            registration_number: data.registration_number || "",
            description: data.description || "",
          });
        }

        companyInfoId = data.id;
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

    //click outside fix
    const updateClicking = (e) => {
      if (
        target_containerRef.current &&
        !target_containerRef.current.contains(e.target)
      ) {
        setExpand(false);
      }
    };

    document.addEventListener("click", updateClicking);

    return () => {
      document.removeEventListener("click", updateClicking);
    };
  }, []);

  const elements = [
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

  const handleInputChange = (value, id) =>
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

  const handleClicking = () => setExpand((prev) => !prev);

  const handleNextForm = async (type) => {
    const isEmpty = Object.keys(form).filter(
      (key) => key !== "description" && form[key] === "",
    );

    if (isEmpty.length > 0) {
      return showError(`Fill ${isEmpty.join(", ")} to continue!`);
    }

    // check user is auth or not
    const { loggedIn, userId } = await checkSession();

    if (!loggedIn) return showError("Not authenticated");

    // making ready to post data
    const readyData = {
      company_name: form.company_name,
      industry_type: form.industry_type,
      registration_number: form.registration_number,
      user_id: userId,
      description: form.description,
    };

    // create company information
    await createCompanyInfo(readyData);

    await updateData({ signup_stage: "3" }, "api/users/update/users", userId);

    navigate("/auth/signup_form/contact_information");
  };

  // styles (UNCHANGED)
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  const buttons = [{ label: "Continue", icon: "ri-arrow-right-line" }];

  return (
    <>
      <header className="w-full flex flex-col gap-2">
        <Label
          text="Create Account"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label
          text={"Provide details about your company"}
          class_name={label_style}
        />
      </header>

      <div className="flex flex-col items-center justify-start gap-4 w-full text-sm">
        {elements.map((el) => (
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
                  onClick={handleClicking}
                  className={`absolute right-2 z-1 top-0 bottom-0 my-auto h-5 w-5 flex items-center justify-center text-md transition-all duration-150 ease-in-out ${
                    expand ? "rotate-180" : ""
                  }`}
                >
                  <Icon icon={"ri-arrow-down-s-line"} />
                </span>

                <Input
                  type={el.type}
                  read_only={true}
                  id={el.id}
                  onchange={handleInputChange}
                  placeholder={el.placeholder}
                  class_name={`cursor-pointer z-2 ${input_style}`}
                  value={form.industry_type} // already correct
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

        <div className="w-full grid grid-cols-1 mt-4 gap-2 items-center justify-center mb-0">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            return (
              <div
                key={button.label}
                onClick={() => handleNextForm(button.label)}
                className={`flex flex-row items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small ${
                  isBack
                    ? "bg-white text-nevy_blue border border-nevy_blue"
                    : "bg-g_btn flex-row-reverse text-text_white"
                } justify-center space-x-1 w-full`}
              >
                <Icon icon={button.icon} class_name="" />
                <Label text={button.label} class_name={""} />
              </div>
            );
          })}
        </div>

        <Already_have_account />
      </div>
    </>
  );
}

export default Signup_Company_information;
