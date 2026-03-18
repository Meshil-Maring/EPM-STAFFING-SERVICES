import React, { useContext, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError } from "../../../utils/toastUtils";
import { signup_form_context } from "../../../context/SignupFormContext";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import Button from "../../common/Button";

function Signup_Contact_information() {
  const { form, setForm } = useContext(signup_form_context);
  const navigate = useNavigate();
  const [addContact, setAddContact] = useState(false);
  const [temp_form, setTemp_form] = useState({
    label: "",
    value: "",
  });

  const elements = [
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
      id: "mobile number",
    },
  ];

  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Continue", icon: "ri-arrow-right-line" },
  ];

  const handleOnRemoveContact = (i) => {
    const contacts = form["contact information"];
    const updated = [...contacts.slice(0, i), ...contacts.slice(i + 1)];
    setForm((prev) => ({ ...prev, "contact information": [updated] }));
  };

  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddNewContact = () => {
    setTemp_form({ label: "", value: "" });
    setAddContact(true);
  };

  const handleNewContactInputChange = (value, id) => {
    setTemp_form((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = () => {
    if (temp_form.label !== "" && temp_form.value !== "")
      setForm((prev) => ({
        ...prev,
        "contact information": [
          ...(prev["contact information"] || []),
          temp_form,
        ],
      }));
    setAddContact(false);
  };

  const handleNavigation = (dir) => {
    if (dir === "Back") return navigate("/auth/signup_form");
    if (form.email === "") return showError("Missing email!");
    if (form["mobile number"] === "" || form["mobile number"].length < 4)
      return showError("Mobile number missing!");
    navigate("/auth/signup_form/address_information");
  };

  // styles
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0">
        <Label
          text="Contact Information"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label
          text={"Provide Company contact details"}
          class_name={label_style}
        />
      </header>

      <div className="flex flex-col items-center justify-start gap-4 w-full overfow-hidden p-2 text-sm">
        {elements.map((el) => {
          return (
            <div
              key={el.id}
              className="w-full flex flex-col items-start justify-start space-y-1"
            >
              <Label text={el.label} class_name={label_style} />
              <Input
                onchange={handleInputChange}
                type={el.type}
                id={el.id}
                placeholder={el.placeholder}
                class_name={input_style}
                default_value={form[el.id]}
              />
            </div>
          );
        })}

        <div className="flex p-2 border border-lighter flex-col items-start justify-start space-y-2 rounded-small bg-lighter w-full">
          {form["contact information"]?.map((contact, i) => {
            return (
              <div
                key={`contact-${i}`}
                className="w-full flex relative flex-col items-start justify-start"
              >
                <span
                  onClick={() => handleOnRemoveContact(i)}
                  className="w-5 h-5 absolute right-0 top-0 hover:bg-red-light hover:text-red-dark rounded-full flex items-center justify-center cursor-pointer hover:rotate-180 transition-all duration-150 ease-in-out"
                >
                  <Icon
                    icon={"ri-close-line"}
                    class_name="h-4 w-4 rounded-full flex items-center justify-center"
                  />
                </span>

                <Label text={contact.label} class_name={label_style} />
                <Input
                  read_only={true}
                  value={contact.value}
                  class_name={`bg-b_white ${input_style}`}
                />
              </div>
            );
          })}
          <Button
            onclick={handleAddNewContact}
            text={"+ Add Contact Info"}
            class_name={`w-full text-center py-1.5 border rounded-small border-b_white bg-g_btn text-text_white ${addContact ? "hidden" : ""}`}
          />
        </div>
        {addContact && (
          <div className="w-full flex flex-col items-start justify-start space-y-2">
            <Button
              text={"+ Add"}
              class_name={"bg-g_btn text-text_white py-1.5 p-4 rounded-small"}
              onclick={handleAdd}
            />
            <div className="w-full flex flex-col items-start justify-start space-y-1">
              <Label text={"Contact Label"} class_name={label_style} />
              <Input
                id={"label"}
                onchange={handleNewContactInputChange}
                class_name={input_style}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start space-y-1">
              <Label text={"Contact Value"} class_name={label_style} />
              <Input
                id={"value"}
                onchange={handleNewContactInputChange}
                class_name={input_style}
              />
            </div>
          </div>
        )}
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
        <Already_have_account />
      </div>

      {/* <Terms_Conditions onchange={handleInputChange} /> */}
    </>
  );
}

export default Signup_Contact_information;
