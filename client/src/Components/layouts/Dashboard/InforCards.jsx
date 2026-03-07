import React, { useContext, useEffect } from "react";
import StatCard from "./StatCard";
import { selected_job_id_context } from "../../../context/SelectedJobContext";
import { Candidates_context } from "../../../context/CandidatesContext";

function InforCards() {
  const { candidates } = useContext(Candidates_context);
  const { selected_job_id } = useContext(selected_job_id_context);

  const potential_candidates = Object.values(candidates)?.filter(
    (candidate) =>
      Array.isArray(candidate["job id"]) &&
      candidate["job id"].includes(selected_job_id),
  );

  useEffect(() => {}, [selected_job_id, candidates]);

  const interviewed = Object.values(potential_candidates).filter(
    (item) => item["offer status"] === "Interviewed",
  ).length;
  const offered = Object.values(potential_candidates).filter(
    (item) => item["offer status"] === "Accepted",
  ).length;
  const inReview = Object.values(potential_candidates).filter(
    (item) => item["offer status"] === "inReview",
  ).length;
  const Rejected = Object.values(potential_candidates).filter(
    (item) => item["offer status"] === "Rejected",
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
      <ul className="w-full h-fit flex flex-row flex-wrap items-center justify-between list-none">
        {info_cards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </ul>
    </section>
  );
}

export default InforCards;
