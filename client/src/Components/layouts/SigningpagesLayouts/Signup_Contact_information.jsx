import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import Button from "../../common/Button";

import { createContactInfo } from "../../../services/user.service";
import { checkSession } from "../../../services/session.service.js";
import {
  getByUserIdService,
  updateByIdService,
} from "../../../utils/server_until/service.js";

function Signup_user_contactsrmation() {
  const navigate = useNavigate();
  const contactIdRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [temp_form, setTemp_form] = useState({ label: "", value: "" });

  const [elements, setElements] = useState([
    {
      type: "email",
      placeholder: "Enter company contact email",
      label: "Email*",
      id: "email",
    },
    {
      type: "tel",
      placeholder: "Enter company mobile number",
      label: "Mobile Number*",
      id: "mobile_number",
    },
  ]);

  const [form, setForm] = useState({ email: "", mobile_number: "" });

  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Continue", icon: "ri-arrow-right-line" },
  ];

  // ==============================
  // FETCH SESSION FIRST
  // ==============================
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
  });

  const userId = session?.userId;
  const loggedIn = session?.loggedIn;

  // ==============================
  // FETCH CONTACT DATA via useQuery
  // ==============================
  const { data: contactData } = useQuery({
    queryKey: ["user_contacts", userId],
    queryFn: () => getByUserIdService("api/users/get/user_contacts", userId),
    enabled: !!userId && !!loggedIn, // only runs when userId is available and user is logged in
  });

  // ==============================
  // SYNC QUERY DATA → LOCAL STATE
  // ==============================
  useEffect(() => {
    if (!contactData) return;

    const data = contactData.data?.[0];
    if (!data) return;

    contactIdRef.current = data.id;

    setForm({
      email: data.email || "",
      mobile_number: data.phone || "",
      ...(data.others || {}),
    });

    if (data.others && Object.keys(data.others).length > 0) {
      const newDynamicElements = Object.keys(data.others).map((key) => ({
        label: key,
        id: key,
        type: "text",
      }));

      setElements((prev) => {
        const existingIds = new Set(prev.map((el) => el.id));
        const filtered = newDynamicElements.filter(
          (el) => !existingIds.has(el.id),
        );
        return [...prev, ...filtered];
      });
    }
  }, [contactData]);

  // ==============================
  // INPUT HANDLERS
  // ==============================
  const handleInputChange = (value, id) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleNewContactInputChange = (value, id) => {
    setTemp_form((prev) => ({ ...prev, [id]: value }));
  };

  // ==============================
  // ADD FIELD
  // ==============================
  const handleAdd = () => {
    if (!temp_form.label || !temp_form.value) return;

    const id = temp_form.label.toLowerCase().replace(/\s+/g, "_");

    if (elements.some((el) => el.id === id)) {
      return showError("Contact already exist!");
    }

    setElements((prev) => [
      ...prev,
      { label: temp_form.label, id, type: "text" },
    ]);
    setForm((prev) => ({ ...prev, [id]: temp_form.value }));
    setTemp_form({ label: "", value: "" });
    setAddContact(false);
  };

  // ==============================
  // SUBMIT
  // ==============================
  const handleNavigation = async (dir) => {
    if (isLoading) return;

    if (dir === "Back")
      return navigate("/auth/signup_form/company_information");

    if (!form.email) return showError("Missing email!");
    if (!form.mobile_number) return showError("Mobile number missing!");
    if (!loggedIn) return showError("Not Authenticated");

    try {
      setIsLoading(true);

      const { email, mobile_number, ...others } = form;
      const readyData = {
        email,
        phone: mobile_number,
        user_id: userId,
        others,
      };

      if (contactIdRef.current) {
        await updateByIdService(
          "api/dr/update/id",
          readyData,
          "user_contacts",
          contactIdRef.current,
        );
        showSuccess("Update successfully");
      } else {
        await createContactInfo(readyData);
      }

      await updateByIdService(
        "api/dr/update/id",
        { signup_stage: "4" },
        "users",
        userId,
      );
      navigate("/auth/signup_form/address_information");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ==============================
  // STYLES
  // ==============================
  const label_style = "text-sm font-medium text-gray-600";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <div className="flex flex-col h-full">
      <header className="w-full flex items-center flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0">
        <Label
          text="Contact Information"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label
          text={"Provide Company contact details"}
          class_name={label_style}
        />
      </header>

      <div className="flex flex-col gap-4 w-full p-2 text-sm overflow-y-auto mb-4">
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

        <Button
          text={addContact ? "Add" : "+ Add New"}
          class_name={`py-1.5 p-4 font-semibold rounded-small mr-auto ${
            addContact
              ? "bg-g_btn text-text_white"
              : "border-nevy_blue border-2"
          }`}
          onclick={() =>
            addContact ? handleAdd() : setAddContact((prev) => !prev)
          }
        />

        {addContact && (
          <div className="w-full flex flex-col space-y-2">
            <Input
              id="label"
              placeholder="LinkedIn"
              onchange={handleNewContactInputChange}
              class_name={input_style}
              value={temp_form.label}
            />
            <Input
              id="value"
              placeholder="https://linkedin.com"
              onchange={handleNewContactInputChange}
              class_name={input_style}
              value={temp_form.value}
            />
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mt-auto">
        {buttons.map((button) => {
          const isBack = button.label === "Back";
          const isContinue = button.label === "Continue";
          return (
            <div
              key={button.label}
              onClick={() => handleNavigation(button.label)}
              className={`flex items-center py-1 cursor-pointer hover:scale-[1.02] transition-all rounded-small ${
                isBack
                  ? "bg-white text-nevy_blue border border-nevy_blue"
                  : "bg-g_btn flex-row-reverse text-text_white"
              } justify-center space-x-1 w-full ${isContinue && isLoading ? "opacity-70 pointer-events-none" : ""}`}
            >
              <Label
                text={isContinue && isLoading ? "Loading..." : button.label}
              />
            </div>
          );
        })}
      </div>
      <Already_have_account />
    </div>
  );
}

export default Signup_user_contactsrmation;
