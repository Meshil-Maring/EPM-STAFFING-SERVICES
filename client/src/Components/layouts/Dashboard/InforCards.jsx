import React, { useContext } from "react";
import StatCard from "./StatCard";
import { selected_job_id_context } from "../../../context/SelectedJobContext";
import { Company_context } from "../../../context/AccountsContext";
import { Candidates_context } from "../../../context/CandidatesContext";
import { Jobs_context } from "../../../context/JobsContext";

function InforCards() {
  const { companyAccounts } = useContext(Company_context);
  const { candidates } = useContext(Candidates_context);
  const { selected_job_id } = useContext(selected_job_id_context);
  const job_key = Object.keys(Jobs_context).find(
    (key) => Jobs_context[key] === selected_job_id,
  );
  const potential_candidates = Object.values(candidates).filter(
    (candidate) => candidate["job id"] === job_key,
  );

  const interviewed = Object.values(potential_candidates).filter(
    (item) => item.status === "Interviewed",
  ).length;
  const offered = Object.values(potential_candidates).filter(
    (item) => item.status === "Accepted",
  ).length;
  const inReview = Object.values(potential_candidates).filter(
    (item) => item.status === "inReview",
  ).length;
  const Rejected = Object.values(potential_candidates).filter(
    (item) => item.status === "Rejected",
  ).length;

  const info_cards = [
    {
      name: "Interview",
      total: interviewed,
      status: "Scheduled",
      icon: "ri-vidicon-line",
      color: "bg-blueGradient",
    },
    {
      name: "Offer",
      total: offered,
      status: "Released",
      icon: "ri-file-text-line",
      color: "bg-greenGradient",
    },
    {
      name: "In Review",
      total: inReview,
      status: "Pending",
      icon: "ri-search-line",
      color: "bg-grayGradient",
    },
    {
      name: "Rejected",
      total: Rejected,
      status: "Not Fit",
      icon: "ri-close-circle-line",
      color: "bg-g_red",
    },
  ];

  return (
    <section className="w-full py-4">
      <ul className="w-full h-fit flex flex-row flex-wrap items-center justify-center gap-6 list-none p-0">
        {info_cards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </ul>
    </section>
  );
}

export default InforCards;
