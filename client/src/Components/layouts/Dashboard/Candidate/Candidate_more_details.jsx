import React from "react";
import Header from "./Common/Header";
import Candidate_main_details from "./Candidate_main_details";
import CandidateBioSection from "./CandidateBioSection";
import candidate_icons from "../../../dummy_data_structures/candidate_icons.json";
import CandidateDocumentActions from "./Common/CandidateDocumentActions";
import Label from "../../../common/Label";
/**
 * Main drawer component for viewing full candidate profiles.
 * Orchestrates the data flow to sub-components for Bio, Skills, and Actions.
 */
function Candidate_more_details({ candidate, closeOverlay }) {
  const icons = candidate_icons.details_icons;

  return (
    <>
      {/* Sticky Header provides context and a close action */}
      <Header
        candidate_name={candidate.name}
        heading="Candidate Profile"
        handleClosingModal={closeOverlay}
      />
      <div className="w-full flex h-full flex-col items-center justify-start gap-4 p-4 overflow-y-auto">
        {/* Grid for core contact/info tiles (Email, Phone, etc.) */}
        <Label
          text={"Personal Information"}
          class_name={
            "border-b border-lighter w-full mb-2 pb-1 font-semibold text_text_b"
          }
        />
        <div className="w-full grid grid-cols-2 gap-4">
          {icons.map((icon, index) => (
            <Candidate_main_details
              key={index}
              candidate={candidate}
              icon={icon}
            />
          ))}
        </div>

        {/* Section for Bio (Story) and Skill list */}
        <CandidateBioSection bio={candidate.bio} skills={candidate.skills} />

        {/* Footer bar for Resume and Portfolio downloads */}
        <CandidateDocumentActions />
      </div>
    </>
  );
}

export default Candidate_more_details;
