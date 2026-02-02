import React, { useState } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Button from "../../../common/Button";
import TextArea from "../../../common/TextArea";
import Header from "./Common/Header";
import OverlayButtons from "./Common/OverlayButtons";

function Commenting({ candidate, closeOverlay }) {
  const limit = 1000;

  const buttons = ["Cancel", "Save Comment"];
  const [text, setText] = useState("");
  const [activeTag, setActiveTag] = useState("Interview Feedback");

  const handleTyping = (value) => {
    setText(value);
  };

  const handleMainButtonClick = (name) => {
    if (name === "Cancel") {
      closeOverlay();
      return;
    }

    if (text.trim() === "") {
      alert("Please enter a comment before saving.");
      return;
    }

    alert(`Comment saved for ${candidate.name}: ${text}`);
    closeOverlay();
  };

  const isLimitReached = text.length >= limit;

  return (
    <div className="flex w-full text-[clamp(0.85em,1vw,1.1em)] flex-col items-start justify-start bg-b_white rounded-small overflow-hidden">
      <Header
        candidate_name={candidate.name}
        heading={"Add Comment"}
        handleClosingModal={closeOverlay}
      />

      {/* Quick Action Tags */}
      <div className="flex flex-col w-full gap-2 px-4 py-2">
        <Label
          text="Select Category"
          class_name="font-semibold text-xs text-text_l_b"
        />
        <div className="flex flex-row flex-wrap w-full items-center gap-2">
          {["Interview Feedback", "Technical Note", "Rejection Reason"].map(
            (button, index) => {
              const isActive = activeTag === button;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTag(button)}
                  className={`px-3 py-1 rounded-large whitespace-nowrap text-xs transition-all duration-200 border ${
                    isActive
                      ? "bg-lighter border-light text-text_b font-medium"
                      : "bg-white border-lighter text-text_l_b hover:border-light"
                  }`}
                >
                  {button}
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="w-full p-4 gap-2 flex flex-col items-end justify-start">
        <div className="w-full relative group">
          <TextArea
            onchange={handleTyping}
            max_words={limit}
            placeholder={`Add your ${activeTag.toLowerCase()}...`}
            class_name={`w-full p-3 min-h-[120px] focus:outline-none transition-all duration-300 border rounded-small resize-none bg-white 
              ${isLimitReached ? "border-red-dark ring-1 ring-red-dark" : "border-lightBorder focus:ring-1 focus:ring-lighter"}
            `}
          />
        </div>

        {/* Character Counter with styling based on limit */}
        <div className="flex flex-row items-center gap-1">
          {isLimitReached && (
            <Icon
              icon="ri-error-warning-line"
              class_name="text-red-dark text-xs"
            />
          )}
          <Label
            text={`${text.length}/${limit}`}
            class_name={`text-[10px] font-medium transition-colors duration-200 ${
              isLimitReached ? "text-red-dark font-bold" : "text-gray-400"
            }`}
          />
        </div>
      </div>

      <OverlayButtons
        buttons={buttons}
        handleMainButton={handleMainButtonClick}
      />
    </div>
  );
}

export default Commenting;
