import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import ButtonColor from "../../common/ButtonColor";
import ButtonPlain from "../../common/ButtonPlain";
import Label from "../../common/Label";
import SpanLabel from "../../common/SpanLabel";
import CardIcons from "../../common/CardIcons";
import Icon from "../../common/Icon";
import MoreDetails from "./MoreDetails";
import MoreDetailsRequirements from "./MoreDetailsRequirements";
import Button from "../../common/ButtonColor";
import EditCardDetails from "./EditCardDetails/EditCardDetails";
import { Jobs_context } from "../../../context/JobsContext";

import JobCardDeleteOverlay from "../JobCard/JobCardDeleteOverlay";

function Job_Card({ card, Card_index }) {
  const { deleteJob } = useContext(Jobs_context);

  const [moreDetails, setMoreDetails] = useState(false);
  const [edit_details, setEdit_details] = useState(false);
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleBtnClick = (name) => {
    switch (name) {
      case "Edit Job Post":
        setEdit_details(true);
        setMoreDetails(false);
        break;
      case "View Applications":
        setMessage({ type: "info", text: "Loading applications..." });
        setTimeout(() => {
          setMessage({
            type: "success",
            text: "Redirecting to applications...",
          });
          // Simulate navigation
          setTimeout(() => {
            setMessage({ type: "", text: "" });
          }, 1000);
        }, 1000);
        setMoreDetails(false);
    }
  };

  const handleConfirming = async (name) => {
    if (name === "Confirm") {
      setMessage({ type: "info", text: "Deleting job..." });
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        deleteJob(card.id);
        setMessage({ type: "success", text: "Job deleted successfully!" });
        setDeleteOverlay(false);

        // Clear success message after 2 seconds
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 2000);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to delete job. Please try again.",
        });
      }
    } else {
      setDeleteOverlay(false);
    }
  };

  return (
    <>
      {/* Feedback Message */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : message.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      <section className="w-full p-5 rounded-lg shadow-md border-lighter hover:shadow-lg transition-all duration-300 gap-4 flex flex-col items-start justify-center bg-white">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Label
              text={card.job_title}
              class_name="text-md font-semibold text-text_b"
            />
            <SpanLabel
              text={card.status}
              class_name={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                card.status === "Active"
                  ? "bg-b_light_blue text-nevy_blue"
                  : card.status === "UnActive"
                    ? "text-red-dark bg-red-light"
                    : "text-Darkgold bg-gold_lighter"
              }`}
            />
          </div>

          <nav
            className="flex items-center gap-4 ml-auto"
            aria-label="Job actions"
          >
            <ButtonPlain
              onclick={() => setMoreDetails(true)}
              text="View Details"
              class_name="px-2 py-1 cursor-pointer font-primary-1 tracking-wider border border-light hover:bg-lighter transition-all duration-120 ease-in-out rounded-lg"
            />
            <ButtonColor
              text="Edit"
              onSelect={(e) => setEdit_details(true)}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
            <ButtonColor
              text="Delete"
              onSelect={() => setDeleteOverlay(true)}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
          </nav>
        </div>

        <div className="w-full py-2 border-y border-lighter/50">
          <CardIcons card={card} />
        </div>

        <footer className="flex flex-row flex-wrap gap-6 items-center justify-start w-full opacity-70">
          <div className="flex items-center gap-1.5">
            <i className="ri-team-line text-xs" aria-hidden="true"></i>
            <Label
              text={`${card.slots_available}`}
              class_name="text-xs font-medium"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <i className="ri-calendar-line text-xs" aria-hidden="true"></i>
            <Label
              text={`Posted: ${card.date_posted}`}
              class_name="text-xs font-medium"
            />
          </div>
        </footer>
      </section>

      {/* deleting overlay */}
      {deleteOverlay && (
        <JobCardDeleteOverlay
          onConfirm={handleConfirming}
          card_name={card.job_name}
        />
      )}
      {edit_details && (
        <EditCardDetails
          onclick={setEdit_details}
          card={card}
          Card_index={Card_index}
        />
      )}

      {/*Modal overlay*/}
      {moreDetails && (
        <div
          onClick={() => setMoreDetails(false)}
          className="absolute top-0 left-0 w-full h-full z-1000 bg-light_black flex items-center justify-end p-4"
        >
          {/* Modal Content */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "30%" }}
            exit={{ opacity: 0, width: 0 }}
            className="relative bg-white h-[90%] overflow-hidden rounded-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-lighter flex items-center justify-between bg-white sticky top-0 z-10">
              <Label
                text="Job Specifications"
                class_name="font-bold text-text_b text-[clamp(1em,1.8vw,1.4em)]"
              />
              <button
                onClick={() => setMoreDetails(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-lighter transition-colors"
              >
                <Icon icon="ri-close-line" class_name="text-xl text-text_b" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-8 custom-scrollbar">
              <MoreDetails card={card} />
              <div className="h-px bg-lighter w-full" />
              <MoreDetailsRequirements />
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-lighter bg-gray-100 flex justify-end gap-4">
              {["View Applications", "Edit Job Post"].map((btn) => {
                return (
                  <Button
                    text={btn}
                    onSelect={handleBtnClick}
                    key={btn}
                    class_name={`px-4 py-1.5 transition-all duration-200 ese-in-out cursor-pointer rounded-lg tracking-wider ${btn === "View Applications" ? "bg-g_btn text-text_white" : "hover:bg-lighter border border-light"}`}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Job_Card;
