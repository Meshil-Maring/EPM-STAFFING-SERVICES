import React from "react";
import Header from "./Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";
import MoreDetails from "./MoreDetails";
import MoreDetailsRequirements from "./MoreDetailsRequirements";
import Button from "../../common/Button";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function JobCardMoreDetails({ setMoreDetails, card }) {
  const navigate = useNavigate();

  const handleBtnClick = (name) => {
    navigate(`/client/dashboard/job-overview/${card?.id}`);
  };

  return createPortal(
    <div
      onClick={() => setMoreDetails(false)}
      className="absolute overflow-hidden top-0 left-0 w-full h-full z-1000 bg-light_black flex items-center justify-center p-4"
    >
      {/* Modal Content */}
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, type: "tween" }}
          className="relative bg-white max-h-full w-[40%] overflow-hidden rounded-xl shadow-2xl flex flex-col"
        >
          {/* Header */}

          <Header
            heading={"Job Specifications"}
            candidate_name={card?.job_name || "N/A"}
            handleClosingModal={() => setMoreDetails(false)}
          />

          {/* Scrollable Body */}
          <div className="p-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
            <div className="h-px bg-lighter w-full" />
            <MoreDetailsRequirements card={card} />
          </div>

          {/* Footer Actions */}
          <div className="w-full px-4 py-2 border-t border-lighter flex justify-center gap-4">
            {["View Applications"].map((btn) => {
              return (
                <Button
                  text={btn}
                  key={btn}
                  onclick={() => handleBtnClick()}
                  class_name={`px-4 py-1 w-full transition-all duration-200 ese-in-out cursor-pointer rounded-small tracking-wider ${btn === "View Applications" ? "bg-g_btn text-text_white" : "hover:bg-lighter border border-light"}`}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default JobCardMoreDetails;
