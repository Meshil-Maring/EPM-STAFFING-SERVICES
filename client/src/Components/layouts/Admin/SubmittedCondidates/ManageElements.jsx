import React from "react";
import { getSalaryRange } from "../common/GetSalaryRange";
import Icon from "../../../common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import Label from "../../../common/Label";
import ReqResBen from "./ReqResBen";

function ManageElements({ company, job }) {
  const elements = [
    { label: "Location", icon: "ri-map-pin-line", value: company.address },
    {
      label: "Job Type",
      icon: "ri-suitcase-line",
      value: job["contract type"],
    },
    {
      label: "Current CTC",
      icon: "ri-wallet-line",
      value: getSalaryRange(job["current ctc"]),
    },
    {
      label: "Experience",
      icon: "ri-time-line",
      value: job["experience required"],
    },
    { label: "Applicants", icon: "ri-group-line", value: job.applicants },
    {
      label: "Application Deadline",
      icon: "ri-calendar-line",
      value: job["application deadline"],
    },
  ];

  return (
    <AnimatePresence>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full gap-4 grid grid-cols-2 items-start justify-start">
          {elements.map((el, i) => {
            return (
              <motion.div
                key={`manage-${el.label}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "ease-in-out",
                  type: "tween",
                  delay: 0.1 * i,
                }}
                className="w-full border bg-gray-100 border-lighter rounded-small p-1 text-xs flex flex-row items-start justify-start gap-2"
              >
                <Icon icon={el.icon} />
                <div className="flex flex-col items-start justify-start">
                  <Label text={el.label} class_name={""} />
                  <Label text={el.value} class_name={""} />
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            type: "tween",
            delay: 0.7,
            ease: "easeInOut",
          }}
          className="w-full flex flex-col bg-blue-50 p-2 rounded-small border border-lighter gap-1"
        >
          <div className="w-full border-b border-lighter font-semibold flex flex-row items-center">
            <Icon icon={"ri-file-text-line"} class_name="" />
            <Label text={"Job Description"} class_name={""} />
          </div>
          <Label text={job["job description"]} class_name={""} />
        </motion.div>

        {((Array.isArray(job?.requirements) && job.requirements.length > 0) ||
          (Array.isArray(job?.responsibilities) &&
            job.responsibilities.length > 0) ||
          (Array.isArray(job?.benefits) && job.benefits.length > 0)) && (
          <ReqResBen job={job} />
        )}
      </div>
    </AnimatePresence>
  );
}

export default ManageElements;
