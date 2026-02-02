import React, { useEffect, useRef, useState } from "react";
import SettingsHeaders from "./SettingsHeaders";
import Button from "../../common/Button";
import Branch from "./Branch";
import BranchPopup from "./BranchPopup";
function LocationInformation({ location_information, onBranchUpdate }) {
  const [branchOverlay, setBranchOverlay] = useState(false);
  const [branches, setBranches] = useState(location_information.branches);

  useEffect(() => {
    onBranchUpdate(branches);
  }, [branches]);

  // handle New Branch form submission
  const handleNewBranchSubmit = () => {
    // Logic
  };

  // handle adding branch
  const handleSaving = () => {
    setBranchOverlay(false);
  };
  // Triggers the deletion logic in the Settings draft state
  const delete_branch = (id) => {
    const newBranches = branches.filter((_, i) => i !== id);
    setBranches(newBranches);
  };

  // Logic to add a new empty branch to the local draft
  const handleAddNewBranch = () => {
    // setBranchOverlay(true);
    const newBranch = {
      name: "New Branch",
      address: "Enter address here",
      type: "Branch Office",
      map: "http://maps.google.com",
    };
    alert("Not yet implemented!!");

    // We update the whole branches array in the draft
  };

  return (
    <section className="w-full pb-10 flex flex-col text-text_b text-sm border p-6 md:p-8 rounded-small border-lighter shadow-sm items-center justify-start gap-8 bg-white">
      <SettingsHeaders
        icon_bg="bg-nevy_blue"
        icon="ri-map-pin-line"
        heading="Branch Locations"
        label="Your offices across different cities"
      />

      <ul className="w-full flex flex-col gap-4 list-none p-0 m-0">
        {/* Mapping through the actual data from the draft state */}
        {branches?.map((branch, index) => (
          <Branch
            id={index}
            branch={branch}
            key={index}
            handleDeleting={delete_branch}
          />
        ))}
      </ul>

      <Button
        onclick={handleAddNewBranch}
        text={"Add New Branch"}
        class_name="border border-lighter py-3 hover:bg-lighter text-center w-full font-semibold rounded-small transition-all"
      />
      {branchOverlay && (
        <BranchPopup
          handleNewBranchSubmit={handleNewBranchSubmit}
          handleSaving={handleSaving}
        />
      )}
    </section>
  );
}

export default LocationInformation;
