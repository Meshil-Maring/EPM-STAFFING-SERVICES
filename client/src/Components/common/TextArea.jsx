import React, { useContext } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";

function TextArea({ type, id, placeholder = "Enter your message here..." }) {
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);

  const handleChange = (e) => {
    const { value } = e.target;
    setform_details((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <textarea
      type={type}
      id={id}
      name={id}
      placeholder={`Eg. ${placeholder}`}
      value={form_details[id] || ""}
      onChange={handleChange}
      rows="6"
      className="flex-1 p-3 w-full border border-lighter rounded-small text-sm tracking-wide bg-white focus:ring-2 focus:ring-blue/20 focus:outline-none transition-all resize-y min-h-[120px]"
    />
  );
}

export default TextArea;
