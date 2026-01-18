import React from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Button from "../../common/Button";
import axios from "axios";
function MainTop({ infor }) {
  const handleInputChange = (value, id) => {
    console.log(`value:${value} for ${id}`);
  };

  const handleClicking = (name) => {
    if (name === "Send OTP") {
      alert("Set the Logic to post an email");
    } else if (name === "Verify Password") {
      alert("Set the logic to verify password");
    }
  };
  return (
    <div className="w-full rounded-small border border-lighter shadow-sm flex flex-row items-center justify-center">
      {Object.keys(infor).map((key, index) => {
        const autocomplete =
          key === "email" ? "off" : key === "password" ? "new-password" : "";
        return (
          <div
            key={index}
            className="flex items-start justify-center flex-col text-text_b_l gap-2 text-sm w-full p-4"
          >
            <Label text={infor[key].label} class_name={"font-lighter"} />
            <div className="w-full relative flex gap-2">
              <span className="relative w-full flex flex-1 border border-lighter rounded-small items-center justify-center ">
                <Input
                  id={key}
                  placeholder={infor[key].placeholder}
                  type={key}
                  autoComplete={autocomplete}
                  onchange={handleInputChange}
                  class_name="w-full h-full p-2 rounded-small flex-1 focus:outline-none focus:ring-2 focus:ring-light"
                />
              </span>
              <Button
                onclick={handleClicking}
                text={infor[key].button}
                class_name="bg-highlightBackground whitespace-nowrap px-2 py-1 rounded-small text-text_b"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainTop;
