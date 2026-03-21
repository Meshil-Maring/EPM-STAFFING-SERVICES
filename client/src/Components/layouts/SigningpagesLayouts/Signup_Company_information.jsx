import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import SelectComponent from "./SelectComponent";
import Icon from "../../common/Icon";
import Already_have_account from "./Already_have_account";
import { showError } from "../../../utils/toastUtils";
import TextArea from "../../common/TextArea";
import { useNavigate } from "react-router-dom";

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
  useEffect(() => {
    const target_ref = target_containerRef.current;
    if (!target_ref) return;
    const updateClicking = (e) => {
      if (!target_ref.contains(e.target)) setExpand(false);
    };

    window.addEventListener("mousedown", updateClicking);
    return () => window.removeEventListener("mousedown", updateClicking);
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

  const handleNextForm = () => {
    const isEmpty = Object.keys(form).filter(
      (key) => key !== "description" && form[key] === "",
    );
    if (isEmpty.length > 0) {
      return showError(`Fill ${isEmpty.join(", ")} to continue!`);
    }

    navigate("/auth/signup_form/contact_information");
  };

  // styles
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

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
                  className={`absolute right-2 z-1 top-0 bottom-0 my-auto h-5 w-5 flex items-center justify-center text-md transition-all duration-150 ease-in-out ${expand ? "rotate-180" : ""}`}
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
                  value={form["industry_type"]}
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
              />
            ) : (
              <Input
                id={el.id}
                onchange={handleInputChange}
                placeholder={el.placeholder}
                class_name={input_style}
              />
            )}
          </div>
        ))}

        {/* buttons */}
        <div className="w-full text-xs flex flex-row space-x-1 items-center justify-start">
          <Input id={"terms"} type={"checkbox"} onchange={handleInputChange} />
          <p>
            I accept the{" "}
            <span className="text-red-dark font-semibold">
              <Link>Terms and Conditions</Link>
            </span>{" "}
            and I agree to the{" "}
            <span className="text-red-dark font-semibold">
              <Link>Privacy Policy</Link>
            </span>
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 items-center justify-center mb-0">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            return (
              <div
                key={button.label}
                onClick={() => handleNavigation(button.label)}
                className={`flex flex-row items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small ${isBack ? "bg-white text-nevy_blue border border-nevy_blue" : "bg-g_btn flex-row-reverse text-text_white"} justify-center space-x-1 w-full`}
              >
                <Icon icon={button.icon} class_name="" />
                <Label text={button.label} class_name={""} />
              </div>
            );
          })}
        </div>
      </div>

      {/* <Terms_Conditions onchange={handleInputChange} /> */}

      <Already_have_account />
    </>
  );
}

export default Signup_Company_information;
