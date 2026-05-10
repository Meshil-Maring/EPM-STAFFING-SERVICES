import React from "react";
import Label from "./Label";
import TextInput from "./VariableTextInput";

function LabelBasicInput({ text, placeholder }) {
  return (
    <div className="border gap-4 flex flex-row flex-wrap items-center justify-start">
      <Label
        text={text}
        font_size="base"
        font_family="inter"
        color="primary"
        weight="semibold"
      />
      <span className="ml-auto ">
        <TextInput placeholder={placeholder} />
      </span>
    </div>
  );
}

export default LabelBasicInput;
