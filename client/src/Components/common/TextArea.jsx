import React, { useContext } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";

function TextArea({
  type,
  id,
  placeholder,
  value,
  onchange,
  class_name = "flex-1 p-3 w-full border border-lighter rounded-small text-sm tracking-wide bg-white focus:ring-2 focus:ring-blue/20 focus:outline-none transition-all resize-y min-h-[120px]",
}) {
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);

  const handleChange = (e) => {
    const value = e.target.value;
    onchange(value, id);
  };

  return (
    <textarea
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={form_details[id] || value}
      onChange={handleChange}
      className={class_name}
    />
  );
}

export default TextArea;
