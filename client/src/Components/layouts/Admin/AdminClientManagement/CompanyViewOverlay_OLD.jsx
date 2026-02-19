import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Header from "../../Dashboard/Candidate/Common/Header";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import Button from "../../../common/Button";
import CompanyOverlay_AboutJob from "./CompanyOverlay_AboutJob";
import CompanyOverlay_SubmitCandidate from "./CompanyOverlay_SubmitCandidate";
import CompanyInfoSection from "./CompanyInfoSection";
import {
  getTotalCandidates,
  getDaysPosted,
  getCompanyKey,
  getRelatedJobs,
  CONTACT_ELEMENTS,
  BUSINESS_DETAILS,
} from "../../../../utils/companyOverlayHelpers";

function CompanyViewOverlay({ company, setClosing }) {
  const [showAll, setShowAll] = useState(false);
  const { jobs } = useContext(Jobs_context);
  const { companyAccounts } = useContext(Company_context);
  const { candidates } = useContext(Candidates_context);
  // Early return if company is null or undefined
  if (!company || !companyAccounts) return null;

  const [job, setJob] = useState({});

  const comp_key = Object.keys(companyAccounts).find(
    (key) => companyAccounts[key] === company,
  );
  const related_jobs = Object.keys(jobs).filter(
    (key) => jobs[key]["company id"] === comp_key,
  );

  const elements = [
    { label: "Email", icon: "ri-mail-line", value: company.email },
    { label: "Phone", icon: "ri-phone-line", value: company.email },
    { label: "Location", icon: "ri-map-pin-line", value: company.email },
    { label: "Website", icon: "ri-global-line", value: company.email },
  ];

  const business_details = [
    {
      label: "Joined Date",
      icon: "ri-calendar-line",
      value: company["joined date"],
    },
    {
      label: "CIN number",
      icon: "ri-id-card-line",
      value: company["registration number"],
    },
  ];
  const heading_class =
    "font-semibold text-[clamp(1em,1vw,1.2em)] pb-1 mb-2 border-b w-full border-lighter";

  const DetailContainer = ({ icon, label, value }) => {
    return (
      <div className="flex rounded-small py-2 flex-row items-start justify-start gap-1 p-1 rounded-smalll bg-nevy_blue/10">
        <Icon icon={icon} class_name="text-lg font-lighter w-6 h-6" />
        <div className="flex flex-col itemsc-start justify-start">
          <Label text={label} class_name={"font-semibold text-sm"} />
          <Label
            text={value}
            class_name={"font-lighter text-xs tracking-wide"}
          />
        </div>
      </div>
    );
  };

  const getTotalCandidates = (key) => {
    const potentialCandidates = Object.values(candidates).filter(
      (candidate) => candidate["job id"] === key,
    );
    return showAll
      ? potentialCandidates.length
      : potentialCandidates.slice(0, 3).length;
  };
  const getDaysPosted = (key) => {
    const date = jobs[key]["date posted"];
    const [day, month, year] = date.split("/").map(Number);
    const postedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    postedDate.setHours(0, 0, 0, 0);

    const dateDiffer = today - postedDate;
    const daysDiffer = Math.floor(dateDiffer / (1000 * 60 * 60 * 24));
    return daysDiffer;
  };

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  const handleClosing = () => {
    setClosing(false);
  };

  const handleAddList = (key) => {
    alert("Not yet implemented");
  };

  const [manage, setManage] = useState(false);
  const [view, setViewMore] = useState(false);
  const handleClicking = (name, job) => {
    setJob(job);
    switch (name) {
      case "View":
        setViewMore(true);
        break;
      case "Submit":
        setManage(true);
        break;
    }
  };

  const handleOpening_CompanyOverlay = () => {
    setClosing(true);
  };
  const handleCloseManage = () => setManage(false);

  return (
    <AnimatePresence>
      <div
        onClick={() => setClosing(false)}
        className="w-full z-200 overflow-hidden p-4 h-full absolute top-0 left-0 bg-light_black flex items-center justify-center"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0, scale: view || manage ? 0.6 : 1 }}
          transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
          className="w-[40%] h-full bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
        >
          <Header
            heading={company.name}
            candidate_name={company.field}
            handleClosingModal={handleClosing}
          />
          <div className="overflow-y-auto no-scrollbar w-full h-full gap-10 flex flex-col items-center justify-start p-4">
            <div className="w-full flex flex-col items-start justify--start">
              <Label text={"Contact Information"} class_name={heading_class} />
              <div className="w-full grid grid-cols-2 gap-4 items-center justify-center overflow-hidden">
                {elements.map((el, i) => {
                  return (
                    <DetailContainer
                      key={`element-${i}`}
                      icon={el.icon}
                      label={el.label}
                      value={el.value}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <Label text={"Business Details"} class_name={heading_class} />
              <div className="w-full flex flex-row gap-4 items-start justify-start flex-wrap">
                {business_details.map((item, i) => {
                  return (
                    <DetailContainer
                      key={`business-${i}`}
                      icon={item.icon}
                      label={item.label}
                      value={item.value}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start">
              <Label text={"Notes (Description)"} class_name={heading_class} />
              <div className="w-full flex flex-row items-start justify-start gap-1 p-2 bg-nevy_blue/10 rounded-small">
                <Icon icon={"ri-file-text-line"} class_name="text-lg w-5 h-5" />
                <Label text={company.description} class_name={""} />
              </div>
            </div>
            <div className="w-full gap-2 grid grid-cols-1 items-center">
              <div
                className={`gap-2 flex flex-row items-center justify-start ${heading_class}`}
              >
                <Label
                  text={`Active Job Openings (${related_jobs.length})`}
                  class_name={""}
                />
                <div
                  onClick={handleShowAll}
                  className="flex items-center justify-center h-fit w-fit"
                >
                  <Label
                    text={"Show All"}
                    class_name={
                      "text-nevy_blue font-lighter text-xs tracking-wide"
                    }
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-1 items-center justify-center h-fit gap-2">
                {related_jobs.map((key, i) => {
                  const job = jobs[key];
                  const total_candidates = getTotalCandidates(key);
                  const days_posted = getDaysPosted(key);
                  return (
                    <div
                      key={`job-${i}`}
                      className="w-full gap-2 flex flex-row items-start jsutify-start ga-2 p-2 rounded-small bg-lighter"
                    >
                      <Icon
                        icon={"ri-suitcase-line"}
                        class_name="w-8 h-8 text-[clamp(1.2em,1vw,1.4em)]  rounded-small p-1 bg-nevy_blue text-text_white"
                      />
                      <div className="flex-1 items-start justify-start flex flex-col">
                        <div className="flex flex-row items-center justify-start gap-2">
                          <Label text={job["job title"]} class_name={""} />
                          <div
                            onClick={() => handleAddList(key)}
                            className="w-fit cursor-pointer hover:scale-[1.04] transition-all duration-200 ease-in-out"
                          >
                            <Label
                              text={"Add list"}
                              class_name="px-2 py-0.5 rounded-small bg-g_btn text-text_white"
                            />
                          </div>
                        </div>
                        <div className="flex-1 text-[10px] gap-1 flex flex-row items-center justify-start">
                          <Label text={job["contract type"]} />
                          •
                          <Label
                            text={
                              total_candidates === 0
                                ? "No candidates yet"
                                : `${total_candidates} candidates`
                            }
                          />
                          •
                          <Label
                            text={`Posted ${days_posted === 0 ? "today" : `${days_posted} days ago`}`}
                          />
                        </div>
                      </div>
                      <div className="flex text-xs flex-row gap-2 items-center justify-center">
                        <div
                          onClick={() => handleClicking("View", job)}
                          className="w-fit cursor-pointer p-1 border border-light/50 rounded-small flex items-center justify-center"
                        >
                          <Icon
                            icon={"ri-eye-line"}
                            class_name="h-4 w-4 mr-1"
                          />
                          <Label text={"View"} class_name={""} />
                        </div>
                        <div
                          onClick={() => handleClicking("Submit", job)}
                          className="w-fit bg-Darkgold text-text_white cursor-pointer p-1 border border-light/50 rounded-small flex items-center justify-center"
                        >
                          <Label text={"Submit"} class_name={""} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
        {view && (
          <div
            onClick={() => {
              (setViewMore(false), setClosing(true));
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
              (setManage(false), setClosing(true));
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
