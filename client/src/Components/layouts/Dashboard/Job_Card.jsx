import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonColor from "../../common/ButtonColor";
import ButtonPlain from "../../common/ButtonPlain";
import Label from "../../common/Label";
import SpanLabel from "../../common/SpanLabel";
import CardIcons from "../../common/CardIcons";
import Icon from "../../common/Icon";
import MoreDetails from "./MoreDetails";
import MoreDetailsRequirements from "./MoreDetailsRequirements";
import Button from "../../common/ButtonColor";

function Job_Card({ card }) {
  const [moreDetails, setMoreDetails] = useState(false);

  const handleEdit = () => {
    alert(`Editing job: ${card.job_name}`);
  };

  const handleViewApplications = () => {
    alert(`Button view more applications`);
  };

  const handleViewMoreDetails = () => {
    setMoreDetails(true);
  };

  useEffect(() => {
    if (moreDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [moreDetails]);

  return (
    <>
      <section className="w-full p-5 rounded-lg shadow-md border border-lighter hover:shadow-lg transition-all duration-300 gap-4 flex flex-col items-start justify-center bg-white">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Label
              text={card.job_name}
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
            <ButtonPlain onclick={handleViewMoreDetails} text="View Details" />
            <ButtonColor text="Edit" onclick={handleEdit} />
          </nav>
        </div>

        <div className="w-full py-2 border-y border-lighter/50">
          <CardIcons card={card} />
        </div>

        <footer className="flex flex-row flex-wrap gap-6 items-center justify-start w-full opacity-70">
          <div className="flex items-center gap-1.5">
            <i className="ri-team-line text-xs" aria-hidden="true"></i>
            <Label
              as="span"
              text={`${card.slots_available}`}
              class_name="text-xs font-medium"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <i className="ri-calendar-line text-xs" aria-hidden="true"></i>
            <Label
              as="span"
              text={`Posted: ${card.date_posted}`}
              class_name="text-xs font-medium"
            />
          </div>
        </footer>
      </section>

      {/* --- IMPROVED MODAL OVERLAY --- */}
      {moreDetails && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMoreDetails(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-lighter flex items-center justify-between bg-white sticky top-0 z-10">
              <Label
                text="Job Specifications"
                class_name="font-bold text-text_b"
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
            <div className="p-4 border-t border-lighter bg-gray-50 flex justify-end gap-3">
              <Button
                text="View Applications"
                onSelect={handleViewApplications}
                class_name="px-2 py-1  cursor-pointer rounded-lg tracking-wider bg-lighter"
              />
              <ButtonColor text="Edit Job Post" onSelect={handleEdit} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Job_Card;
