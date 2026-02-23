import React from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import CandidateMiddleInformation from "./CandidateMiddleInformation";
import { motion } from "framer-motion";
import Details from "./Details";
import CardFooter from "./CardFooter";

function CandidatesContainer({
  filterdCandidates,
  updateCandidate,
  deleteCandidate,
}) {
  const icons = {
    location: "ri-map-pin-line",
    suitcase: "ri-suitcase-line",
    eye: "ri-eye-line",
    eye_off: "ri-eye-off-line",
    calendar: "ri-calendar-line",
    user_edit: "ri-user-line",
  };

  const cand_keys = Object.keys(filterdCandidates);
  return (
    <section className="w-full grid grid-cols-2 items-center justify-center gap-6 p-8 bg-lighter rounded-small">
      {cand_keys.map((key, i) => {
        const candidate = filterdCandidates[key];
        const isPending = candidate.status === "Pending";
        const isInterviewed = candidate.status === "Interviewed";
        const isAccepted = candidate.status === "Accepted";
        const isRejected = candidate.status === "Rejected";
        let bg = "";
        if (isPending) bg = "bg-gold_lighter text-Darkgold";
        if (isInterviewed) bg = "bg-blue-hover text-blue-dark";
        if (isAccepted) bg = "bg-light_green text-green-dark";
        if (isRejected) bg = "bg-red-light text-red-dark";
        return (
          <div
            key={key}
            className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-small bg-white"
          >
            <div className="w-full flex flex-row items-center justify-start gap-4">
              <NameInitials name={candidate.name} bg="5629dc" />
              <div className="flex flex-col items-start justify-start">
                <Label text={candidate.name} class_name="text-sm font-medium" />
                <span className="text-xs text-gray-500 flex flex-row items-center justifstart">
                  <Icon icon={icons.location} class_name={""} />{" "}
                  <Label text={candidate.location} />
                </span>
              </div>
              <Label
                text={candidate.status}
                class_name={`font-lighter text-xs py-1 px-2 rounded-full ml-auto ${bg}`}
              />
            </div>
            <CandidateMiddleInformation icons={icons} candidate={candidate} />
            <Details candidate={candidate} />
            <CardFooter
              icons={icons}
              cand_index={key}
              candidate={candidate}
              updateCandidate={updateCandidate}
              deleteCandidate={deleteCandidate}
            />
          </div>
        );
      })}
    </section>
  );
}

export default CandidatesContainer;
