import React, { useContext, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Terms_Conditions from "../SigningpagesLayouts/Terms_Conditions";
import Already_have_account from "./Already_have_account";

import { checkSession, createAddress } from "../../../services/user.service";
import { updateData } from "../../../utils/server_until/user.js";

function Signup_Address_information() {
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pin_code: "",
    terms: false,
  });

  const navigate = useNavigate();

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

  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Next form:  component
  const handleNavigation = async (dir) => {
    if (dir === "Back")
      return navigate("/auth/signup_form/contact_information");
    const isEmpty = Object.keys(form).filter(
      (key) => form[key] === "" && key !== "terms",
    );
    if (isEmpty.length > 0) return showError(`Fill in ${isEmpty.join(", ")}`);

    if (form.terms === false)
      return showError("Read and Accept our terms and conditions to continue!");

    // check user
    const { loggedIn, userId } = await checkSession();

    if (!loggedIn) return showError("Not authenticated");

    // Ready to post to backend
    const readyData = {
      street: form.address,
      city: form.city,
      state: form.state,
      pin_code: form.pin_code,
      user_id: userId,
    };

    // Insert address data
    const res = await createAddress(readyData);

    // update signup stage
    await updateData(
      { signup_stage: "completed" },
      "api/users/update/users",
      userId,
    );

    if (!res.success) return showError(res.message);

    // implementation of the backend posting here...
    navigate("/auth/signin");
  };

  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Complete Registration", icon: "ri-arrow-right-line" },
  ];

  // styles
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0">
        <Label
          text="Address Details"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text={"Complete your registration"} class_name={label_style} />
      </header>

      <div className="flex flex-col items-center justify-start gap-4 w-full text-sm">
        {elements.map((el) => (
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
            />
          </div>
        ))}

        <div className="w-full grid grid-cols-2 gap-4 items-center justify-center mb-0">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            return (
              <div
                key={button.label}
                onClick={() => handleNavigation(button.label)}
                className={`flex flex-row items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small ${isBack ? "bg-white text-nevy_blue border border-nevy_blue" : "bg-g_btn flex-row-reverse text-text_white"} justify-center space-x-1 w-full`}
              >
                <Icon icon={button.icon} class_name="" />
                <Label text={button.label} class_name={"whitespace-nowrap"} />
              </div>
            );
          })}
        </div>
      </div>

      <Terms_Conditions onchange={handleInputChange} />

      <Already_have_account />
    </>
  );
}

export default Signup_Address_information;
