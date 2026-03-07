import React, { useState, useContext, useEffect } from "react";
import Icon from "../../../common/Icon";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Button from "../../../common/Button";
import { motion, AnimatePresence } from "framer-motion";

function CandidateMiddleInformation({
  icons,
  company,
  currentJob,
  handleViewDetails,
}) {
  // Safe access to job data with fallback values

  const job_name = currentJob["job title"] || "Job not found";
  const company_name = company?.name || "N/A";
  const contract_type = currentJob["contract type"] || "N/A";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        exit={{ x: "-100%", opacity: "0" }}
        className="w-full h-full flex flex-row items-end gap-2 p-2 rounded-small border border-light"
      >
        <div className="w-full flex flex-col items-start gap-2">
          <div className="text-xs text-text_l_b flex flex-row items-center gap-2 justify-start">
            <NameInitials
              name={company_name}
              class_name="w-8 h-8 text-text_white rounded-small flex items-center justify-center bg-[#5629dc]"
            />
            <div className="flex-1 flex flex-col items-start justify-start">
              <Label text={company_name} class_name={""} />
              <Label text={contract_type} class_name={""} />
            </div>
          </div>
          <span className="text-xs text-text_l_b flex flex-row items-center justifstart">
            <Icon icon={icons.suitcase} class_name={"text-nevy_blue"} />{" "}
            <Label text={job_name} class_name="ml-1" />
          </span>
        </div>

        <Button
          onclick={() => handleViewDetails(company, currentJob)}
          text={"View Details"}
          class_name="text-xs py-1 border border-light px-2 whitespace-nowrap hover:bg-lighter cursor-pointer transition-all duration-200 ease-in-out rounded-small"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default CandidateMiddleInformation;
