import React, { useState, useRef, useEffect } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function JobForm_Anchor_Component({ icon_class, handleInputChange }) {
  const targetRef = useRef();
  const [isSelect, setIsSelect] = useState(false);
  const [selected, setSelected] = useState("Full-time");

  useEffect(() => {
    // Initialize contract type with the selected default value on render
    handleInputChange(selected, "contract type");
  }, [selected, handleInputChange]);

  useEffect(() => {
    const updateClick = (e) => {
      const target = targetRef.current;
      if (!target) return;
      if (!target.contains(e.target)) {
        setIsSelect(false);
      }
    };

    document.addEventListener("mousedown", updateClick);
    return () => document.removeEventListener("mousedown", updateClick);
  }, []);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const handleCheck = (e) => {
    setCheck(e.target.checked);
    handleInputChange(check, "priority");
  };

  const list = ["Full-time", "Part-time", "Free-Lencer"];

  const handleSelecting = () => {
    setIsSelect(!isSelect);
  };
  // styles
  const input_class =
    "border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-gray-400";
  const label_class = "font-semibold text-sm text-text";

  // Closing the post job modal
  const handleClosing = () => {
    navigate("/client/dashboard");
  };

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      placeholder1: "e.g. Remote Mumbai",
      type1: "text",
      id2: "contract type",
      label2: "Contract Type",
      placeholder2: "Full-time",
      type2: "text",
    },
    {
      id1: "expected ctc",
      label1: "Expected CTC",
      placeholder1: "e.g. ₹12L - ₹18L per annum",
      type1: "text",
      id2: "experience required",
      label2: "Experience Required",
      placeholder2: "e.g. 5+ Years",
      type2: "text",
    },
    {
      id1: "max applications",
      label1: "Max Applications",
      placeholder1: "e.g. 100",
      type1: "text",
      id2: "application deadline",
      label2: "Application Deadline",
      placeholder2: "mm/dd/yyyy",
      type2: "date",
    },
  ];

  return (
    <div className="w-full gap-6 flex flex-col items-center pb-4 px-4">
      <div className="flex items-start justify-center flex-col w-full">
        <Label text={"Job Title"} class_name={label_class} />
        <Input
          id={"job title"}
          onchange={handleInputChange}
          placeholder={"e.g. Senior Full Stack Developer"}
          class_name={input_class}
          require={true}
        />
      </div>
      <div className="w-full bg-red-light p-2 rounded-small flex flex-row items-start justify-start gap-2">
        <input
          checked={check}
          onChange={(e) => handleCheck(e)}
          type={"checkbox"}
          className={"w-4 h-4 mt-1.5"}
        />
        <div className="flex flex-col items-start  justify-center text-text">
          <Label text={"Mark as Urgent"} class_name={"font-semibold text-xl"} />
          <Label
            text={"This will add a priority badge to your listing"}
            class_name={"text-sm"}
          />
        </div>
      </div>
      {jobPostingElements.map((el, index) => {
        const isSalary = el.id1 === "expected ctc";
        const isContract = el.id2 === "contract type";
        // const value = isSalary? getSalaryRange(sele)
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
            {isContract ? (
              <div className="flex flex-col items-start justify-start w-full">
                <Label text={el.label1} class_name={label_class} />

                <div ref={targetRef} className={`relative w-full`}>
                  <input
                    placeholder={el.placeholder1}
                    className={input_class}
                    id={el.id1}
                    type={"text"}
                    readOnly
                    value={selected}
                  />
                  <span
                    onClick={handleSelecting}
                    className="w-fit h-fit absolute top-0 right-1 cursor-pointer"
                  >
                    <Icon
                      class_name=""
                      icon={`${isSelect ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`}
                    />
                  </span>
                  <AnimatePresence>
                    {isSelect && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        transition={{
                          duration: 0.2,
                          type: "tween",
                          ease: "easeInOut",
                        }}
                        className={`absolute overflow-y-hidden top-full right-0 w-fit z-200 p-2 bg-b_white border border-lighter shadow-sm rounded-small flex flex-col items-center`}
                      >
                        <ul className="gap-2 flex flex-col w-full items-center justify-center">
                          {list.map((item, index) => (
                            <motion.li
                              initial={{
                                y: -8,
                              }}
                              animate={{
                                y: 0,
                              }}
                              transition={{
                                duration: 0.2,
                              }}
                              className="w-full h-full pl-2 hover:bg-hover-light cursor-pointer"
                              key={index}
                              onClick={() => {
                                (setSelected(item),
                                  setIsSelect(false),
                                  handleInputChange(item, "contract type"));
                              }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            )}
          </div>
        );
      })}
      <LabelTextArea
        id={"job description"}
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
