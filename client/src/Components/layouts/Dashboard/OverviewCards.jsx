import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NameInitials from "../../common/NameInitials";
import Drawer from "./Candidate/Common/Drawer";
import CandidateHeader from "./Candidate/Common/CandidateHeader";
import CandidateInfoGrid from "./Candidate/Common/CandidateInfoGrid";
import CandidateActionFooter from "./Candidate/Common/CandidateActionFooter";

import Candidate_more_details from "./Candidate/Candidate_more_details";
import Commenting from "./Candidate/Commenting";
import InterviewScheduling from "./Candidate/InterviewScheduling";
import ReleaseOffer from "./Candidate/ReleaseOffer";

/**
 * OverviewCards is the main container for a candidate's summary view.
 * It manages the conditional rendering of all side-drawers and
 * orchestrates data flow between the card and the action overlays.
 */
function OverviewCards({ candidate, id }) {
  /* Tracks which overlay is currently open: 'details', 'comment', 'schedule', or 'offer' */
  const [activeView, setActiveView] = useState(null);

  /**
   * Maps string-based action names from buttons to specific state views.
   * @param {string} name - The label of the button clicked.
   */
  const handleAction = (name) => {
    const act = name.toLowerCase();
    if (act.includes("schedule")) setActiveView("schedule");
    else if (act.includes("comment")) setActiveView("comment");
    else if (act.includes("offer")) setActiveView("offer");
    else if (act.includes("resume")) alert("Downloading...");
  };

  /* Resets the active view to null, triggering the AnimatePresence exit animation */

  return (
    <article
      /* Clicking the card body defaults to opening the more details view */
      onClick={() => setActiveView("details")}
      className="flex hover:border border border-lighter shadow-sm rounded-small w-full flex-col md:flex-row gap-6 px-5 py-6 bg-white cursor-pointer transition-shadow duration-200 hover:shadow-md"
    >
      {/* Visual representation of candidate (usually initials in a colored circle) */}
      <NameInitials name={candidate.name} id={id} />

      <div className="flex flex-col flex-1 gap-2 w-full">
        <CandidateHeader name={candidate.name} status={candidate.status} />

        <CandidateInfoGrid candidate={candidate} />

        <CandidateActionFooter
          onAction={handleAction}
          toggleDetails={() => setActiveView("details")}
          activeView={activeView}
        />
      </div>

      {/* AnimatePresence enables exit animations for components removed from the DOM */}
      <AnimatePresence>
        {/* Detail View Drawer */}
        {activeView === "details" && (
          <Drawer closeOverlay={() => setActiveView(null)}>
            <Candidate_more_details
              candidate={candidate}
              closeOverlay={() => setActiveView(null)}
            />
          </Drawer>
        )}

        {/* Commenting Drawer - uses fit-content for a smaller vertical footprint */}
        {activeView === "comment" && (
          <Drawer closeOverlay={() => setActiveView(null)} height="fit-content">
            <Commenting
              candidate={candidate}
              closeOverlay={() => setActiveView(null)}
            />
          </Drawer>
        )}

        {/* Scheduling Drawer */}
        {activeView === "schedule" && (
          <Drawer closeOverlay={() => setActiveView(null)}>
            <InterviewScheduling
              handleClosing={() => setActiveView(null)}
              candidate={candidate}
            />
          </Drawer>
        )}

        {/* Offer Release Drawer */}
        {activeView === "offer" && (
          <Drawer closeOverlay={() => setActiveView(null)}>
            <ReleaseOffer
              handleClosing={() => setActiveView(null)}
              candidate={candidate}
            />
          </Drawer>
        )}
      </AnimatePresence>
    </article>
  );
}

export default OverviewCards;
