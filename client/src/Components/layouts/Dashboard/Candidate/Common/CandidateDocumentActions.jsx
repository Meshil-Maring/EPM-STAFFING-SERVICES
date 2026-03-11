import React, { useState } from "react";
import Icon from "../../../../common/Icon";
import Label from "../../../../common/Label";
import { showInfo, showSuccess } from "../../../../../utils/toastUtils";

/**
 * Renders the footer action bar for downloading candidate documents.
 * Contributor Note: Uses a flex-row layout that scales items equally for a balanced UI.
 */
function CandidateDocumentActions() {
  const [downloading, setDownloading] = useState("");

  const documents = ["Resume", "Cover Letter", "Portfolio"];

  const handleDownload = (doc) => {
    setDownloading(doc);
    showInfo(`Downloading ${doc}...`);

    // Simulate download
    setTimeout(() => {
      showSuccess(`${doc} downloaded successfully!`);
      setDownloading("");
    }, 1000);
  };

  return (
    <div className="w-full border-t border-lighter py-2 px- flex flex-col gap-2 bg-white">
      <div className="flex flex-row items-center justify-between gap-3">
        {documents.map((doc) => (
          <div
            key={doc}
            onClick={() => handleDownload(doc)}
            className={`w-full flex items-center justify-between rounded-small flex-row py-1.5 px-3 text-white bg-g_btn hover:opacity-90 transition-opacity cursor-pointer shadow-sm ${
              downloading === doc ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {/* Download icon aligned to the left of the button text */}
            <Icon icon="ri-download-cloud-2-line" class_name="w-5 h-5" />
            <Label
              text={downloading === doc ? "Downloading..." : doc}
              class_name="w-full whitespace-nowrap text-[clamp(0.7em,1vw,0.9em)] font-medium px-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateDocumentActions;
