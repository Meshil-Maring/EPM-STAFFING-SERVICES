import React, { useContext, useEffect, useRef } from "react";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { motion, AnimatePresence } from "framer-motion";
function JobCardDeleteOverlay({ onConfirm, card_name }) {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) return null;

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
      <div className="w-full flex items-center justify-center top-0 left-0 absolute h-full overflow-hidden bg-light_black z-2000">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "tween" }}
          ref={targetRef}
          className="p-4 gap-4 shadow-lg w-fit bg-b_white flex flex-col items-center justify-center rounded-small"
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default JobCardDeleteOverlay;
