import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CompanyOverlay_AboutJob from "./CompanyOverlay_AboutJob";
import CompanyOverlay_SubmitCandidate from "./CompanyOverlay_SubmitCandidate";
import CompanyInfoSection from "./CompanyInfoSection";
import CompanyJobsGrid from "./CompanyJobsGrid";
import {
  // getTotalCandidates,
  getDaysPosted,
  CONTACT_ELEMENTS,
  BUSINESS_DETAILS,
} from "../../../../utils/companyOverlayHelpers";
import { showInfo } from "../../../../utils/toastUtils";

function CompanyViewOverlay({ company, setClosing }) {
  const [job, setJob] = useState({});
  const [submitCandidate, setSubmitCandidate] = useState(false);
  const [viewJob, setViewJob] = useState(false);

  const { candidates } = useContext(Candidates_context);

  if (!company) return showInfo("Something went wrong!");

  const heading_class =
    "font-semibold text-[clamp(1em,1vw,1.2em)] pb-1 mb-2 border-b w-full border-lighter";

  const handleClicking = (name, jobData) => {
    const job_id = jobData?.job_id;
    setJob(jobData);
    if (name === "View") {
      setViewJob(true);
      sessionStorage.setItem("selected_job_id", job_id);
    } else if (name === "Submit") setSubmitCandidate(true);
  };

  return (
    <AnimatePresence>
      <div
        onClick={() => setClosing(false)}
        className="w-full z-200 overflow-hidden p-4 h-full absolute top-0 left-0 bg-light_black flex items-center justify-center"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: 1,
            x: 0,
            scale: viewJob || submitCandidate ? 0.6 : 1,
          }}
          transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
          className="w-[40%] max-h-full bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
        >
          <Header
            heading={company?.company_name || "N/A"}
            candidate_name={company?.industry_type || "N/A"}
            handleClosingModal={() => setClosing(false)}
          />
          <div className="overflow-y-auto no-scrollbar w-full h-full gap-10 flex flex-col items-center justify-start p-4">
            <CompanyInfoSection
              company={company}
              contactElements={CONTACT_ELEMENTS(company)}
              businessDetails={BUSINESS_DETAILS(company)}
              heading_class={heading_class}
            />
            <CompanyJobsGrid
              jobs={company?.jobs || []}
              candidates={candidates}
              onJobAction={handleClicking}
              heading_class={heading_class}
              // getTotal={(job_id) => getTotalCandidates(job_id)}
              getDays={(created_at) => getDaysPosted(created_at)}
            />
          </div>
        </motion.div>
        {viewJob && (
          <div
            onClick={() => {
              setViewJob(false);
              setClosing(true);
            }}
            className="w-full h-full absolute p-4 top-0 bg-light_black left-0 flex items-center justify-center z-202"
          >
            <CompanyOverlay_AboutJob
              job={job || {}}
              company={company || {}}
              setViewJob={setViewJob}
              heading_class={heading_class}
              openCompanyOverlay={() => setClosing(true)}
            />
          </div>
        )}
        {submitCandidate && (
          <div
            onClick={() => {
              setSubmitCandidate(false);
              setClosing(true);
            }}
            className="w-full h-full absolute p-4 top-0 bg-light_black left-0 flex items-center justify-center z-202"
          >
            <CompanyOverlay_SubmitCandidate
              job={job}
              company={company}
              setClosing={setSubmitCandidate}
              heading_class={heading_class}
              openCompanyOverlay={() => setClosing(true)}
            />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default CompanyViewOverlay;
