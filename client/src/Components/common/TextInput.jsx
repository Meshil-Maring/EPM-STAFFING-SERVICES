import React from "react";
import { useJobForm } from "../../context/Job_Form_data_authContext";

function TextInput({ id, placeholder = "I am waiting for input" }) {
  const { form_details, setform_details } = useJobForm();

  const formatedId = id.replace(/[()]/g, "").split(" ").join("_");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setform_details((prev) => ({
      ...prev,
      [formatedId]: value,
    }));
    console.log(`form details: ${form_details}`);
  };
  return (
    <input
      id={id}
      onChange={handleChange}
      type="text"
      className="w-full py-1.5 px-2 border text-sm border-lighter rounded-lg tracking-wide focus:ring-1 focus:ring-lighter focus:outline-none"
      placeholder={`Eg. ${placeholder}`}
    />
  );
}

export default TextInput;
