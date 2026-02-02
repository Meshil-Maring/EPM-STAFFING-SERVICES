import React from "react";
import Button from "../../common/Button";
import Location from "../../layouts/Settings/Location";

function Branch({ branch, handleDeleting, id }) {
  return (
    <li className="w-full flex items-start gap-4 relative flex-row group">
      <Location
        heading={branch.name}
        address={branch.address}
        link_label={branch.type}
        link={branch.map}
        // If Location component allows editing, you'd pass onBranchUpdate(index, data) here
      />
      <Button
        onclick={() => handleDeleting(id)}
        text={"Delete"}
        class_name="text-text_white absolute top-4 right-4 bg-red-500 hover:bg-red-600 rounded-small py-1 px-4 font-lighter transition-colors"
      />
    </li>
  );
}

export default Branch;
