import React, { useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import Button from "../../common/Button";
import {
  checkSession,
  createContactInfo,
} from "../../../services/user.service";
import { updateData } from "../../../utils/server_until/user.js";

function Signup_Contact_information() {
  const [form, setForm] = useState({
    email: "",
    mobile_number: "",
  });
  const navigate = useNavigate();
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

  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Continue", icon: "ri-arrow-right-line" },
  ];

  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNewContactInputChange = (value, id) => {
    setTemp_form((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = () => {
    if (temp_form.label !== "" && temp_form.value !== "") {
      const exist = Object.keys(form).filter(
        (key) =>
          key.toLocaleLowerCase() === temp_form.label.toLocaleLowerCase(),
      );
      if (exist?.length > 0) return showError("Contact already exist!");
      const { label, value } = temp_form;
      const new_form = { ...form, [label]: value };
      setForm(new_form);

      const contact_id = temp_form.label
        .toLocaleLowerCase()
        .split(" ")
        .join("_");
      setElements((prev) => [
        ...prev,
        {
          label: temp_form.label,
          id: contact_id,
          type: "text",
          value: temp_form.value,
        },
      ]);
    }
    setTemp_form({ label: "", value: "" });
    setAddContact(false);
  };

  const handleNavigation = async (dir) => {
    if (dir === "Back")
      return navigate("/auth/signup_form/company_information");
    if (form.email === "") return showError("Missing email!");
    if (form["mobile_number"] === "" || form["mobile_number"].length < 4)
      return showError("Mobile number missing!");

    const empty_fields = Object.keys(form).filter((key) => form[key] === "");
    if (empty_fields.length > 0) {
      empty_fields.map((key) => {
        const { [key]: removed, ...rest } = form;
        setForm(rest);
      });
    }

    // check user is auth or not
    const { userId, loggedIn } = await checkSession();

    if (!loggedIn) return showError("Not Authenticated");

    // filter for ready to post
    const readyData = (({ email, mobile_number, ...others }) => ({
      email,
      phone: mobile_number,
      user_id: userId,
      others,
    }))(form);

    // insert
    await createContactInfo(readyData);

    // update signup stage
    await updateData({ signup_stage: "4" }, "api/users/update/users", userId);

    // logic to post the form here...
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
                default_value={el.value ? el.value : form[el.id]}
              />
            </div>
          );
        })}
        <Button
          text={addContact ? "Add" : "+ Add New"}
          class_name={`py-1.5 p-4 font-semibold tracking-wide rounded-small mr-auto ${addContact ? "bg-g_btn text-text_white" : "border-nevy_blue border-2"}`}
          onclick={() =>
            addContact ? handleAdd() : setAddContact((prev) => !prev)
          }
        />

        {addContact && (
          <div className="w-full flex flex-col items-start justify-start space-y-2">
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
