import React, { useState, useRef, useEffect } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import { useNavigate } from "react-router-dom";

function JobForm_Anchor_Component({ handleInputChange }) {
  const targetRef = useRef();

  const [isSelect, setIsSelect] = useState(false);
  const [selected, setSelected] = useState("Full-time");
  const [check, setCheck] = useState(false);

  const list = ["Full-time", "Part-time", "Internship", "Contract"];

  // Initialize contract type
  useEffect(() => {
    handleInputChange(selected, "contract_type");
  }, [selected]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const updateClick = (e) => {
      if (!targetRef.current) return;
      if (!targetRef.current.contains(e.target)) {
        setIsSelect(false);
      }
    };

    document.addEventListener("mousedown", updateClick);
    return () => document.removeEventListener("mousedown", updateClick);
  }, []);

  const handleCheck = (e) => {
    const checked = e.target.checked;
    setCheck(checked);
    handleInputChange(checked, "priority");
  };

  const handleSelecting = () => {
    setIsSelect(!isSelect);
  };

  // styles
  const input_class =
    "border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-gray-400";

  const label_class = "font-semibold text-sm text-text";

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      placeholder1: "e.g. Remote / Mumbai",
      type1: "text",

      id2: "contract_type",
      label2: "Contract Type",
      placeholder2: "Full-time",
      type2: "text",
    },
    {
      id1: "offer_ctc_min",
      label1: "Offer CTC Min (PA)",
      placeholder1: "e.g. ₹12L",
      type1: "number",

      id2: "offer_ctc_max",
      label2: "Offer CTC Max (PA)",
      placeholder2: "e.g. ₹18L",
      type2: "number",
    },
    {
      id1: "experience_required",
      label1: "Experience Required",
      placeholder1: "e.g. 5+ Years",
      type1: "text",

      id2: "max_applications",
      label2: "Max Applications",
      placeholder2: "e.g. 100",
      type2: "number",
    },
    {
      id1: "application_deadline",
      label1: "Application Deadline",
      placeholder1: "",
      type1: "date",

      id2: null,
    },
  ];

  return (
    <div className="w-full gap-6 flex flex-col items-center pb-4 px-4">
      {/* Job Title */}
      <div className="flex items-start justify-center flex-col w-full">
        <Label text={"Job Title"} class_name={label_class} />

        <Input
          id={"job_title"}
          onchange={handleInputChange}
          placeholder={"e.g. Senior Full Stack Developer"}
          class_name={input_class}
          require={true}
        />
      </div>

      {/* Urgent Checkbox */}
      <div className="w-full bg-red/15 p-2 rounded-small flex flex-row items-center justify-start gap-4 pl-4 relative">
        <input
          checked={check}
          onChange={handleCheck}
          type="checkbox"
          className="w-4 h-4"
        />

        <div className="flex flex-col items-start justify-center text-text">
          <Label text={"Mark as urgent"} class_name={"font-normal text-lg"} />
        </div>

        <div className="absolute right-1 top-1 group cursor-pointer">
          <aside className="w-4 h-4 rounded-full bg-white border flex items-center justify-center text-xs font-bold">
            i
          </aside>

          <div className="absolute right-0 mt-2 w-56 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            This will add a priority badge to your listing
          </div>
        </div>
      </div>

      {/* Dynamic Fields */}
      {jobPostingElements.map((el, index) => {
        const isContract = el.id2 === "contract_type";

        return (
          <div
            key={index}
            className="flex gap-4 flex-row items-start justify-between w-full"
          >
            <LabelInput
              text={el.label1}
              placeholder={el.placeholder1}
              id={el.id1}
              type={el.type1}
              onchange={handleInputChange}
              input_class_name={input_class}
              label_class_name={label_class}
            />

            {el.id2 &&
              (isContract ? (
                <div className="flex flex-col items-start justify-start w-full">
                  <Label text={el.label2} class_name={label_class} />

                  <div
                    onClick={handleSelecting}
                    ref={targetRef}
                    className="relative w-full"
                  >
                    <input className={input_class} readOnly value={selected} />

                    <span className="absolute top-0 right-1 cursor-pointer">
                      <Icon
                        icon={
                          isSelect
                            ? "ri-arrow-up-s-line"
                            : "ri-arrow-down-s-line"
                        }
                      />
                    </span>

                    {isSelect && (
                      <div className="absolute top-full right-0 w-full z-200 p-2 bg-b_white border border-lighter shadow-sm rounded-small">
                        <ul className="flex flex-col w-full">
                          {list.map((item, index) => (
                            <li
                              key={index}
                              className="pl-2 hover:bg-hover-light cursor-pointer"
                              onClick={() => {
                                setSelected(item);
                                setIsSelect(false);
                                handleInputChange(item, "contract_type");
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <LabelInput
                  text={el.label2}
                  placeholder={el.placeholder2}
                  id={el.id2}
                  type={el.type2}
                  onchange={handleInputChange}
                  input_class_name={input_class}
                  label_class_name={label_class}
                />
              ))}
          </div>
        );
      })}

      {/* Job Description (Always Last) */}
      <LabelTextArea
        id={"job_description"}
        text={"Job Description"}
        placeholder={"Type the Job description here..."}
        type={"text"}
        label_class_name={label_class}
        onchange={handleInputChange}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light"
      />
    </div>
  );
}

export default JobForm_Anchor_Component;
