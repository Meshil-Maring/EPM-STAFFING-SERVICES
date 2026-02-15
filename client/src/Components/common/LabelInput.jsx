import React, { useEffect, useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Icon from "./Icon";
import { motion, AnimatePresence } from "framer-motion";
function LabelInput({
  onchange,
  default_value,
  id,
  text,
  placeholder,
  label_class_name = "",
  input_class_name = "",
  type,
  value,
  auto_complete,
}) {
  // re writing the date to YYYY-MM-DD
  const isDate = (value) => {
    if (!value || typeof value !== "string") return "";
    if (!value.includes("/")) return value;
  };
  if (id === "application deadline") {
    if (isDate(value)) {
      const [day, month, year] = value.split("/");
      const fullYear = year?.length === 2 ? `20${year}` : year;
      const newValue = `${fullYear}-${month}-${day}`;
      value = newValue;
    }
  }

  return (
    <div className="flex relative flex-col gap-0.5 items-start justify-start w-full">
      <Label text={text} class_name={label_class_name} />
      <div className="w-full">
        <Input
          placeholder={placeholder}
          class_name={input_class_name}
          require={true}
          id={id}
          type={type || "text"}
          default_value={default_value}
          onchange={onchange}
          value={value}
          autoComplete={auto_complete}
        />
      </div>
    </div>
  );
}

export default LabelInput;
