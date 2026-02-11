import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import JobFormContainer from "./JobFormContainer";

/**
 * Overlay container component for the Job Form
 */
function JobFormOverlay({ children, onClose }) {
  return (
    <JobFormContainer>
      <AnimatePresence>
        <motion.form
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onSubmit={onClose}
          className="w-[40%] h-[90%] overflow-hidden rounded-small border gap-6 border-whiter shadow-xl pb-4 px-6 m-auto flex flex-col bg-white"
        >
          {children}
        </motion.form>
      </AnimatePresence>
    </JobFormContainer>
  );
}

export default JobFormOverlay;
