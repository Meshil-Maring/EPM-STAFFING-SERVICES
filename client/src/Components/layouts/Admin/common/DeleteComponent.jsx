import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Label from "../../../common/Label";
import Button from "../../../common/Button";

function DeleteComponent({ Close, item, setError, handleConfirm }) {
  return (
    <div
      onClick={() => Close(false)}
      className="w-full h-full p-4 bg-light_black absolute overflow-hidden top-0 left-0 flex items-center justify-center"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            stiffness: 150,
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-fit bg-b_white p-4 gap-4 top-0 left-0 rounded-small items-center justify-center flex flex-col"
        >
          <Label text={`⚠ Are you sure you want to delete "${item}"`} />
          <div className="flex flex-row items-center justify-center gap-2">
            {["Confirm", "Cancel"].map((btn) => {
              const handleBtnClick = (name) => {
                switch (name) {
                  case "Confirm":
                    handleConfirm();
                    Close(false);
                    break;
                  case "Cancel":
                    setError({
                      type: "success",
                      text: "Canceled deletion",
                    });
                    Close(false);
                    break;
                }
                setTimeout(() => {
                  setError({ type: "", text: "" });
                }, [2000]);
              };
              const isConfirm = btn === "Confirm";
              return (
                <Button
                  onclick={handleBtnClick}
                  key={btn}
                  text={btn}
                  class_name={`px-2 py-1 rounded-small ${isConfirm ? "text-text_white bg-g_btn" : "border border-lighter"}`}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default DeleteComponent;
