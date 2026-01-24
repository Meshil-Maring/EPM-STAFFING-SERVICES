import React from "react";

function Branch({ location, handleDeleting, id }) {
  return (
    <li className="w-full flex items-start gap-4 relative flex-row group">
      <Location
        heading={location.name}
        address={location.address}
        link_label={location.type}
        link={location.map}
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
