import React, { useState } from "react";
import Header from "./Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";
import MoreDetails from "./MoreDetails";
import MoreDetailsRequirements from "./MoreDetailsRequirements";
import Button from "../../common/Button";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { showInfo } from "../../../utils/toastUtils";

function JobCardMoreDetails({ setMoreDetails, card, setEditPost }) {
  if (!card) return;

  const navigate = useNavigate();
  // tracking if user want to edit the job post

  // handle editing the job post
  const handleBtnClick = (name) => {
    if (name === "Edit Job Post") {
      setMoreDetails(false);
      setEditPost(true);
      return;
    }

    if (name === "View Applications") {
      showInfo("Redirecting to applications...");
      const selected_job_id = card?.id;
      setTimeout(() => {
        navigate(`interview_pipeline/${encodeURIComponent(selected_job_id)}`);
      }, 1000);
    }
  };

  return createPortal(
    <div
      onClick={() => setMoreDetails(false)}
      className={`absolute overflow-hidden top-0 left-0 w-full h-full z-1000 bg-light_black flex items-center justify-center p-4`}
    >
      {/* Modal Content */}
      <AnimatePresence mode="wait">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
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
            {["Edit Job Post", "View Applications"].map((btn) => {
              return (
                <Button
                  text={btn}
                  onclick={handleBtnClick}
                  key={btn}
                  class_name={`px-4 py-2 w-full transition-all duration-200 ese-in-out cursor-pointer rounded-large tracking-wider font-semibold ${btn === "View Applications" ? "bg-g_btn text-text_white" : "hover:bg-lighter border border-light"}`}
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
