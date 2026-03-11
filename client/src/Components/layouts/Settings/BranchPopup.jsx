import React, { useState } from "react";
import { toast } from "react-toastify";
import Label from "../../common/Label";
import LabelInput2 from "../../common/LabelInput2";
import Button from "../../common/Button";
import { motion, AnimatePresence } from "framer-motion";
import { validate_mapLink } from "../../../utils/mapValidator";
function BranchPopup({ onSubmission }) {
  const [saving, setSaving] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: "",
    type: "",
    map: "",
  });

  const handleSaving = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  const handleInputChange = (value, id) => {
    setNewBranch((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNewBranchSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(newBranch).find((value) => value === "");
    if (isEmpty) return toast.error("All fileds are required!");
    const map_link = validate_mapLink(newBranch.map);
    const { valid } = map_link;
    if (valid === true) return onSubmission(newBranch);
    else return toast.error("Invalid gps map link");
  };

  return (
    <AnimatePresence>
      <div className="flex items-center justify-center inset-0 absolute top-0 left-0 bg-slate-600/0 z-2000">
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          exit={{ scale: 0.9, opacity: 0 }}
          onSubmit={(e) => handleNewBranchSubmit(e)}
          className="flex bg-b_white gap-2 flex-col items-start w-[40%] h-auto justify-start p-4 rounded-small shadow-xl"
        >
          <Label
            type="text"
            text={"Add a New Branch"}
            class_name={"font-semibold text-xl text-text_b"}
          />
          <div className="flex flex-col items-center justify-start gap-4 w-full">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
              <LabelInput2
                type="text"
                id={"name"}
                text={"New Branch Name"}
                onChange={handleInputChange}
              />
              <LabelInput2
                type="text"
                id={"address"}
                text={"New Branch Address"}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
              <LabelInput2
                type="text"
                id={"type"}
                text={"Type of Branch"}
                onChange={handleInputChange}
                placeholder={"eg. Headquarters, Regional Office..."}
              />
              <LabelInput2
                type="text"
                id={"map"}
                text={"Location"}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button
            onclick={handleSaving}
            class_name="w-full bg-g_btn py-2 rounded-small text-text_white font-semibold"
            text={saving ? "Saving..." : "Save"}
            type="submit"
          />
        </motion.form>
      </div>
    </AnimatePresence>
  );
}

export default BranchPopup;
