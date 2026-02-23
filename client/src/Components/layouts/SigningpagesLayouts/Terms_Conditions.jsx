import React, { useContext } from "react";
import Input from "../../common/Input";
import { signup_form_data_context } from "../../../context/SigningupDataContext";

function Terms_Conditions() {
  const { setForm } = useContext(signup_form_data_context);

  const handleTerms_Conditions = (checked) => {
    setForm((prev) => ({
      ...prev,
      checkbox: checked,
    }));
  };

  return (
    <div className="flex flex-row items-start text-xs gap-3 justify-start w-full">
      <div className="flex items-center h-5">
        <Input
          id="terms-checkbox"
          type="checkbox"
          aria-required="true"
          class_name="w-4 h-4 rounded border-border1 text-nevy_blue focus:ring-nevy_blue cursor-pointer"
          onchange={handleTerms_Conditions}
        />
      </div>

      <label
        htmlFor="terms-checkbox"
        className="text-text_l_b leading-tight cursor-pointer select-none"
      >
        I accept the{" "}
        <a
          className="text-nevy_blue font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-nevy_blue rounded-sm"
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          terms and conditions
        </a>{" "}
        and agree to the terms of{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-nevy_blue font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-nevy_blue rounded-sm"
        >
          Privacy Policy
        </a>
      </label>
    </div>
  );
}

export default Terms_Conditions;
