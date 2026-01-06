import React, { useState } from "react";
import Label from "./Label";
import TextInput from "./TextInput";

function LabelInput({ text, placeholder }) {
  let formatedString = text.replace(/[()]/g, "").split(" ").join("_");

  return (
    <div className="gap-1 flex-1 flex flex-row flex-wrap items-center justify-start">
      <Label
        text={text}
        font_size="base"
        font_family="inter"
        color="primary"
        weight="semibold"
      />
      <span className="ml-auto w-full">
        <TextInput id={text} placeholder={placeholder[formatedString]} />
      </span>
    </div>
  );
}

export default LabelInput;
