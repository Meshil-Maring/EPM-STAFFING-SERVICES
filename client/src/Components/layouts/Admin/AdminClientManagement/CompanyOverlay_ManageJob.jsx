import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";

function CompanyOverlay_ManageJob() {
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0, scale: view || manage ? 0.6 : 1 }}
      transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
      className="w-[40%] h-full bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
    >
      <Header
        heading={company.name}
        candidate_name={company.field}
        handleClosingModal={handleClosing}
      />
    </motion.div>
  );
}

export default CompanyOverlay_ManageJob;
