import React from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Button from "../../common/Button";

function MainTop({ onCompanyDelete, onCompanyInputChange }) {
  const handleClicking = (name) => {
    if (name === "Send OTP") {
      alert("Set the Logic to post an email");
    } else if (name === "Verify Password") {
      alert("Set the logic to verify password");
    }
  };

  const infor = [
    {
      name: "Send OTP",
      label: "Email",
      placeholder: "Enter Current Email Address",
    },
    {
      name: "Verify Password",
      label: "Password",
      placeholder: "Enter current password",
    },
  ];

  return (
    <div className="w-full rounded-small border-lighter shadow-sm flex flex-col items-start justify-start">
      <div className="w-full flex flex-row items-center justify-center">
        {infor.map((button, index) => {
          const autocomplete =
            button.label === "Email"
              ? "off"
              : button.label === "Password"
                ? "password"
                : "";
          return (
            <div
              key={index}
              className="flex items-start justify-center flex-col text-text_b_l gap-2 text-sm w-full p-4"
            >
              <Label text={button.label} class_name={"font-lighter"} />
              <div className="w-full relative flex gap-2">
                <span className="relative w-full flex flex-1 border border-lighter rounded-small items-center justify-center ">
                  <Input
                    input_target={"input_confirm"}
                    id={button.label.toLocaleLowerCase()}
                    placeholder={button.placeholder}
                    type={button}
                    autoComplete={autocomplete}
                    onchange={onCompanyInputChange}
                    class_name={`w-full h-full p-2 rounded-small flex-1 focus:outline-none focus:ring-2 focus:ring-light`}
                  />
                </span>
                <Button
                  onclick={handleClicking}
                  text={button.name}
                  class_name="bg-highlightBackground whitespace-nowrap px-3 py-1 absolute right-1 top-0 bottom-0 my-1 rounded-small text-text_b"
                />
              </div>
            </div>
          );
        })}
      </div>
      <Button
        class_name="bg-g_btn px-3 py-1.5 mx-4 mb-4 rounded-small text-text_white"
        text={"Delete Account"}
        onclick={onCompanyDelete}
      />
    </div>
  );
}

export default MainTop;
