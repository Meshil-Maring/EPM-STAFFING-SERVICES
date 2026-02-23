import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import ReqResBen from "../SubmittedCondidates/ReqResBen";
import Button from "../../../common/Button";
import { getSalaryRange } from "../common/GetSalaryRange";
import EditCardDetails from "../../Dashboard/EditCardDetails/EditCardDetails";
import { selected_job_id_context } from "../../../../context/SelectedJobContext";
import { useNavigate } from "react-router-dom";
import { Jobs_context } from "../../../../context/JobsContext";

function CompanyOverlay_AboutJob({
  job,
  company,
  setClosing,
  heading_class,
  openCompanyOverlay,
}) {
  const { jobs } = useContext(Jobs_context);
  const navigate = useNavigate();
  const job_name = job["job title"];
  const company_name = company.name;
  const handleClosing = () => {
    openCompanyOverlay;
    setClosing(false);
  };

  const job_id = Object.keys(jobs).find((key) => jobs[key] === job);

  const { setSelected_job_id } = useContext(selected_job_id_context);
  const elements = [
    { label: "Location", icon: "ri-map-pin-line", value: job.location },
    {
      label: "Job Type",
      icon: "ri-suitcase-line",
      value: job["contract type"],
    },
    {
      label: "Expected CTC",
      icon: "ri-wallet-line",
      value: getSalaryRange(job["expected ctc"]),
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

  const [editPost, setEditPost] = useState(false);

  const handleBtnClicking = (name) => {
    switch (name) {
      case "Edit Job":
        setSelected_job_id(job_id);
        setEditPost(true);
        break;
      case "View Applicants":
        setSelected_job_id(job_id);
        setClosing(false);
        navigate("admincompanyoverview");
        break;
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0, scale: editPost ? 0.6 : 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          className="w-[40%] h-full rounded-small overflow-hidden bg-b_white flex flex-col items-center justify-start"
        >
          <Header
            heading={job_name}
            candidate_name={company_name}
            handleClosingModal={handleClosing}
          />
          <div className="w-full flex flex-col items-center justify-start gap-8 overflow-y-auto no-scrollbar p-4">
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <Label text={"Information"} class_name={heading_class} />
              <div className="w-full text-sm grid grid-cols-2 items-center justify-center gap-2">
                {elements.map((el, i) => {
                  return (
                    <div
                      key={`element-${i}`}
                      className="w-full border border-light/50 px-2 py-1 shadow-sm rounded-small flex flex-row items-start justify-start gap-2"
                    >
                      <Icon icon={el.icon} class_name="w-4 h-4 text-lg mt-1" />
                      <div className="flex flex-col items-start justify-start">
                        <Label text={el.label} class_name={""} />
                        <Label text={el.value} class_name={""} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col w-full items-start justify-start gap-1">
              <div
                className={`w-full flex-row flex items-start justify-start gap-1 ${heading_class}`}
              >
                <Icon
                  icon={"ri-file-text-line"}
                  class_name="font-light w-4 h-4 flex items-center justify-center mt-1"
                />
                <Label text={"Job Description"} class_name={""} />
              </div>
              <Label
                text={job["job description"]}
                class_name={"w-full p-2 rounded-small bg-nevy_blue/10"}
              />
            </div>
            <ReqResBen job={job} />
            <div className="w-full flex flex-row gap-4 items-center justify-center">
              {["Edit Job", "View Applicants"].map((item) => {
                const isEdit = item === "Edit Job";
                return (
                  <Button
                    key={item}
                    text={item}
                    onclick={handleBtnClicking}
                    class_name={`w-full font-semibold text-sm py-2 rounded-small ${isEdit ? "bg-g_btn text-text_white" : "border border-light/50 hover:bg-lighter"}`}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
        {editPost && (
          <div className="fixed inset-0 top-0 left-0 h-full w-full z-202">
            <EditCardDetails onclick={setEditPost} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CompanyOverlay_AboutJob;
