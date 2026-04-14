import React, { useState, useContext, useEffect } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import CandidateNavBar from "./CandidateNavBar";
import CandidatesContainer from "./CandidatesContainer";
import { Candidates_context } from "../../../../context/CandidatesContext";
import { useLocation } from "react-router-dom";
import { Jobs_context } from "../../../../context/JobsContext";
import { useQuery } from "@tanstack/react-query";
import { getListedJobWithPage } from "../ListedJobs/end-point-function/listed_job";
import { showError } from "../../../../utils/toastUtils";

/**
 * SubmittedCandidates component - Displays candidates or jobs based on route
 * @returns {JSX.Element} Rendered submitted candidates component
 */
function SubmittedCandidates() {
  // Get current route path to determine view mode
  const { pathname } = useLocation();
  const section = pathname.split("/").at(-1);
  const isListed_jobs = section === "listed_jobs";

  // Get candidates context for accessing candidate data
  const { candidates, updateCandidate, deleteCandidate } =
    useContext(Candidates_context) || {};

  // local jobs
  // const [jobs, setJobs] = useState(null);

  // getting jobs data
  // useQuery({
  //   queryKey: ["jobs"],
  //   queryFn: getListedJobWithPage(1),
  //   enabled: !isListed_jobs,
  //   onSuccess: (data) => {
  //     console.log(data);
  //     setJobs(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     showError("Failed to load jobs");
  //   },
  // });

  {
    /*
    =====================================================================
    LEFT HERE TO GET DATA FROM BACKEND FOR CANDIDATES AND JOBS
    =====================================================================
    */
  }
  // local candidates from backend
  // local candidates
  // const [candidates, setCandidates] = useState(null);

  // getting candidates data
  // useQuery({
  //   queryKey: ["candidates"],
  //   queryFn: getListedJobWithPage(1),
  //   enabled: !!isListed_jobs,
  //   onSuccess: (data) => {
  //     console.log(data);
  //     setCandidates(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     showError("Failed to load candidates");
  //   },
  // });

  // Get jobs context for accessing job data
  const { jobs, updateJob, deleteJob } = useContext(Jobs_context);

  // Calculate candidate statistics (for candidate view)
  const t_candidates = Object.values(candidates || []).length;

  // pending candidates
  const p_candidates = Object.values(candidates || []).filter((candidate) => {
    const offerStatus = candidate?.active;
    return (
      offerStatus &&
      typeof offerStatus === "string" &&
      offerStatus.toLocaleLowerCase() === "pending"
    );
  }).length;

  // Interviewed candidates
  const i_candidates = Object.values(candidates || {}).filter((candidate) => {
    const offerStatus = candidate?.["offer status"];
    return (
      offerStatus &&
      typeof offerStatus === "string" &&
      offerStatus.toLocaleLowerCase() === "interviewed"
    );
  }).length;

  // accepted candidates
  const a_candidates = Object.values(candidates || {}).filter((candidate) => {
    const offerStatus = candidate?.["offer status"];
    return (
      offerStatus &&
      typeof offerStatus === "string" &&
      offerStatus.toLocaleLowerCase() === "accepted"
    );
  }).length;

  // rejected candidates
  const r_candidates = Object.values(candidates || {}).filter((candidate) => {
    const offerStatus = candidate?.["offer status"];
    return (
      offerStatus &&
      typeof offerStatus === "string" &&
      offerStatus.toLocaleLowerCase() === "rejected"
    );
  }).length;

  // State for filtered data
  const [filteredData, setFilteredData] = useState({});

  // Define elements based on view mode
  const elements = [
    { label: "Total", icon: "ri-group-line", value: t_candidates },
    { label: "Pending", icon: "ri-time-line", value: p_candidates },
    { label: "Interviewed", icon: "ri-video-on-line", value: i_candidates },
    {
      label: "Accepted",
      icon: "ri-checkbox-circle-line",
      value: a_candidates,
    },
    {
      label: "Rejected",
      icon: "ri-close-circle-line",
      value: r_candidates,
    },
  ];

  return (
    <main className="w-full pt-0 p-6 h-full overflow-y-auto scroll-smooth flex flex-col gap-4 justify-start items-start">
      {/* Statistics section - only show for candidate view */}
      <section
        className={`w-full mt-4 items-center justify-between flex-row flex-wrap ${isListed_jobs ? "hidden" : "flex"}`}
      >
        {elements.map((el, i) => {
          return (
            <div
              key={i}
              className="w-fit p-2 md:min-w-40 text-[clamp(1em,2vw,1.2em)] rounded-small gap-2 flex flex-row items-center justify-around bg-lighter"
            >
              <Icon icon={el.icon} class_name="text-nevy_blue" />
              <Label
                text={el.label}
                class_name={"text-[clamp(0.8em,1vw,1em)] font-lighter"}
              />
              <Label text={el.value} class_name={"font-semibold"} />
            </div>
          );
        })}
      </section>

      {/* Navigation bar */}
      <CandidateNavBar
        setFilteredData={setFilteredData}
        candidates={candidates}
        jobs={jobs}
        isListed_jobs={isListed_jobs}
      />

      {/* Content section */}
      {Object.keys(filteredData).length === 0 ? (
        <div className="w-full h-40 flex items-center justify-center">
          <Label
            text={isListed_jobs ? "No jobs found" : "No candidates found"}
            class_name={"text-gray-500"}
          />
        </div>
      ) : (
        <CandidatesContainer
          filteredData={filteredData}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
          deleteJob={deleteJob}
          updateJob={updateJob}
          isListed_jobs={isListed_jobs}
        />
      )}
    </main>
  );
}

export default SubmittedCandidates;
