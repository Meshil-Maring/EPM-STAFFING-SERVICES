import React, { useState } from "react";
import Label from "../../../common/Label";
import LabelInput from "../../../common/LabelInput";
import UrgentJob from "./UrgentJob";
import Button from "../../../common/Button";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";
import JobStatus from "./JobStatus";
import Header from "../Candidate/Common/Header";
import { motion, AnimatePresence, isBezierDefinition } from "framer-motion";
import { showError, showInfo, showSuccess } from "../../../../utils/toastUtils";

import {
  updateByColumnNameIdService,
  updateByIdService,
} from "../../../../utils/server_until/service";

function EditCardDetails({ setEditJobPost, card }) {
  // new Local form state to handle edits before saving
  const [newForm_data, setNewForm_data] = useState(card || {});

  // state to prevent multiple rapid clicks on save
  const [isSaving, setIsSaving] = useState(false);

  // Early return if card is not provided - avoid side effects during render
  if (!card) {
    showError("Job Data missing!");
    return null;
  }

  // Handler to update form state on input changes
  const handle_update_form = (value, id) => {
    setNewForm_data((prev) => ({ ...prev, [id]: value }));
  };

  // handle requirementes, responsibilities, benefits updates - works with flat array format: ["req1", "req2", ...]
  const [requirements, setRequirements] = useState(
    Object.values(card?.requirements?.[0] || {}) || [],
  );
  const [responsibilities, setResponsibilities] = useState(
    Object.values(card?.responsibilities?.[0] || {}) || [],
  );
  const [benefits, setBenefits] = useState(
    Object.values(card?.benefits?.[0] || {}) || [],
  );

  // Helper function to update a value at a specific index in a deeply nested object structure
  // The data structure is: [{ "0": { "0": { "0": { "0": "text", "1": "text" } } } }]
  const updateNestedValue = (obj, targetIndex, newValue, currentDepth = 0) => {
    // Base case: if obj is a string, we've gone too deep
    if (typeof obj === "string") {
      return obj;
    }

    // Find the deepest level of nesting
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      // Empty object, add the value at index 0
      return { [targetIndex]: newValue };
    }

    // Check if any value is a string (we're at the target level)
    const hasStringValues = Object.values(obj).some(
      (v) => typeof v === "string",
    );

    if (hasStringValues) {
      // We're at the level where string values are stored
      const updatedObj = { ...obj };
      // Find the actual key at targetIndex
      const stringValues = Object.values(obj);
      const stringKeys = Object.keys(obj);
      if (targetIndex < stringValues.length) {
        updatedObj[stringKeys[targetIndex]] = newValue;
      }
      return updatedObj;
    }

    // Recursively go deeper
    const updatedObj = {};
    for (const key of keys) {
      updatedObj[key] = updateNestedValue(
        obj[key],
        targetIndex,
        newValue,
        currentDepth + 1,
      );
    }
    return updatedObj;
  };

  // Handler to update a specific requirement, responsibility, or benefit
  // Works with flat array format: ["req1", "req2", ...]
  const handleUpdateReq_Res_Ben = (section, index, newValue) => {
    // updating requirements state for immediate UI feedback - works with flat array format: ["req1", "req2", ...]
    if (section === "requirements") {
      setRequirements((prev) => [
        ...prev.slice(0, index),
        newValue,
        ...prev.slice(index + 1),
      ]);
    }

    // updating responsibilities state for immediate UI feedback - works with flat array format: ["res1", "res2", ...]
    if (section === "responsibilities") {
      setResponsibilities((prev) => [
        ...prev.slice(0, index),
        newValue,
        ...prev.slice(index + 1),
      ]);
    }
    // updating benefits state for immediate UI feedback - works with flat array format: ["ben1", "ben2", ...]
    if (section === "benefits") {
      setBenefits((prev) => [
        ...prev.slice(0, index),
        newValue,
        ...prev.slice(index + 1),
      ]);
    }

    // updating benefits state for immediate UI feedback - works with flat array format: ["ben1", "ben2", ...]
    if (section === "benefits") {
      setBenefits((prev) => [
        ...prev.slice(0, index),
        newValue,
        ...prev.slice(index + 1),
      ]);
    }
  };

  // Handler to delete a requirement, responsibility or benefit by index
  // Works with flat array format: ["req1", "req2", ...]
  const deleteReq_Res_Ben = (section, indexToDelete) => {
    //  Deleting requirements
    if (section === "requirements") {
      setRequirements((prev) => prev.filter((_, i) => i !== indexToDelete));
    }
    // Deleting responsibilities
    if (section === "responsibilities") {
      setResponsibilities((prev) => prev.filter((_, i) => i !== indexToDelete));
    }
    // Deleting benefits
    if (section === "benefits") {
      setBenefits((prev) => prev.filter((_, i) => i !== indexToDelete));
    }
  };

  // handler to add a new empty requirement, responsibility or benefit
  // Works with flat array format: ["req1", "req2", ...]
  const addingReq_Res_Ben = (section) => {
    // Adding requirements
    if (section === "requirements") {
      setRequirements((prev) => [...prev, ""]);
    }
    // Adding responsibilities
    if (section === "responsibilities") {
      setResponsibilities((prev) => [...prev, ""]);
    }
    // Adding benefits
    if (section === "benefits") {
      setBenefits((prev) => [...prev, ""]);
    }
  };

  // Handler to save changes - calls multiple update services for different tables
  const handleSaveChanges = async () => {
    if (isSaving) return;

    // Validation: Check for at least one requirement, responsibility, and benefit
    // Works with flat array format: ["req1", "req2", ...]
    const sectionsToValidate = [
      { id: "requirements", name: "Requirement" },
      { id: "responsibilities", name: "Responsibility" },
      { id: "benefits", name: "Benefit" },
    ];

    for (const section of sectionsToValidate) {
      const data = newForm_data[section.id];
      // Check if data is an array and has at least one non-empty value
      if (!Array.isArray(data) || data.length === 0) {
        return showInfo(`At least one ${section.name} is required`);
      }
      const hasNonEmptyValue = data.some((val) => val && val !== "");
      if (!hasNonEmptyValue) {
        return showInfo(
          `Any initialized ${section.name} field must be filled in`,
        );
      }
    }

    setIsSaving(true);

    // Handling form superbase timestamp
    const toSupabaseTimestamp = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      if (isNaN(date)) return null;
      return date.toISOString();
    };

    const readyJobs = {
      spot_available: Number(newForm_data?.max_applications),
      active: newForm_data?.active,
      urgent: newForm_data?.priority,
      job_name: newForm_data?.job_name,
      job_type: newForm_data?.job_type,
      salary_min: newForm_data?.salary_min ?? null,
      salary_max: newForm_data?.salary_max ?? null,
      experience_years: newForm_data?.experience_years,
      max_applications: Number(newForm_data?.max_applications), // ensure number not string
      deadline: toSupabaseTimestamp(newForm_data?.deadline),
      description: newForm_data?.description,
      location: newForm_data?.location,
    };

    try {
      await updateByIdService(
        "api/dr/update/id",
        readyJobs,
        "jobs",
        newForm_data?.id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { requirements: { ...requirements } },
        "job_requirements",
        "job_id",
        newForm_data?.id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { responsibilities: { ...responsibilities } },
        "job_responsibilities",
        "job_id",
        newForm_data?.id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { benefits: { ...benefits } },
        "job_benefits",
        "job_id",
        newForm_data?.id,
      );

      showSuccess("Job updated successfully!");
      setEditJobPost(false); //  Close overlay on success
    } catch (error) {
      console.error("Failed to save job:", error);
    } finally {
      setIsSaving(false); // Always re-enable button (on success or error)
    }
  };

  const icon_class =
    "font-semibold text-sm rounded-full hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";
  const input_class_name =
    "border border-light/60 w-full p-2 placeholder-text_b rounded-small focus:outline-none focus:ring-1 ring-nevy_blue";
  const label_class_name = "font-semibold text-sm";

  const sections = [
    { id: "requirements", label: "Requirements" },
    {
      id: "responsibilities",
      label: "Responsibilities",
    },
    { id: "benefits", label: "Benefits & Perks" },
  ];

  const display_text = card?.active
    ? "This job is active and candidates can apply. Applications will be reviewed by the hiring team."
    : `This job has been Deactivated`;

  return (
    <AnimatePresence>
      <div
        onClick={() => setEditJobPost(false)}
        className="flex items-center text-sm justify-center p-4 absolute overflow-hidden top-0 left-0 w-full h-full bg-light_black z-50"
      >
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, type: "tween" }}
          onClick={(e) => e.stopPropagation()}
          className="h-full w-[40%] overflow-hidden rounded-small shadow-xl flex flex-col bg-white"
        >
          <Header
            heading={card?.job_name || "N/A"}
            candidate_name={"Edit Job Post"}
            handleClosingModal={() => setEditJobPost(false)}
          />
          <div className="flex overflow-y-auto no-scrollbar overflow-x-hidden gap-6 p-4 flex-col items-start justify-between w-full flex-1">
            <JobStatus
              job_status={newForm_data?.active}
              handle_update_form={handle_update_form}
              heading={"Job Status"}
              label={display_text}
            />

            <LabelInput
              onchange={handle_update_form}
              id={"job_name"}
              text="Job Title"
              value={newForm_data?.job_name || "N/A"}
              label_class_name={label_class_name}
              input_class_name={input_class_name}
              type="text"
            />

            <UrgentJob
              heading="Mark as Urgent"
              label="This will assign a priority badge to your listing"
              priority={newForm_data?.urgent}
              handle_update_form={handle_update_form}
            />

            <EditComponentAnchor
              card={newForm_data}
              handleInputChange={handle_update_form}
            />

            {sections.map((section) => {
              const isRes = section.id === "responsibilities";
              const isBen = section.id === "benefits";
              const isReq = section.id === "requirements";
              return (
                <div
                  key={section.id}
                  className="gap-1 w-full flex flex-col items-start justify-start"
                >
                  <Label
                    text={section.label}
                    class_name={`border-b border-lighter pb-1 mb-2 w-full ${label_class_name}`}
                  />
                  <RequirementsEditComponent
                    section_id={section.id}
                    icon_class={icon_class}
                    data_prop={
                      isRes
                        ? responsibilities
                        : isBen
                          ? benefits
                          : isReq
                            ? requirements
                            : []
                    }
                    updateReq_Res_Ben={handleUpdateReq_Res_Ben}
                    deletingReq_Res_Ben={deleteReq_Res_Ben}
                    addingReq_Res_Ben={addingReq_Res_Ben}
                  />
                </div>
              );
            })}

            {/* Disabled + dimmed while saving */}
            <Button
              text={isSaving ? "Saving..." : "Save Changes"}
              onclick={handleSaveChanges}
              class_name={`py-2 w-full text-center rounded-small bg-g_btn text-text_white transition-opacity duration-200 ${
                isSaving
                  ? "opacity-60 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EditCardDetails;
