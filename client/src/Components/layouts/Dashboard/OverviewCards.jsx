import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import SpanLabel from "../../common/SpanLabel";
import Icon from "../../common/Icon";
import NameInitials from "../../common/NameInitials";
import candidate_icons from "../../dummy_data_structures/candidate_icons.json";
import { motion, AnimatePresence } from "framer-motion";
import Candidate_more_details from "./Candidate/Candidate_more_details";
import Commenting from "./Candidate/Commenting";
import InterviewScheduling from "./Candidate/InterviewScheduling";
import ReleaseOffer from "./Candidate/ReleaseOffer";
function OverviewCards({ candidate, id }) {
  const cand_detailsRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const [cand_view, set_cand_view] = useState(false);

  const isScheduled = candidate.status.toLowerCase() === "scheduled";

  const [scheduleInterviewOverlay, setScheduleInterview] = useState(false);
  const [downloadResume, setDownloadResume] = useState(false);
  const [commentOverlay, setCommentOverlay] = useState(false);
  const [releaseOffer, setReleaseOffer] = useState(false);
  const handleCandidateButtons = (name) => {
    const button_name = name.toLowerCase();
    switch (button_name) {
      case "schedule interview":
        setScheduleInterview(true);
        break;
      case "download resume":
        setDownloadResume(true);
        alert("Not yet implemented");
        break;
      case "add comment":
        setCommentOverlay(true);
        break;
      case "release offer":
        setReleaseOffer(true);
        break;
      case "reject":
        alert("Not yet implemented offer Rejection");
        break;
    }
  };

  return (
    <article
      onClick={() => set_cand_view(true)}
      className="flex hover:border overflow-x-hidden hover:border-nevy_blue border border-lighter shadow-sm rounded-small w-full flex-col md:flex-row items-start justify-start gap-6 px-5 py-6 bg-white"
    >
      <NameInitials name={candidate.name} id={id} />

      <div className="flex flex-col flex-1 items-start justify-start gap-2 w-full">
        <header className="flex flex-wrap items-center justify-start gap-4 w-full">
          <Label
            as="h3"
            text={candidate.name}
            class_name="text-base font-bold text-text_b tracking-tight"
          />
          <SpanLabel
            text={candidate.status}
            class_name={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              isScheduled
                ? "text-blue bg-blueBackground"
                : "text-red-dark bg-red-light"
            }`}
          />
        </header>

        <ul
          className="flex flex-wrap items-center justify-start gap-2 list-none p-0"
          aria-label="Skills"
        >
          {candidate.skills.map((skill, index) => (
            <li key={index}>
              <Label
                as="span"
                text={skill}
                class_name="text-xs font-medium bg-lighter px-2.5 py-1 rounded-small text-primary border border-lighter/50"
              />
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {candidate_icons.more_info.map((info, index) => {
            const obj_key = info.label.toLowerCase();

            const value = candidate[obj_key];
            return (
              <div
                className="p-3 gap-1 bg-hover-light/30 border border-lighter rounded-small flex flex-col items-start justify-center transition-colors hover:bg-hover-light"
                key={index}
              >
                <div className="flex flex-row items-center text-blue gap-2">
                  <Icon icon={info.icon} class_name="text-sm" />
                  <Label
                    as="span"
                    text={info.label}
                    class_name="text-[10px] font-bold uppercase opacity-70"
                  />
                </div>
                <Label
                  text={value}
                  class_name="text-sm font-semibold text-text_b"
                />
              </div>
            );
          })}
        </div>

        <footer
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap items-center justify-start gap-3 w-full pt-2 border-t border-lighter/50 mt-2"
        >
          {/* Download Resume Button - First in the list */}
          <button
            type="button"
            className="flex flex-row items-center text-[clamp(0.8em,1vw,1em)] font-bold px-4 py-2 rounded-small border border-lighter bg-transparent text-secondary hover:bg-lighter hover:border-blue hover:text-blue transition-all duration-200 active:scale-95 outline-none focus:ring-2 focus:ring-blue focus:ring-offset-1"
            onClick={() => {
              // Simulate download - in a real app, this would trigger file download
              alert(`Downloading resume for ${candidate.cand_name}`);
            }}
            aria-label={`Download resume for ${candidate.cand_name}`}
          >
            <Icon
              icon="ri-download-cloud-2-line"
              class_name="mr-2 font-lighter"
            />
            Download Resume
          </button>

          {Object.keys(candidate_icons.buttons).map((key) => {
            const btn = candidate_icons.buttons[key];

            return (
              <button
                onClick={() => handleCandidateButtons(btn.btn_name)}
                key={key}
                type="button"
                className={`flex flex-row items-center text-xs font-bold px-4 py-2 rounded-small transition-all duration-200 active:scale-95 outline-none focus:ring-2 focus:ring-offset-1 ${
                  key === "schedule"
                    ? "bg-blue text-white hover:bg-darkBlue focus:ring-blue"
                    : key === "comment"
                      ? "bg-blueBackground text-blue hover:bg-blue/10 focus:ring-blue"
                      : key === "offer"
                        ? "bg-Darkgold text-white hover:bg-Darkgold-hover focus:ring-Darkgold"
                        : "border border-lighter text-secondary hover:bg-lighter focus:ring-lighter"
                }`}
              >
                <Icon icon={btn.icon} class_name="mr-2" />
                {btn.btn_name}
              </button>
            );
          })}

          <button
            onClick={handleToggleDetails}
            type="button"
            className="ml-auto p-2 text-xl text-secondary hover:text-primary transition-colors focus:ring-2 focus:ring-blue rounded-full"
            aria-label={showDetails ? "Hide details" : "Show details"}
            aria-expanded={showDetails}
          >
            <i
              className={showDetails ? "ri-eye-line" : "ri-eye-off-line"}
              aria-hidden="true"
            />
          </button>
        </footer>
      </div>
      {cand_view && (
        <div
          onClick={(e) => {
            (e.stopPropagation(), set_cand_view(false));
          }}
          className="w-full overflow-x-hidden h-full z-200 border absolute top-0 left-0 bg-light_black flex items-center justify-end"
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "32%", opacity: 1 }}
            className="h-[90%] bg-b_white overflow-x-hidden rounded-small mr-2"
          >
            <Candidate_more_details
              candidate={candidate}
              closeOverlay={() => set_cand_view(false)}
            />
          </motion.div>
        </div>
      )}
      {commentOverlay && (
        <div
          onClick={(e) => {
            (e.stopPropagation(), setCommentOverlay(false));
          }}
          className="w-full overflow-x-hidden h-full z-200 border absolute top-0 left-0 bg-light_black flex items-center justify-end"
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "32%", opacity: 1 }}
            className="h-fit bg-b_white overflow-x-hidden rounded-small mr-2"
          >
            <Commenting
              candidate={candidate}
              closeOverlay={() => setCommentOverlay(false)}
            />
          </motion.div>
        </div>
      )}
      {scheduleInterviewOverlay && (
        <div
          onClick={(e) => {
            (e.stopPropagation(), setScheduleInterview(false));
          }}
          className="w-full overflow-x-hidden h-full z-200 border absolute top-0 left-0 bg-light_black flex items-center justify-end"
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "32%", opacity: 1 }}
            className="h-fit bg-b_white overflow-x-hidden rounded-small mr-2"
          >
            <InterviewScheduling
              handleClosing={() => setScheduleInterview(false)}
              candidate={candidate}
            />
          </motion.div>
        </div>
      )}
      {releaseOffer && (
        <div
          onClick={(e) => {
            (e.stopPropagation(), setReleaseOffer(false));
          }}
          className="w-full overflow-x-hidden h-full z-200 border absolute top-0 left-0 bg-light_black flex items-center justify-end"
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "32%", opacity: 1 }}
            className="h-fit bg-b_white overflow-x-hidden rounded-small mr-2"
          >
            <ReleaseOffer
              handleClosing={() => setReleaseOffer(false)}
              candidate={candidate}
            />
          </motion.div>
        </div>
      )}
    </article>
  );
}

export default OverviewCards;
