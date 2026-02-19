import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";

function FileUploadSection({
  label_class,
  setResume,
  setPortfolio,
  setCover_letter,
}) {
  // Store filenames in an object to track each input separately
  const [fileNames, setFileNames] = useState({
    resume: null,
    "cover letter": null,
    portfolio: null,
  });

  const fileItems = [
    { label: "Attach Resume* (PDF)", id: "resume" },
    { label: "Attach Cover Letter (PDF)", id: "cover letter" },
    { label: "Attach Portfolio (PDF)", id: "portfolio" },
  ];

  const handleChange = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update the parent state functions
    switch (id) {
      case "resume":
        setResume(file);
        break;
      case "cover letter": // Fixed the typo: removed the extra ")"
        setCover_letter(file);
        break;
      case "portfolio":
        setPortfolio(file);
        break;
      default:
        break;
    }

    // Update the local filename state to trigger a re-render
    setFileNames((prev) => ({
      ...prev,
      [id]: file.name,
    }));
  };

  return (
    <div className="w-full gap-4 grid grid-cols-3 items-center justify-center">
      <AnimatePresence>
        {fileItems.map((item, i) => {
          // Check if this specific item has a name in state
          const currentFileName = fileNames[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 * i, type: "tween" }}
              className="w-full gap-1 flex flex-col items-start justify-start"
            >
              <Label text={item.label} class_name={`text-xs ${label_class}`} />

              <input
                onChange={(e) => handleChange(item.id, e)}
                accept=".pdf"
                type="file"
                id={item.id}
                className="hidden"
              />

              <label
                htmlFor={item.id}
                className="w-full cursor-pointer relative h-20 border-2 border-dotted border-light/60 rounded-small flex items-center justify-center"
              >
                {/* Logic: Show text if name exists, otherwise show the icon */}
                {currentFileName ? (
                  <span className="w-full p-2 text-center text-xs break-all truncate">
                    {currentFileName}
                  </span>
                ) : (
                  <span className="font-semibold text-[clamp(1.4em,2vw,2em)] text-light/60">
                    <Icon icon={"ri-download-cloud-2-line"} />
                  </span>
                )}
              </label>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default FileUploadSection;
