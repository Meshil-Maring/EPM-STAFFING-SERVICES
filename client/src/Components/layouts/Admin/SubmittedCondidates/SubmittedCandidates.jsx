import React, { useState, useContext } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import CandidateNavBar from "./CandidateNavBar";
import CandidatesContainer from "./CandidatesContainer";
import { Candidates_context } from "../../../../context/CandidatesContext";

function SubmittedCandidates() {
  const { candidates, updateCandidate, deleteCandidate } =
    useContext(Candidates_context) || {};
  const t_candidates = Object.values(candidates || {}).length;
  const p_candidates = Object.values(candidates || {}).filter(
    (candidate) =>
      candidate?.["offer status"]?.toLocaleLowerCase() === "pending",
  ).length;
  const i_candidates = Object.values(candidates || {}).filter(
    (candidate) =>
      candidate?.["offer status"]?.toLocaleLowerCase() === "interviewed",
  ).length;
  const a_candidates = Object.values(candidates || {}).filter(
    (candidate) =>
      candidate?.["offer status"]?.toLocaleLowerCase() === "accepted",
  ).length;
  const r_candidates = Object.values(candidates || {}).filter(
    (candidate) =>
      candidate?.["offer status"]?.toLocaleLowerCase() === "rejected",
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
