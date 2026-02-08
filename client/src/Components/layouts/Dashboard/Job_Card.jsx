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
import { selected_job_context } from "../../../context/SelectedJobContext";
import JobCardDeleteOverlay from "../JobCard/JobCardDeleteOverlay";
import { useNavigate } from "react-router-dom";

function Job_Card({ Card_index, card }) {
  const { selected_job, setSelected_job } = useContext(selected_job_context);

  const { deleteJob } = useContext(Jobs_context);
  const navigate = useNavigate();
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
          setTimeout(() => {
            setMessage({ type: "", text: "" });
            navigate("JobApplienceOverview");
          }, 1000);
        }, 1000);
        setMoreDetails(false);
    }
  };

  const handleConfirming = async (name) => {
    if (name === "Confirm") {
      setMessage({ type: "info", text: "Deleting job..." });
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        deleteJob(Card_index);
        setMessage({ type: "success", text: "Job deleted successfully!" });

        // Clear success message and close overlay after 2 seconds
        setTimeout(() => {
          setMessage({ type: "", text: "" });
          setDeleteOverlay(false);
        }, 2000);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to delete job. Please try again.",
        });
        setDeleteOverlay(false);
      }
    } else {
      setDeleteOverlay(false);
    }
  };

  const handleViewCandidates = () => {
    setSelected_job(card);
    navigate("JobApplienceOverview");
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

      <section
        onClick={handleViewCandidates}
        className="w-full p-5 rounded-standard border shadow-xl border-lighter transition-all duration-300 gap-4 flex flex-col items-start justify-center bg-white"
      >
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Label
              text={card["job title"]}
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
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-4 ml-auto"
            aria-label="Job actions"
          >
            <ButtonPlain
              onclick={() => (setMoreDetails(true), setSelected_job(card))}
              text="View cardetails"
              class_name="px-2 py-1 cursor-pointer font-primary-1 tracking-wider border border-light hover:bg-lighter transition-all duration-120 ease-in-out rounded-lg"
            />
            <ButtonColor
              text="Edit"
              onSelect={(e) => (setSelected_job(card), setEdit_details(true))}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
            <ButtonColor
              text="Delete"
              onSelect={() => (setSelected_job(card), setDeleteOverlay(true))}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
          </nav>
        </div>

        <div className="w-full py-2  border-y border-lighter/50">
          <CardIcons selected_job={card} />
        </div>

        <footer className="flex relative flex-row flex-wrap gap-6 items-center justify-start w-full opacity-70">
          <div className="flex items-center gap-1.5">
            <i className="ri-team-line text-xs" aria-hidden="true"></i>
            <Label
              text={`${card["max applications"] - card["applicants"]}`}
              class_name="text-xs font-medium"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <i className="ri-calendar-line text-xs" aria-hidden="true"></i>
            <Label
              text={`Posted: ${card["date posted"]}`}
              class_name="text-xs font-medium"
            />
          </div>
          {card.priority === true && card.status.toLowerCase() === "active" && (
            <div className="absolute flex text-nevy_blue flex-row flex-wrap items-center justify-center right-0 gap-2">
              <Label
                text={"Priority : "}
                class_name={"text-[clamp(0.8em,0.8vw,1em)]"}
              />
              <motion.span
                title="This Openning is on High Priority Mode"
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  type: "tween",
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className=""
              >
                <Icon
                  icon={"ri-flashlight-line"}
                  class_name="font-md text-[clamp(1em,1.2vw,1.4em)] w-5 h-5 rounded-full"
                />
              </motion.span>
            </div>
          )}
        </footer>
      </section>

      {/* deleting overlay */}
      {deleteOverlay && (
        <JobCardDeleteOverlay
          onConfirm={handleConfirming}
          card_name={selected_job["job title"]}
        />
      )}
      {edit_details && (
        <EditCardDetails onclick={setEdit_details} Card_index={Card_index} />
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
            <div className="p-6 overflow-y-auto no-scrollbar flex flex-col gap-8 custom-scrollbar">
              <MoreDetails selected_job={selected_job} />
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
