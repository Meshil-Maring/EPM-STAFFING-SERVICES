import React, { useEffect, useRef, useState } from "react";
import SettingsHeaders from "./SettingsHeaders";
import Button from "../../common/Button";
import Branch from "./Branch";
import BranchPopup from "./BranchPopup";

function LocationInformation({ branches_information, onBranchUpdate }) {
  const [branchOverlay, setBranchOverlay] = useState(false);
  const [branches, setBranches] = useState(branches_information || []);

  // Sync local state with props when they change
  useEffect(() => {
    if (branches_information && Array.isArray(branches_information)) {
      setBranches(branches_information);
    }
  }, [branches_information]);

  // Update parent when branches change
  useEffect(() => {
    onBranchUpdate(branches);
  }, [branches, onBranchUpdate]);

  // handle New Branch form submission
  const handleNewBranchSubmit = (newBranch) => {
    // Validate that all required fields are present
    if (!newBranch.name || !newBranch.address || !newBranch.type) {
      toast.error("Branch missing required fields:", newBranch);
      return;
    }

    // Add the new branch to the existing branches
    const updatedBranches = [...branches, newBranch];
    onBranchUpdate(updatedBranches);
    setBranchOverlay(false);
  };

  // Triggers the deletion logic in the Settings draft state
  const delete_branch = (id) => {
    const newBranches = branches.filter((_, i) => i !== id);
    setBranches(newBranches);
  };

  // Logic to add a new empty branch to the local draft
  const handleAddNewBranch = () => {
    setBranchOverlay(true);
  };

  // Filter out invalid branches before rendering
  const validBranches =
    branches?.filter(
      (branch) => branch && branch.name && branch.address && branch.type,
    ) || [];

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
        {validBranches.map((branch, index) => (
          <Branch
            id={index}
            branch={branch}
            key={`${branch.name}-${index}`}
            handleDeleting={delete_branch}
          />
        ))}

        {/* Show message if no valid branches */}
        {validBranches.length === 0 && (
          <div className="w-full text-center py-4 text-text_b_l opacity-70">
            No branch locations added yet.
          </div>
        )}
      </ul>

      <Button
        onclick={handleAddNewBranch}
        text={"Add New Branch"}
        class_name="border border-lighter py-3 hover:bg-lighter text-center w-full font-semibold rounded-small transition-all"
      />
      {branchOverlay && <BranchPopup onSubmission={handleNewBranchSubmit} />}
    </section>
  );
}

export default LocationInformation;
