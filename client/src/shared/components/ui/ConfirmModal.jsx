import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import Label from "./Label";
import Button from "./Button";
function ConfirmModal({ handleConfirming, message }) {
  return createPortal(
    <div className="w-full flex items-center justify-center bg-light_black/40 z-200 inset-0 absolute top-0 left-0">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-b_white p-4 rounded-sm flex flex-col items-center justify-center gap-2"
        >
          <Label text={message} class_name="text-sm font-lighter text-text" />
          <div className="w-full flex flex-row items-center justify-center gap-2">
            {[
              { label: "Confirm", id: "confirm" },
              { label: "Cancel", id: "cancel" },
            ].map((btn) => {
              return (
                <Button
                  key={btn.id}
                  onclick={() => handleConfirming(btn.id)}
                  text={btn.label}
                  class_name={`w-full border border-lighter py-1 shadow-lighter shadow-sm rounded-md cursor-pointer ${btn.id === "confirm" ? "bg-g_btn text-text_white" : "bg-lighter"}`}
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

export default ConfirmModal;
