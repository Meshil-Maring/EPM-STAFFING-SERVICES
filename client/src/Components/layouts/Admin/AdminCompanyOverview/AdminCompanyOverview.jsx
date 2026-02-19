import React, { useContext, useMemo } from "react";
import { selected_company_id_context } from "../../../../context/SelectedJobContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import { Company_context } from "../../../../context/AccountsContext";
import { motion, AnimatePresence } from "framer-motion";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import CompanyRequirements from "./CompanyRequirements.jsx";

function AdminCompanyOverview() {
  const { companyAccounts } = useContext(Company_context) || {};
  const { selected_company_id } = useContext(selected_company_id_context) || {};
  const { candidates } = useContext(Candidates_context) || {};

  // Get the company object from the context

  const selectedCompany = companyAccounts[selected_company_id];

  // Filter candidates for this company
  const potentialCandidates = useMemo(() => {
    if (!candidates || !selected_company_id) return [];

    return Object.values(candidates).filter(
      (candidate) => candidate?.["company id"] === selected_company_id,
    );
  }, [candidates, selected_company_id]);

  const scheduled_candidates = potentialCandidates.filter(
    (candidate) => candidate["offer status"] === "Accepted",
  );
  const offered_candidates = potentialCandidates.filter(
    (candidate) => candidate["offer status"] === "Pending",
  );
  const inView_candidates = potentialCandidates.filter(
    (candidate) => candidate["offer status"] === "Interviewed",
  );
  const rejected_candidates = potentialCandidates.filter(
    (candidate) => candidate["offer status"] === "Rejected",
  );

  console.log(rejected_candidates);

  const info_cards = [
    {
      label: "Interviews",
      icon: "ri-vidicon-line",
      value: scheduled_candidates.length,
      bg: "bg-nevy_blue",
      note: "Scheduled",
    },
    {
      label: "Offer",
      icon: "ri-file-text-line",
      value: offered_candidates.length,
      bg: "bg-text_green",
      note: "Released",
    },
    {
      label: "In Review",
      icon: "ri-vidicon-line",
      value: inView_candidates.length,
      bg: "bg-heavy",
      note: "Pending",
    },
    {
      label: "Rejected",
      icon: "ri-vidicon-line",
      value: rejected_candidates.length,
      bg: "bg-red-dark",
      note: "Not Fit",
    },
  ];

  return (
    <AnimatePresence>
      <div className="w-full p-4 h-full flex flex-col items-center justify-start gap-10">
        <div className="w-full flex flex-row items-center justify-between">
          {info_cards.map((card, i) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  type: "tween",
                  delay: i * 0.1,
                }}
                key={card.label}
                className={`w-54 rounded-small relative p-4 flex flex-col items-center justify-center text-text_white ${card.bg}`}
              >
                <div className="w-14 h-14 rounded-full bg-b_white/20 absolute -top-4 -right-4" />
                <div className="w-full flex flex-row text-[clamp(1em,2vw,1.2em)] items-center justify-between">
                  <Label text={card.label} class_name={""} />
                  <Icon icon={card.icon} class_name={""} />
                </div>
                <Label
                  text={card.value}
                  class_name={"font-semibold text-[clamp(1.2em,2vw,1.4em)]"}
                />
                <Label text={card.note} class_name={""} />
              </motion.div>
            );
          })}
        </div>
        <div className="w-full flex border-2 rounded-small p-4 border-highLightBorder">
          <CompanyRequirements company={selectedCompany} />
        </div>
      </div>
    </AnimatePresence>
  );
}

export default AdminCompanyOverview;
