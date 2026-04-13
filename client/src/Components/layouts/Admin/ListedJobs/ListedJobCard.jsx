import React, { useState, useEffect, useRef } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import ListedJobMiddleInformation from "./ListedJobMiddleInformation";
import JobDetails from "./JobDetails";
import CardFooter from "./CardFooter";
import Arrow from "./Arrow";
import { motion, AnimatePresence } from "framer-motion";

function ListedJobCard({
  job,
  jobKey,
  jobs,
  company_accounts,
  candidates,
  icons,
  handleViewDetails,
}) {
  const [display_i, setDisplay_i] = useState(1);
  const [t_candidates, setT_candidates] = useState(0);
  const candidate_keys = job["candidate id"] || [];

  useEffect(() => {
    setT_candidates(candidate_keys.length);
    // Initialize display_i to 1 when candidates change
    if (candidate_keys.length > 0) {
      setDisplay_i(1);
    }
  }, [job, candidate_keys.length]);

  const handleNavCandidate = (dir) => {
    const target = document.getElementById(`${jobKey}_${display_i - 1}`);
    if (dir === "left") {
      if (display_i <= 1) {
        setDisplay_i(t_candidates);
      } else {
        setDisplay_i(display_i - 1);
        target.style.translate("-50px");
      }
    } else if (dir === "right") {
      if (display_i >= t_candidates) {
        setDisplay_i(1);
      } else {
        setDisplay_i(display_i + 1);
      }
    }
  };

  const isPending = job.status === "Pending";
  const isInterviewed = job.status === "Interviewed";
  const isAccepted = job.status === "Accepted";
  const isRejected = job.status === "Rejected";

  let bg = "";
  if (isPending) bg = "bg-gold_lighter text-Darkgold";
  if (isInterviewed) bg = "bg-blue-hover text-blue-dark";
  if (isAccepted) bg = "bg-light_green text-green-dark";
  if (isRejected) bg = "bg-red-light text-red-dark";

  const candidate_key = candidate_keys[display_i - 1];
  const currentCandidate = candidates[candidate_key];
  const companyId = job["company id"];
  const company = companyId ? company_accounts?.[companyId] : null;

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-large bg-white">
      <div className="w-full flex flex-row items-center justify-start gap-4">
        <NameInitials name={job["job title"]} bg="5629dc" />
        <div className="flex flex-col items-start justify-start">
          <Label text={job["job title"]} class_name="text-sm font-medium" />
          <span className="text-xs text-gray-500 flex flex-row items-center justify-start">
            <Icon icon={icons.location} class_name={""} />
            <Label text={job.location} />
          </span>
        </div>
        <Label
          text={job.status}
          class_name={`font-lighter text-xs py-1 px-2 rounded-full ml-auto ${bg}`}
        />
      </div>

      <div className="w-full relative h-fit">
        <div className="flex absolute top-2 right-2 flex-row items-center justify-center bg-lighter rounded-large z-10">
          <Arrow
            icon={"ri-arrow-left-s-line"}
            id={"left"}
            onArrowClick={handleNavCandidate}
          />
          <span className="text-[8px] px-1">
            {display_i} / {t_candidates}
          </span>
          <Arrow
            icon={"ri-arrow-right-s-line"}
            id={"right"}
            onArrowClick={handleNavCandidate}
          />
        </div>
        <div className="w-full overflow-x-auto no-scrollbar h-20 flex flex-row items-center justify-start gap-2 scroll-smooth">
          <AnimatePresence mode="wait">
            {candidate_keys?.[display_i - 1] && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
                key={candidate_key}
                className="translate w-full h-full flex shrink-0"
              >
                <ListedJobMiddleInformation
                  icons={icons}
                  handleViewDetails={handleViewDetails}
                  company={company}
                  handleNavCandidate={handleNavCandidate}
                  currentCandidate={currentCandidate}
                  job={job}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <JobDetails job={job} />

      <CardFooter icons={icons} job_index={jobKey} job={job} />
    </div>
  );
}

export default ListedJobCard;
