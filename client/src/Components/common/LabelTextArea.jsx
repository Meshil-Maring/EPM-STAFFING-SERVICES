import React from "react";
import Label from "./Label";
import TextArea from "./TextArea";

function LabelBasicInput({ text, placeholder, type }) {
  const placehold = placeholder.Job_description;
  return (
    <div className="gap-1 flex-1 ml-auto flex flex-col flex-wrap items-start justify-start">
      <Label
        text={text}
        font_size="base"
        font_family="inter"
        color="primary"
        weight="semibold"
      />
      <span className="ml-auto flex-1 w-full">
        <TextArea type={type} placeholder={placehold} />
      </span>
    </div>
  );
}

export default LabelBasicInput;
