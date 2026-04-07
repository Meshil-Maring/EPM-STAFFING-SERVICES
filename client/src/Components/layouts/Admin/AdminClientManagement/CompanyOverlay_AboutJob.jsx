import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import ReqResBen from "../SubmittedCondidates/ReqResBen";
import Button from "../../../common/Button";
import { getSalaryRange } from "../common/GetSalaryRange";
import EditCardDetails from "../../Dashboard/EditCardDetails/EditCardDetails";
import { useNavigate } from "react-router-dom";
import { showInfo } from "../../../../utils/toastUtils";

/**
 * CompanyOverlay_AboutJob - Displays detailed job information in an overlay
 * Shows job details including location, type, salary, experience, deadline, description,
 * requirements, responsibilities, and benefits. Also provides options to edit the job
 * or view applicants.
 *
 * @param {Object} props - Component props
 * @param {Object} props.job - Job data object containing all job details
 * @param {Object} props.company - Company data object
 * @param {Function} props.setClosing - Function to close the overlay
 * @param {Function} props.setViewJob - Function to toggle job view
 * @param {string} props.heading_class - CSS classes for heading styling
 * @param {Function} props.openCompanyOverlay - Function to open company overlay
 */
function CompanyOverlay_AboutJob({
  job,
  company,
  setClosing,
  setViewJob,
  heading_class,
  openCompanyOverlay,
}) {
  const navigate = useNavigate();
  const job_name = job?.job_name || "N/A";
  const company_name = company?.company_name || "N/A";

  const job_id = job?.job_id;
  const getDate = (rawDate) => {
    if (!rawDate) return "N/A";
    const [date, time] = rawDate.split("T");
    return `${date} | ${time.split(".")[0]}`;
  };

  const elements = [
    {
      label: "Location",
      icon: "ri-map-pin-line",
      value: job?.location || "N/A",
    },
    {
      label: "Job Type",
      icon: "ri-suitcase-line",
      value: job?.job_type || "N/A",
    },
    {
      label: "Expected CTC",
      icon: "ri-wallet-line",
      value: getSalaryRange(job?.salary_max, job?.salary_min) || "N/A",
    },
    {
      label: "Experience",
      icon: "ri-time-line",
      value: job?.experience_years ? `${job.experience_years} years` : "N/A",
    },
    {
      label: "Applicants",
      icon: "ri-group-line",
      value: job?.max_application || "N/A",
    },
    {
      label: "Application Deadline",
      icon: "ri-calendar-line",
      value: getDate(job?.deadline),
    },
  ];

  const [editJobPost, setEditJobPost] = useState(false);

  const handleBtnClicking = (name) => {
    if (name === "Edit Job") {
      setEditJobPost(true);
    } else {
      setViewJob(false);
      setClosing(false);
      navigate("admin_company_overview");
      sessionStorage.setItem("selected_job_id", job_id);
    }
  };

  // Early return if job or company is not provided - avoid side effects during render
  if (!job || !company) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0, scale: editJobPost ? 0.6 : 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          className="w-[40%] max-h-full rounded-small overflow-hidden bg-b_white flex flex-col items-center justify-start"
        >
          <Header
            heading={job_name}
            candidate_name={company_name}
            handleClosingModal={() => {
              (setViewJob(false), openCompanyOverlay());
            }}
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
                text={job?.job_description || "N/A"}
                class_name={"w-full p-2 rounded-small bg-nevy_blue/10"}
              />
            </div>
            <ReqResBen currentJob={job} />
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
      </AnimatePresence>
      {editJobPost && (
        <EditCardDetails
          setEditJobPost={setEditJobPost}
          setViewJob={setViewJob}
          card={job}
        />
      )}
    </>
  );
}

export default CompanyOverlay_AboutJob;
