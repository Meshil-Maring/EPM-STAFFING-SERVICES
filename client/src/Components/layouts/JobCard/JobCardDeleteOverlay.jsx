import React, { useContext, useEffect, useRef } from "react";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { motion, AnimatePresence } from "framer-motion";
function JobCardDeleteOverlay({ onConfirm, card_name }) {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;

    if (!container || !target) return null;

    const updateClicking = (e) => {
      if (!target.contains(e.target)) {
        onConfirm("Cancel");
      }
    };
    window.addEventListener("mousedown", updateClicking);
    return () => window.removeEventListener("mousedown", updateClicking);
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full flex items-center justify-center absolute inset-0 bg-slate-800/20 z-2000"
      >
        <div
          ref={targetRef}
          className="p-4 gap-4 shadow-lg bg-b_white flex flex-col items-center justify-center rounded-small"
        >
          <Label
            text={`You are about the delete this job post "${card_name}". Confirm to continue`}
          />
          <div className="flex flex-row items-center justify-center gap-4">
            {["Confirm", "Cancel"].map((text, index) => {
              return (
                <Button
                  key={index}
                  text={text}
                  onclick={onConfirm}
                  class_name={`border transition-all duration-120 ease-in-out border-light ${text === "Confirm" ? "bg-g_btn border-none text-text_white" : "hover:bg-lighter"} py-1 px-4 rounded-small hover:bg-hoverLight`}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default JobCardDeleteOverlay;
