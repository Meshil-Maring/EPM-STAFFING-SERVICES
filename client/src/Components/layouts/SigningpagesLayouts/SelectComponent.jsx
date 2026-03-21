import React, { useContext } from "react";
import { signup_form_context } from "../../../context/SignupFormContext";

function SelectComponent({ toggleExpand, handleSelecting }) {
  const { setForm } = useContext(signup_form_context);

  const values = [
    "Banking",
    "IT Services",
    "Insurance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Logistics",
    "Consulting",
    "Marketing",
    "Construction",
    "Other",
  ];

  return (
    <div className="p-2 gap-0.5 min-w-[40%] h-30 overflow-hidden overflow-y-auto rounded-small text-sm font-lighter text-text_l_b bg-b_white z-500 shadow-sm shadow-gray-400 grid grid-cols-1 items-center justify-center absolute top-full right-1">
      <span onClick={(e) => e.stopPropagation()}>-- select option --</span>
      {values.map((value) => {
        return (
          <p
            onClick={() => {
              toggleExpand;
              handleSelecting(value, "industry_type");
            }}
            key={value}
            className={
              "w-full cursor-pointer rounded-small transition-all duration-150 ease-in-out px-2 py-1 hover:bg-lighter hover:scale-[1.05]"
            }
          >
            {value}
          </p>
        );
      })}
    </div>
  );
}

export default SelectComponent;
