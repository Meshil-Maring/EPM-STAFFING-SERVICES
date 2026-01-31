import React, { useState } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Button from "../../../common/Button";
import TextArea from "../../../common/TextArea";
import Header from "./Common/Header";

function Commenting({ candidate, closeOverlay }) {
  const limit = 1000;
  const handleClosingModal = () => {
    closeOverlay;
  };

  const [text, setText] = useState("");

  const handleTyping = (value) => {
    setText(value);
  };

  const isLimitReached = text.length === limit;
  return (
    <div className="flex w-full text-[clamp(1em,1vw,1.2em)] flex-col items-start justify-start">
      <Header
        candidate_name={candidate.name}
        heading={"Add Comment"}
        handleClosingModal={closeOverlay}
      />
      <div className="flex flex-row flex-wrap w-full items-center gap-2 px-4">
        {["Interview Feedback", "Interview Feedback", "Rejection Reason"].map(
          (button, index) => {
            const isInterviewFeedback = button === "Interview Feedback";
            const isRejectionReason = button === "Rejection Reason";

            return (
              <Button
                key={index}
                text={button}
                class_name={`px-2 py-1 rounded-large whitespace-nowrap text-[clamp(0.8em, 1vw,1.2em)] border border-light cursor-pointer`}
              />
            );
          },
        )}
      </div>
      <div className="w-full p-4 gap-1 flex flex-col items-end justify-start">
        <TextArea
          onchange={handleTyping}
          max_words={limit}
          placeholder={"Write your feedback or internal note here..."}
          class_name="w-full p-2 focus:outline-none focus:ring-1 ring-lighter border border-lightBorder h-30 rounded-small border-border1"
        />
        <Label
          text={`${text.length}/${limit}`}
          class_name={`ml-auto ${isLimitReached ? "text-red-dark" : ""}`}
        />
      </div>
      <div className="w-full p-4 flex flex-row items-center justify-end gap-4">
        {["Cancel", "Save Comment"].map((btn) => {
          const isCancel = btn === "Cancel";
          return (
            <Button
              key={btn}
              text={btn}
              class_name={`px-2 py-1 rounded-small ${isCancel ? "border border-lighter hover:bg-lighter" : "bg-g_btn text-text_white"}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Commenting;
