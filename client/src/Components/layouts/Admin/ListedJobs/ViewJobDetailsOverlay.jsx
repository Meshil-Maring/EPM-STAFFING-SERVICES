import React, { useContext } from "react";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import NameInitials from "../../../common/NameInitials";
import Button from "../../../common/Button";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

function ViewJobDetailsOverlay({ currentJob, company, setClosing }) {
  const { jobs } = useContext(Jobs_context);
  const { company_accounts } = useContext(Company_context);
  const { candidates } = useContext(Candidates_context);

  if (!currentJob || !company) return null;

  const candidate_keys = currentJob["candidate id"] || [];
  const total_applicants = candidate_keys.length;

  return createPortal(
    <div className="absolute top-0 left-0 inset-0 bg-light_black bg-opacity-50 flex items-center justify-center z-5000">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        className="flex relative flex-col items-center justify-center p-8 rounded-small bg-white shadow-xl gap-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
      >
        <span
          onClick={() => setClosing(false)}
          className="p-2 h-8 w-8 flex items-center justify-center text-lg font-semibold rounded-full border-2 text-red border-red cursor-pointer transition-all ease-in-out duration-200 hover:rotate-90 absolute top-2 right-2"
        >
          <Icon icon="ri-close-line" />
        </span>

        <div className="w-full flex flex-col items-start justify-start gap-4">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-start gap-4">
              <NameInitials name={currentJob["job title"]} bg="5629dc" />
              <div className="flex flex-col items-start justify-start">
                <Label
                  text={currentJob["job title"]}
                  class_name="text-lg font-semibold"
                />
                <Label text={company.name} class_name="text-sm text-text_l_b" />
              </div>
            </div>
            <div className="flex flex-col items-end justify-start">
              <Label
                text={`Applicants: ${total_applicants}`}
                class_name="text-sm font-semibold"
              />
              <Label
                text={`Posted: ${currentJob["posted date"]}`}
                class_name="text-xs text-text_l_b"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <Label text="Job Details" class_name="font-semibold" />
              <div className="flex flex-col items-start justify-start gap-1 text-sm">
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-map-pin-line" class_name="text-nevy_blue" />
                  <span>{currentJob.location}</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-suitcase-line" class_name="text-nevy_blue" />
                  <span>{currentJob.experience}</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ri-money-dollar-circle-line"
                    class_name="text-nevy_blue"
                  />
                  <span>{currentJob.salary}</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-time-line" class_name="text-nevy_blue" />
                  <span>{currentJob["contract type"]}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <Label text="Company Details" class_name="font-semibold" />
              <div className="flex flex-col items-start justify-start gap-1 text-sm">
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-building-line" class_name="text-nevy_blue" />
                  <span>{company.name}</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-briefcase-line" class_name="text-nevy_blue" />
                  <span>{company.field}</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-mail-line" class_name="text-nevy_blue" />
                  <span>{company.email}</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ri-calendar-line" class_name="text-nevy_blue" />
                  <span>Joined: {company["joined date"]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-2">
            <Label text="Applicants" class_name="font-semibold" />
            {candidate_keys.length === 0 ? (
              <div className="w-full text-center text-gray-500 py-4">
                No applicants yet
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidate_keys.map((candidate_key) => {
                  const candidate = candidates[candidate_key];
                  if (!candidate) return null;

                  return (
                    <div
                      key={candidate_key}
                      className="flex flex-row items-center justify-start gap-3 p-3 border border-light rounded-small"
                    >
                      <NameInitials
                        name={candidate.name}
                        class_name="w-10 h-10 text-text_white rounded-small flex items-center justify-center bg-[#5629dc]"
                      />
                      <div className="flex flex-col items-start justify-start">
                        <Label text={candidate.name} class_name="font-medium" />
                        <Label
                          text={candidate.location}
                          class_name="text-xs text-text_l_b"
                        />
                        <Label
                          text={candidate["current position"]}
                          class_name="text-xs text-text_l_b"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

export default ViewJobDetailsOverlay;
