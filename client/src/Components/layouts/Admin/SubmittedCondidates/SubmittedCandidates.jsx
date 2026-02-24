import React, { useEffect, useState, useContext } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import CandidateNavBar from "./CandidateNavBar";
import { motion, AnimatePresence } from "framer-motion";
import CandidatesContainer from "./CandidatesContainer";
import { Candidates_context } from "../../../../context/CandidatesContext";

function SubmittedCandidates() {
  const { candidates, updateCandidate, deleteCandidate } =
    useContext(Candidates_context) || {};
  const t_candidates = Object.values(candidates || {}).length;
  const p_candidates = Object.values(candidates || {}).filter(
    (candidate) => candidate.status === "Pending",
  ).length;
  const i_candidates = Object.values(candidates || {}).filter(
    (candidate) => candidate.status === "Interviewed",
  ).length;
  const a_candidates = Object.values(candidates || {}).filter(
    (candidate) => candidate.status === "Accepted",
  ).length;
  const r_candidates = Object.values(candidates || {}).filter(
    (candidate) => candidate.status === "Rejected",
  ).length;

  const [filterdCandidates, setFilterdCandidates] = useState({});

  const elements = [
    { label: "Total", icon: "ri-group-line", value: t_candidates },
    { label: "Pending", icon: "ri-time-line", value: p_candidates },
    { label: "Interviewed", icon: "ri-video-on-line", value: i_candidates },
    { label: "Accepted", icon: "ri-checkbox-circle-line", value: a_candidates },
    { label: "Rejected", icon: "ri-close-circle-line", value: r_candidates },
  ];
  return (
    <main className="w-full pt-0 p-6 h-full overflow-y-auto scroll-smooth flex flex-col gap-4 justify-start items-start">
      <section className="w-full mt-4 flex items-center justify-between flex-row flex-wrap">
        {elements.map((el, i) => {
          return (
            <div
              key={i}
              className="w-fit p-2 md:min-w-40 font-lighter text-[clamp(1em,2vw,1.4em)] rounded-small gap-1 flex flex-row items-center justify-center bg-lighter"
            >
              <Icon icon={el.icon} class_name="" />
              <div className="flex flex-col w-full items-center justify-center">
                <Label
                  text={el.label}
                  class_name={"text-[clamp(0.8em,1vw,1em)] font-light"}
                />
                <Label text={el.value} class_name={""} />
              </div>
            </div>
          );
        })}
      </section>
      <CandidateNavBar
        setFilterdCandidates={setFilterdCandidates}
        candidates={candidates}
      />
      {Object.keys(filterdCandidates).length === 0 ? (
        <div className="w-full h-40 flex items-center justify-center">
          <Label text={"No candidates found"} class_name={"text-gray-500"} />
        </div>
      ) : (
        <CandidatesContainer
          filterdCandidates={filterdCandidates}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
        />
      )}
    </main>
  );
}

export default SubmittedCandidates;
