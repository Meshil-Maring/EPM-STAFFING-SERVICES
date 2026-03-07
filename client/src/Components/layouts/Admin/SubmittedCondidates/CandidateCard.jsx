import React, { useState, useEffect } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import CandidateMiddleInformation from "./CandidateMiddleInformation";
import Details from "./Details";
import CardFooter from "./CardFooter";
import Arrow from "./Arrow";

function CandidateCard({
  candidate,
  candKey,
  jobs,
  companyAccounts,
  icons,
  updateCandidate,
  deleteCandidate,
  handleViewDetails,
}) {
  const [display_i, setDisplay_i] = useState(1);
  const [t_jobs, setT_jobs] = useState(0);

  const related_jobs_keys = candidate["job id"] || [];

  useEffect(() => {
    setT_jobs(related_jobs_keys.length);
  }, [candidate, related_jobs_keys.length]);

  const handleNavCompany = (dir) => {
    if (dir === "left") {
      if (display_i <= 1) {
        setDisplay_i(t_jobs);
      } else {
        setDisplay_i((prev) => prev - 1);
      }
    } else if (dir === "right") {
      if (display_i >= t_jobs) {
        setDisplay_i(1);
      } else {
        setDisplay_i((prev) => prev + 1);
      }
    }
  };

  // Effect to handle smooth scrolling when display_i changes
  useEffect(() => {
    if (t_jobs > 0) {
      // Add a small delay to ensure state update completes
      const targetIndex = display_i - 1; // Convert to 0-based index
      const target_el = document.getElementById(`${candKey}-${targetIndex}`);
      if (target_el) {
        target_el.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
      }
    }
  }, [display_i, t_jobs]);

  const isPending = candidate.status === "Pending";
  const isInterviewed = candidate.status === "Interviewed";
  const isAccepted = candidate.status === "Accepted";
  const isRejected = candidate.status === "Rejected";

  let bg = "";
  if (isPending) bg = "bg-gold_lighter text-Darkgold";
  if (isInterviewed) bg = "bg-blue-hover text-blue-dark";
  if (isAccepted) bg = "bg-light_green text-green-dark";
  if (isRejected) bg = "bg-red-light text-red-dark";

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-small bg-white">
      <div className="w-full flex flex-row items-center justify-start gap-4">
        <NameInitials name={candidate.name} bg="5629dc" />
        <div className="flex flex-col items-start justify-start">
          <Label text={candidate.name} class_name="text-sm font-medium" />
          <span className="text-xs text-gray-500 flex flex-row items-center justify-start">
            <Icon icon={icons.location} class_name={""} />
            <Label text={candidate.location} />
          </span>
        </div>
        <Label
          text={candidate["offer status"]}
          class_name={`font-lighter text-xs py-1 px-2 rounded-full ml-auto ${bg}`}
        />
      </div>

      <div className="w-full relative h-fit">
        <div className="flex absolute top-2 right-2 flex-row items-center justify-center bg-lighter rounded-small z-10">
          <Arrow
            icon={"ri-arrow-left-s-line"}
            id={"left"}
            onArrowClick={handleNavCompany}
          />
          <span className="text-[8px] px-1">
            {display_i} / {t_jobs}
          </span>
          <Arrow
            icon={"ri-arrow-right-s-line"}
            id={"right"}
            onArrowClick={handleNavCompany}
          />
        </div>
        <div
          className="w-full overflow-x-auto no-scrollbar h-20 flex flex-row items-center justify-start gap-2"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {related_jobs_keys.map((key, i) => {
            const currentJob = jobs[key];
            const companyId = currentJob ? currentJob["company id"] : null;
            const company = companyId ? companyAccounts[companyId] : null;
            return (
              <div
                id={`${candKey}-${i}`}
                key={`card-${i}`}
                className="translate w-full h-full flex shrink-0"
              >
                <CandidateMiddleInformation
                  icons={icons}
                  handleViewDetails={handleViewDetails}
                  company={company}
                  handleNavCompany={handleNavCompany}
                  currentJob={currentJob}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Details candidate={candidate} />

      <CardFooter
        icons={icons}
        cand_index={candKey}
        candidate={candidate}
        updateCandidate={updateCandidate}
        deleteCandidate={deleteCandidate}
      />
    </div>
  );
}

export default CandidateCard;
