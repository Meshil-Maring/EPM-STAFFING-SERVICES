import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Terms_Conditions from "../SigningpagesLayouts/Terms_Conditions";
import Already_have_account from "./Already_have_account";
import Signup_Feedback from "./Signup_Feedback";

import { createAddress } from "../../../services/user.service";
import { checkSession } from "../../../services/session.service.js";
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

  const elements = [
    {
      type: "text",
      placeholder: "132, Main, streat area",
      label: "Street Address*",
      id: "address",
    },
    { type: "text", placeholder: "Bangalore", label: "City*", id: "city" },
    { type: "text", placeholder: "Manipur", label: "State*", id: "state" },
    { type: "text", placeholder: "709222", label: "Pin Code*", id: "pin_code" },
  ];

  // ==============================
  // FETCH SESSION
  // ==============================
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
  });

  const userId = session?.userId;
  const loggedIn = session?.loggedIn;

  // ==============================
  // FETCH ADDRESS DATA via useQuery
  // ==============================
  const { data: addressData } = useQuery({
    queryKey: ["user_address", userId],
    queryFn: () => getByUserIdService("api/users/get/user_address", userId),
    enabled: !!userId && !!loggedIn,
  });

  // ==============================
  // SYNC QUERY DATA → LOCAL STATE
  // ==============================
  useEffect(() => {
    if (!addressData) return;

    const data = addressData.data?.[0];
    if (!data) return;

    addressIdRef.current = data.id;

    setForm((prev) => ({
      ...prev,
      address: data.street || "",
      city: data.city || "",
      state: data.state || "",
      pin_code: data.pin_code || "",
    }));
  }, [addressData]);

  // ==============================
  // INPUT HANDLER
  // ==============================
  const handleInputChange = (value, id) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // ==============================
  // SUBMIT / NAVIGATION
  // ==============================
  const handleNavigation = async (dir) => {
    if (isLoading) return;

    if (dir === "Back")
      return navigate("/auth/signup_form/contact_information");

    const isEmpty = Object.keys(form).filter(
      (key) => form[key] === "" && key !== "terms",
    );

    if (isEmpty.length > 0) return showError(`Fill in ${isEmpty.join(", ")}`);
    if (!form.terms)
      return showError("Read and Accept our terms and conditions to continue!");
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

      if (addressIdRef.current) {
        await updateByIdService(
          "api/dr/update/id",
          readyData,
          "user_address",
          addressIdRef.current,
        );
      } else {
        const res = await createAddress(readyData);
        if (!res.success) throw new Error(res.message);
      }

      await updateByIdService(
        "api/dr/update/id",
        { signup_stage: "completed" },
        "users",
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
    <div className="flex flex-col h-full">
      <header className="w-full flex flex-col pt-2 bg-b_white z-20 sticky top-0 items-center">
        <Label
          text="Address Details"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text={"Complete your registration"} class_name={label_style} />
      </header>

      <div className="flex flex-col px-2 py-2 overflow-y-auto mb-8 mt-8 items-center justify-start gap-4 w-full text-sm">
        {elements.map((el) => (
          <div key={el.id} className="w-full flex flex-col space-y-1">
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
      </div>

      <div>
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
                className={`flex items-center py-1 cursor-pointer transition-all rounded-small text-sm ${
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

        <Already_have_account />
      </div>

      {complete && <Signup_Feedback onClose={setComplete} />}
    </div>
  );
}

export default Signup_Address_information;
