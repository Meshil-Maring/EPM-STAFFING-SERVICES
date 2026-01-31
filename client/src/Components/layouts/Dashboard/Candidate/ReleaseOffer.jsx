import React, { useState } from "react";
import Header from "./Common/Header";
import LabelInput from "../../../common/LabelInput";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import OptionalTextArea from "./OptionalTextArea";

function ReleaseOffer({ candidate, handleClosing }) {
  const [value, setValue] = useState("Full-Time");
  const [isShow, setIsShow] = useState(false);
  const handleInputChange = (value, id) => {
    // logic
  };
  const candidate_name = candidate.name;
  const input_class_style =
    "w-full border border-lighter py-1 px-2 rounded-small";
  return (
    <div className="w-full h-full flex items-center text-[clamp(1em,1vw,1.2em)] text-text_l_b justify-start flex-col">
      <Header
        candidate_name={candidate_name}
        heading={"Release Offer"}
        handleClosingModal={handleClosing}
      />
      <div className="grid grid-cols-2 items-center justify-center">
        {["Job Role", "Offered CTC (LPA)", "Joining Date", "Offer Type"].map(
          (label) => {
            const isRole = label === "Job Role";
            const isOffered = label === "Offered CTC(LPA)";
            const isJoiningDate = label === "Joining Date";
            const isType = label === "Offer Type";
            const placeholder = isRole
              ? "Frontend Developer"
              : isOffered
                ? "22"
                : "";

            const type = isJoiningDate ? "date" : "text";
            return isType ? (
              <div key={label} className="flex w-full relative">
                <Input
                  read_only={true}
                  id={"joining date"}
                  type="text"
                  class_name={input_class_style}
                  onchange={handleInputChange}
                  value={value}
                />
                <span
                  onClick={() => setIsShow((prev) => !prev)}
                  className="absolute top-0 bottom-0 flex items-center justify-center right-2"
                >
                  <Icon
                    icon={
                      isShow ? "ri-arrow-s-up-line" : "ri-arrow-s-down-line"
                    }
                    class_name=""
                  />
                </span>
              </div>
            ) : (
              <LabelInput
                key={label}
                onchange={handleInputChange}
                id={label.toLowerCase()}
                text={label}
                label_class_name=""
                input_class_name={input_class_style}
                type={type}
                placeholder={placeholder}
              />
            );
          },
        )}
      </div>
      <div className="flex w-full p-4 flex-col items-start justify-start">
        <Label text={"Attach Offer Letter (PDF)"} class_name={""} />
        <Input
          type={"file"}
          class_name={
            "border-2 border-light cursor-pointer border-dotted h-20 w-full text-center flex items-center rounded-small"
          }
        />
      </div>
      <OptionalTextArea
        input_class_style={input_class_style}
        id="message"
        text={"Message to Candidate (optional)"}
        handleInputChange={handleInputChange}
        value={"Congratulations! We are pleased to offer you..."}
      />
    </div>
  );
}

export default ReleaseOffer;
