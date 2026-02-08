import React, { useState } from "react";
import Button from "../../common/Button";
import Location from "../../layouts/Settings/Location";
import JobCardDeleteOverlay from "../../layouts/JobCard/JobCardDeleteOverlay";

function Branch({ branch, handleDeleting, id }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleConfirmDelete = (action) => {
    if (action === "Confirm") {
      handleDeleting(id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <li className="w-full flex items-start gap-4 relative flex-row group">
        <Location
          heading={branch.name}
          address={branch.address}
          link_label={branch.type}
          link={branch.map}
        />
        <Button
          onclick={() => setShowDeleteConfirm(true)}
          text={"Delete"}
          class_name="text-text_white absolute top-4 right-4 bg-red-500 hover:bg-red-600 rounded-small py-1 px-4 font-lighter transition-colors"
        />
      </li>

      {showDeleteConfirm && (
        <JobCardDeleteOverlay
          onConfirm={handleConfirmDelete}
          card_name={branch.name}
        />
      )}
    </>
  );
}

export default Branch;
