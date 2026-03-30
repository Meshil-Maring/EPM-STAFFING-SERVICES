import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Terms_Conditions from "../SigningpagesLayouts/Terms_Conditions";
import Already_have_account from "./Already_have_account";
import Signup_Feedback from "./Signup_Feedback";

import { checkSession, createAddress } from "../../../services/user.service";
import {
  getByUserIdService,
  updateByIdService,
} from "../../../utils/server_until/service.js";

function Signup_Address_information() {
  const navigate = useNavigate();
  const addressIdRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pin_code: "",
    terms: false,
  });

  const [dataVersion, setDataVersion] = useState(0);

  const elements = [
    {
      type: "text",
      placeholder: "132, Main, streat area",
      label: "Street Address*",
      id: "address",
    },
    {
      type: "text",
      placeholder: "Bangalore",
      label: "City*",
      id: "city",
    },
    {
      type: "text",
      placeholder: "Manipur",
      label: "State*",
      id: "state",
    },
    {
      type: "text",
      placeholder: "709222",
      label: "Pin Code*",
      id: "pin_code",
    },
  ];

  // ==============================
  // LOAD DATA (FETCH EXISTING)
  // ==============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const { userId, loggedIn } = await checkSession();
        if (!loggedIn) return;

        const { data } = await getByUserIdService(
          "api/users/get/user_address",
          userId,
        );

        if (!data) return;

        addressIdRef.current = data.id;

        setForm((prev) => ({
          ...prev,
          address: data.street || "",
          city: data.city || "",
          state: data.state || "",
          pin_code: data.pin_code || "",
        }));

        setDataVersion((prev) => prev + 1);

        console.log("✅ Address loaded:", data);
      } catch (err) {
        console.error("Error loading address:", err);
      }
    };

    loadData();
  }, []);

  // ==============================
  // INPUT HANDLER
  // ==============================
  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ==============================
  // SUBMIT / NAVIGATION
  // ==============================
  const handleNavigation = async (dir) => {
    if (isLoading) return;

    if (dir === "Back")
      // navigating back to contact information
      return navigate("/auth/signup_form/contact_information");
    const isEmpty = Object.keys(form).filter(
      (key) => form[key] === "" && key !== "terms",
    );

    if (isEmpty.length > 0) return showError(`Fill in ${isEmpty.join(", ")}`);

    if (!form.terms)
      return showError("Read and Accept our terms and conditions to continue!");

    const { loggedIn, userId } = await checkSession();
    if (!loggedIn) return showError("Not authenticated");

    try {
      setIsLoading(true);

      const readyData = {
        street: form.address,
        city: form.city,
        state: form.state,
        pin_code: form.pin_code,
        user_id: userId,
      };

      // ==============================
      // UPDATE OR CREATE
      // ==============================
      if (addressIdRef.current) {
        await updateByIdService(
          readyData,
          "api/users/update/user_address/id",
          addressIdRef.current,
        );
      } else {
        const res = await createAddress(readyData);
        if (!res.success) throw new Error(res.message);
      }

      // update signup stage
      await updateByIdService(
        { signup_stage: "completed" },
        "api/users/update/users/id",
        userId,
      );

      setComplete(true);
    } catch (err) {
      console.error(err);
      showError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // navigation buttons: next form or previous
  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Complete Registration", icon: "ri-arrow-right-line" },
  ];

  // ==============================
  // STYLES
  // ==============================
  const label_style = "text-sm font-medium text-gray-600 text-start";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0 items-center">
        <Label
          text="Address Details"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text={"Complete your registration"} class_name={label_style} />
      </header>

      {/* main component fields */}
      <div className="flex flex-col items-center justify-start gap-4 w-full text-sm">
        {elements.map((el) => (
          <div
            key={`${el.id}-${dataVersion}`}
            className="w-full flex flex-col space-y-1"
          >
            <Label text={el.label} class_name={label_style} />
            <Input
              onchange={handleInputChange}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              class_name={input_style}
              value={form[el.id] || ""}
            />
          </div>
        ))}

        <Terms_Conditions onchange={handleInputChange} />

        <div className="w-full grid grid-cols-2 gap-4">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            const isDisabled =
              isLoading && button.label === "Complete Registration";

            return (
              <div
                key={button.label}
                onClick={() => !isDisabled && handleNavigation(button.label)}
                className={`flex items-center py-1 cursor-pointer transition-all rounded-small ${
                  isBack
                    ? "bg-white text-nevy_blue border border-nevy_blue"
                    : "bg-g_btn flex-row-reverse text-text_white"
                } justify-center space-x-1 w-full ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              >
                <Icon icon={button.icon} />
                <Label
                  text={isDisabled ? "Loading..." : button.label}
                  class_name="whitespace-nowrap"
                />
              </div>
            );
          })}
        </div>
      </div>

      <Already_have_account />
      {/* Registration successfull backback */}
      {complete && <Signup_Feedback onClose={setComplete} />}
    </>
  );
}

export default Signup_Address_information;
