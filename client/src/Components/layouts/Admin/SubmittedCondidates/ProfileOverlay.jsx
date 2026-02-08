import React, { useState } from "react";
import Label from "../../../common/Label";
import Candidates_Information from "../../../dummy_data_structures/Candidate_information.json";
import Jobs from "../../../dummy_data_structures/Jobs.json";
import { motion } from "framer-motion";
import Icon from "../../../common/Icon";
import { formatValue } from "../../../common/formatText";
import Input from "../../../common/Input";
import Button from "../../../common/Button";

function ProfileOverlay({ cand_index, setClosing }) {
  const candidate = Candidates_Information[cand_index];
  const [skills, setSkills] = useState(() => candidate.skills || []);
  const getSalaryRange = (salary) => {
    const [min, max] = salary.split("-");
    const value = `$${formatValue(min.trim())} - $${formatValue(max.trim())}`;
    return value;
  };

  const getDateValue = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const addMoreSkills = () => {
    setSkills((prev) => [...prev, ""]);
  };

  const updateSkill = (index, value) => {
    setSkills((prev) => {
      const newSkills = [...prev];
      newSkills[index] = value;
      return newSkills;
    });
  };

  const deleteSkill = (index) => {
    setSkills((prev) => {
      const newSkills = [...prev];
      newSkills.splice(index, 1);
      return newSkills;
    });
  };

  const elements = [
    { label: "Name", value: candidate.name || "N/A" },
    { label: "Email", value: candidate.email || "N/A" },
    { label: "Phone", value: candidate["phone number"] || "N/A" },
    { label: "Location", value: candidate.location || "N/A" },
    {
      label: "Job Type",
      value: Jobs[candidate["job id"]]["contract type"] || "N/A",
    },
    {
      label: "Expected Salary",
      value: getSalaryRange(Jobs[candidate["job id"]]["salary range"]) || "N/A",
    },
    { label: "D.O.B", value: getDateValue(candidate["date of birth"]) },
    { label: "Gender", value: candidate.gender || "N/A" },
    { label: "LinkedIn", value: candidate["linkedin"] || "N/A" },
    { label: "Expected CTC", value: candidate["expected ctc"] || "N/A" },
    { label: "Current CTC", value: candidate["current ctc"] || "N/A" },
    {
      label: "Notice Period",
      value: getDateValue(candidate["notice date"]) || "N/A",
    },
  ];

  return (
    <div
      onClick={() => setClosing(false)}
      className="inset-0 z-20 flex items-center justify-center absolute top-0 left-0 bg-light_black"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="w-[40%] h-[80%] bg-b_white rounded-small flex flex-col items-center  justify-start shadow-xl"
      >
        <header className="w-full border-b p-2 px-4 border-lighter flex flex-row items-center justify-between">
          <Label
            text={"Candidate Details"}
            class_name={"text-lg font-medium"}
          />
          <button
            onClick={() => setClosing(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-lighter transition-all ease-in-out duration-200"
          >
            <Icon
              icon={"ri-close-line"}
              class_name="w-full h-full text-[clamp(1em,2vw,1.2em)] font-semibold flex items-center justify-center"
            />
          </button>
        </header>
        <div className="w-full flex-1 overflow-y-auto no-scrollbar p-4 gap-4 flex flex-col items-start justify-start">
          <div className="w-full grid grid-cols-2 gap-4">
            {elements.map((el, i) => {
              const isDOB = el.label === "D.O.B";
              const isNoticeDate = el.label === "Notice Period";
              const isDOBOrNotice = isDOB || isNoticeDate;
              const type = isDOBOrNotice ? "date" : "text";

              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1, type: "tween" }}
                  key={i}
                  className="flex flex-col w-full items-start justify-center"
                >
                  <Label text={el.label} class_name={"text-sm font-medium"} />
                  <Input
                    default_value={el.value}
                    type={type}
                    class_name={
                      "text-sm w-full py-1 px-2 bg-lighter rounded-small border border-light focus:border-none focus:ring-1 ring-highLight"
                    }
                  />
                </motion.div>
              );
            })}
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-4">
            <Label
              text={"Skills & Expertise"}
              class_name={
                "w-full px-2 text-[clamp(1em,2vw,1.2em)] font-semibold border-b border-lighter mb-4 pb-1"
              }
            />
            <div className="w-full flex flex-col items-start text-[clamp(1em,2vw,1.4em)] justify-center gap-4">
              {skills.map((skill, index) => (
                <div className="relative w-full gap-2 flex flex-row items-center justify-between">
                  <Input
                    key={index}
                    default_value={skill}
                    class_name="w-full py-1 px-2 rounded-small bg-lighter border border-light focus:outline-none focus:ring-2 ring-light focus:border-none rounded-small py-1 px-2 text-sm"
                  />
                  <motion.span
                    onClick={() => deleteSkill(index)}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="hover:bg-red-lighter p-1 rounded-full cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center w-fit h-fit "
                  >
                    <Icon
                      icon={"ri-close-line"}
                      class_name="w-5 h-5 rounded-full flex items-center justify-center"
                    />
                  </motion.span>
                </div>
              ))}
              <Button
                text={"+ Add skill"}
                onclick={addMoreSkills}
                class_name="py-1 px-2 bg-highLight text-nevy_blue font-lighter rounded-small text-sm"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileOverlay;
