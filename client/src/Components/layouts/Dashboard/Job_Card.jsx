import React, { useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import Header from "./Candidate/Common/Header";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

function Job_Card({ Card_index, card }) {
  console.log(Card_index);

  const { deleteJob } = useContext(Jobs_context);
  const navigate = useNavigate();
  const [moreDetails, setMoreDetails] = useState(false);
  const [edit_details, setEdit_details] = useState(false);
  const [deleteOverlay, setDeleteOverlay] = useState(false);

  // Function to set selected job ID
  const setSelectedJobId = (jobId) => {
    sessionStorage.setItem("selected_job_id", jobId);
  };

  const handleBtnClick = (name) => {
    if (name === "Edit Job Post") {
      setEdit_details(true);
      setMoreDetails(false);
      return;
    }
    if (name === "View Applications") {
      toast("Redirecting to applications...");
      setTimeout(() => {
        navigate("interview_pipeline");
      }, 1000);
      return;
    }
  };

  const handleConfirming = (name) => {
    if (name === "Confirm") {
      try {
        toast.success("Job deleted successfully!");
        deleteJob(Card_index);

        setTimeout(() => {
          setDeleteOverlay(false);
        }, 1000);
      } catch (error) {
        toast.error("Failed to delete job. Please try again.");
        setDeleteOverlay(false);
      }
    } else {
      setDeleteOverlay(false);
    }
  };

  const handle_card_action = (name) => {
    if (name === "View Details") setMoreDetails(true);
    if (name === "Edit") setEdit_details(true);
    if (name === "Delete") setDeleteOverlay(true);
    return sessionStorage.setItem("selected_job_id", Card_index);
  };

  return (
    <>
      <section className="w-full p-5 rounded-[8px] cursor-pointer hover:scale-[1.02] hover:shadow-md border  border-lighter transition-all duration-300 gap-4 flex flex-col items-start justify-center bg-white">
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
              onclick={handle_card_action}
              text="View Details"
              class_name="px-2 py-1 cursor-pointer text-[14px] tracking-wider border border-light hover:bg-lighter transition-all duration-120 ease-in-out rounded-lg"
            />
            <ButtonColor
              text="Edit"
              onSelect={handle_card_action}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
            <ButtonColor
              text="Delete"
              onSelect={handle_card_action}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
          </nav>
        </div>

        <div className="w-full py-2  border-y border-lighter/50">
          <CardIcons job_card={card} />
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
              <span title="This Openning is on High Priority Mode" className="">
                <Icon
                  icon={"ri-flashlight-line"}
                  class_name="font-md text-[clamp(1em,1.2vw,1.4em)] w-5 h-5 rounded-full"
                />
              </span>
            </div>
          )}
        </footer>
      </section>

      {/* deleting overlay */}
      {deleteOverlay && (
        <JobCardDeleteOverlay
          onConfirm={handleConfirming}
          card_name={card["job title"]}
        />
      )}
      {edit_details && <EditCardDetails setEditJobPost={setEdit_details} />}

      {/*Modal overlay*/}
      {moreDetails && (
        <div
          onClick={() => setMoreDetails(false)}
          className="absolute top-0 left-0 w-full h-full z-1000 bg-light_black flex items-center justify-center p-4"
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
                candidate_name={card["job title"] || "N/A"}
                handleClosingModal={() => setMoreDetails(false)}
              />

              {/* Scrollable Body */}
              <div className="p-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
                <MoreDetails card={card} />
                <div className="h-px bg-lighter w-full" />
                <MoreDetailsRequirements card={card} />
              </div>

              {/* Footer Actions */}
              <div className="w-full px-4 py-2 border-t border-lighter flex justify-center gap-4">
                {["View Applications", "Edit Job Post"].map((btn) => {
                  return (
                    <Button
                      text={btn}
                      onSelect={handleBtnClick}
                      key={btn}
                      class_name={`px-4 py-1 w-full transition-all duration-200 ese-in-out cursor-pointer rounded-small tracking-wider ${btn === "View Applications" ? "bg-g_btn text-text_white" : "hover:bg-lighter border border-light"}`}
                    />
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default Job_Card;
