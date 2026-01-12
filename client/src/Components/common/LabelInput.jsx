import React, { useMemo } from "react";
import Label from "./Label";
import TextInput from "./TextInput";

function LabelInput({ text, placeholder }) {
  return (
    <div className="flex flex-col gap-2 items-start justify-start w-full">
      <Label
        text={text}
        class_name="font-semibold text-sm text-text_b_l whitespace-nowrap"
      />
      <div className="w-full">
        <TextInput placeholder={placeholder} />
      </div>
    </div>
  );
}

export default LabelInput;
