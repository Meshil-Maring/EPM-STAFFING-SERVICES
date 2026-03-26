import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input"; // ✅ back to your UI
import Icon from "../../common/Icon";
import { showError } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import Button from "../../common/Button";

import {
  checkSession,
  createContactInfo,
} from "../../../services/user.service";
import {
  getByUserIdService,
  updateByIdService,
} from "../../../utils/server_until/service.js";

function Signup_user_contactsrmation() {
  const navigate = useNavigate();
  const contactIdRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [addContact, setAddContact] = useState(false);

  const [temp_form, setTemp_form] = useState({
    label: "",
    value: "",
  });

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

  const [form, setForm] = useState({
    email: "",
    mobile_number: "",
  });

  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Continue", icon: "ri-arrow-right-line" },
  ];

  // ==============================
  // LOAD DATA
  // ==============================
  useEffect(() => {
    const loadData = async () => {
      try {
        const { userId, loggedIn } = await checkSession();
        if (!loggedIn) return;

        const { data } = await getByUserIdService(
          "api/users/get/user_contacts",
          userId,
        );

        if (!data) return;

        contactIdRef.current = data.id;

        const newForm = {
          email: data.email || "",
          mobile_number: data.phone || "", // ✅ FIX
        };

        let newElements = [];

        if (data.others) {
          newElements = Object.keys(data.others).map((key) => ({
            label: key,
            id: key,
            type: "text",
            value: data.others[key],
          }));

          Object.keys(data.others).forEach((key) => {
            newForm[key] = data.others[key];
          });
        }

        setForm(newForm);

        setElements((prev) => {
          const ids = new Set(prev.map((el) => el.id));
          const filtered = newElements.filter((el) => !ids.has(el.id));
          return [...prev, ...filtered];
        });
      } catch (err) {
        console.error(err);
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
      {
        label: temp_form.label,
        id,
        type: "text",
      },
    ]);

    setForm((prev) => ({
      ...prev,
      [id]: temp_form.value,
    }));

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
    if (!form.mobile_number || form.mobile_number.length < 4)
      return showError("Mobile number missing!");

    const { userId, loggedIn } = await checkSession();
    if (!loggedIn) return showError("Not Authenticated");

    try {
      setIsLoading(true);

      const { email, mobile_number, ...others } = form;

      const readyData = {
        email,
        phone: mobile_number, // ✅ FIX
        user_id: userId,
        others,
      };

      if (contactIdRef.current) {
        await updateByIdService(
          readyData,
          "api/users/update/user_contacts/id",
          contactIdRef.current,
        );
      } else {
        await createContactInfo(readyData);
      }

      await updateByIdService(
        { signup_stage: "4" },
        "api/users/update/users/id",
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
  // STYLES (UNCHANGED)
  // ==============================
  const label_style = "text-sm font-medium text-gray-600";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
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

      <div className="flex flex-col items-start justify-start gap-4 w-full overfow-hidden p-2 text-sm">
        {elements.map((el) => (
          <div key={el.id} className="w-full flex flex-col  space-y-1">
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
          class_name={`py-1.5 p-4 font-semibold tracking-wide rounded-small mr-auto ${
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
              placeholder="https//linkedin.com"
              onchange={handleNewContactInputChange}
              class_name={input_style}
              value={temp_form.value}
            />
          </div>
        )}

        <div className="w-full grid grid-cols-2 gap-2 items-center justify-center mb-0">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            return (
              <div
                key={button.label}
                onClick={() => handleNavigation(button.label)}
                className={`flex flex-row items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small ${
                  isBack
                    ? "bg-white text-nevy_blue border border-nevy_blue"
                    : "bg-g_btn flex-row-reverse text-text_white"
                } justify-center space-x-1 w-full`}
              >
                <Icon icon={button.icon} />
                <Label text={button.label} />
              </div>
            );
          })}
        </div>

        <Already_have_account />
      </div>
    </>
  );
}

export default Signup_user_contactsrmation;
