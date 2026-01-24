import React from "react";
import Label from "../../common/Label";
import LabelInput2 from "../../common/LabelInput2";
import Button from "../../common/Button";
import { motion, AnimatePresence } from "framer-motion";

function BranchPopup({
  newBranchOverlayRef,
  handleNewBranchSubmit,
  handleSaving,
}) {
  return (
    <div className="flex items-center justify-center inset-0 absolute top-0 left-0 bg-slate-600/60 z-2000">
      <motion.form
        ref={newBranchOverlayRef}
        onSubmit={handleNewBranchSubmit}
        className="flex bg-b_white gap-2 flex-col items-start w-[40%] h-[60%] justify-start p-4 rounded-small"
      >
        <Label
          text={"Add a New Branch"}
          class_name={"font-semibold text-xl text-text_b"}
        />
        <div className="flex flex-col items-center justify-start gap-4 w-full">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
            <LabelInput2 />
            <LabelInput2 />
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
            <LabelInput2 />
            <LabelInput2 />
          </div>
        </div>
        <Button
          onclick={handleSaving}
          class_name="w-full bg-g_btn py-2 rounded-small text-text_white font-semibold"
          text={"Save"}
        />
      </motion.form>
    </div>
  );
}

export default BranchPopup;
