import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CompanyOverlay_AboutJob from "./CompanyOverlay_AboutJob";
import CompanyOverlay_SubmitCandidate from "./CompanyOverlay_SubmitCandidate";
import CompanyInfoSection from "./CompanyInfoSection";
import CompanyJobsGrid from "./CompanyJobsGrid";
import {
  getCompanyKey,
  getRelatedJobs,
  getTotalCandidates,
  getDaysPosted,
  CONTACT_ELEMENTS,
  BUSINESS_DETAILS,
} from "../../../../utils/companyOverlayHelpers";

function CompanyViewOverlay({ company, setClosing }) {
  const [showAll, setShowAll] = useState(false);
  const [job, setJob] = useState({});
  const [manage, setManage] = useState(false);
  const [view, setViewMore] = useState(false);

  const { jobs } = useContext(Jobs_context);
  const { companyAccounts } = useContext(Company_context);
  const { candidates } = useContext(Candidates_context);

  if (!company || !companyAccounts) return null;

  const comp_key = getCompanyKey(companyAccounts, company);
  const related_jobs = getRelatedJobs(jobs, comp_key);
  const heading_class =
    "font-semibold text-[clamp(1em,1vw,1.2em)] pb-1 mb-2 border-b w-full border-lighter";

  const handleShowAll = () => setShowAll((prev) => !prev);
  const handleClosing = () => setClosing(false);
  const handleCloseManage = () => setManage(false);
  const handleOpening_CompanyOverlay = () => setClosing(true);

  const handleClicking = (name, jobData) => {
    setJob(jobData);
    if (name === "View") setViewMore(true);
    else if (name === "Submit") setManage(true);
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
            scale: view || manage ? 0.6 : 1,
          }}
          transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
          className="w-[40%] h-full bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
        >
          <Header
            heading={company.name}
            candidate_name={company.field}
            handleClosingModal={handleClosing}
          />
          <div className="overflow-y-auto no-scrollbar w-full h-full gap-10 flex flex-col items-center justify-start p-4">
            <CompanyInfoSection
              company={company}
              contactElements={CONTACT_ELEMENTS}
              businessDetails={BUSINESS_DETAILS(company)}
              heading_class={heading_class}
            />
            <CompanyJobsGrid
              relatedJobs={related_jobs}
              jobs={jobs}
              candidates={candidates}
              showAll={showAll}
              onShowAll={handleShowAll}
              onJobAction={handleClicking}
              heading_class={heading_class}
              getTotal={(k) => getTotalCandidates(candidates, k, showAll)}
              getDays={(k) => getDaysPosted(jobs, k)}
            />
          </div>
        </motion.div>
        {view && (
          <div
            onClick={() => {
              setViewMore(false);
              setClosing(true);
            }}
            className="w-full h-full absolute p-4 top-0 bg-light_black left-0 flex items-center justify-center z-202"
          >
            <CompanyOverlay_AboutJob
              job={job}
              company={company}
              setClosing={setViewMore}
              heading_class={heading_class}
              openCompanyOverlay={handleOpening_CompanyOverlay}
            />
          </div>
        )}
        {manage && (
          <div
            onClick={() => {
              setManage(false);
              setClosing(true);
            }}
            className="w-full h-full absolute p-4 top-0 bg-light_black left-0 flex items-center justify-center z-202"
          >
            <CompanyOverlay_SubmitCandidate
              job={job}
              company={company}
              setClosing={handleCloseManage}
              heading_class={heading_class}
              openCompanyOverlay={handleOpening_CompanyOverlay}
            />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default CompanyViewOverlay;
