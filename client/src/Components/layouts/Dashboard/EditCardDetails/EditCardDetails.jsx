import React, { useContext, useState } from "react";
import Label from "../../../common/Label";
import LabelInput from "../../../common/LabelInput";
import UrgentJob from "./UrgentJob";
import Button from "../../../common/Button";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";
import JobStatus from "./JobStatus";
import Header from "../Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";
import { showInfo, showSuccess } from "../../../../utils/toastUtils";

import {
  updateByColumnNameIdService,
  updateByIdService,
} from "../../../../utils/server_until/service";

function EditCardDetails({ setEditJobPost, job }) {
  // new Local form state to handle edits before saving
  const [newForm_data, setNewForm_data] = useState(job || {});

  // state to prevent multiple rapid clicks on save
  const [isSaving, setIsSaving] = useState(false);

  // Feed back if job date is missing or invalid (shouldn't happen but just in case)
  if (!job) {
    return showInfo("Loading failed!");
  }

  // Handler to update form state on input changes
  const handle_update_form = (value, id) => {
    setNewForm_data((prev) => ({ ...prev, [id]: value }));
  };

  // Handler to update a specific requirement, responsibility, or benefit
  const handleUpdateReq_Res_Ben = (section, key, newValue) => {
    setNewForm_data((prev) => {
      // 1. Create a shallow copy of the array for that section
      const updatedArray = [...prev[section]];

      // 2. Create a shallow copy of the first object in that array
      // This is where the actual key-value pairs (0, 1, 2...) live
      const updatedFirstObject = {
        ...updatedArray[0],
        [key]: newValue,
      };

      // 3. Put the updated object back into the first position of the array
      updatedArray[0] = updatedFirstObject;

      // 4. Return the new state object
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Handler to delete a requirement, responsibility or benefit by index
  const deleteReq_Res_Ben = (section, keyToDelete) => {
    setNewForm_data((prev) => {
      // 1. Get the first object from the array (e.g., benefits[0])
      const firstObject = { ...prev[section][0] };

      // 2. Remove the specific key
      delete firstObject[keyToDelete];

      // 3. Re-index the remaining values to prevent gaps (0, 1, 2...)
      // Object.values returns ['val0', 'val2'] if 'val1' was deleted
      const reIndexedObject = Object.values(firstObject).reduce(
        (acc, val, index) => {
          acc[index.toString()] = val;
          return acc;
        },
        {},
      );

      // 4. Update the array with the new re-indexed object
      const updatedArray = [...prev[section]];
      updatedArray[0] = reIndexedObject;

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // handler to add a new empty requirement, responsibility or benefit
  const addingReq_Res_Ben = (section) => {
    setNewForm_data((prev) => {
      // 1. Target the specific array
      const targetArray = [...prev[section]];

      // 2. Target the first object in that array
      const firstObject = { ...targetArray[0] };

      // 3. Determine the next key (Length of keys gives you the next 0-based index)
      const nextKey = Object.keys(firstObject).length;

      // 4. Update that first object
      targetArray[0] = {
        ...firstObject,
        [nextKey]: "",
      };

      // 5. Update the state with the modified array
      return {
        ...prev,
        [section]: targetArray,
      };
    });
  };
  // Handler to save changes - calls multiple update services for different tables
  const handleSaveChanges = async () => {
    if (isSaving) return;
    setIsSaving(true);

    // Handling form superbase timestamp
    const toSupabaseTimestamp = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      if (isNaN(date)) return null;
      return date.toISOString();
    };

    const readyJobs = {
      active: newForm_data?.job_status,
      urgent: newForm_data?.priority,
      job_name: newForm_data?.job_name,
      job_type: newForm_data?.job_type,
      salary_min: newForm_data?.salary_min ?? null,
      salary_max: newForm_data?.salary_max ?? null,
      experience_years: newForm_data?.experience_years,
      max_applications: Number(newForm_data?.max_applications), // ensure number not string
      deadline: toSupabaseTimestamp(newForm_data?.deadline),
      description: newForm_data?.job_description,
      location: newForm_data?.location,
    };

    try {
      await updateByIdService(
        "api/dr/update/id",
        readyJobs,
        "jobs",
        newForm_data.job_id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { requirements: { ...newForm_data.requirements } },
        "job_requirements",
        "job_id",
        newForm_data.job_id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { responsibilities: { ...newForm_data.responsibilities } },
        "job_responsibilities",
        "job_id",
        newForm_data.job_id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { benefits: { ...newForm_data.benefits } },
        "job_benefits",
        "job_id",
        newForm_data.job_id,
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
    { id: "requirements", label: "Requirements", button: "+ Add requirement" },
    {
      id: "responsibilities",
      label: "Responsibilities",
      button: "+ Add responsibility",
    },
    { id: "benefits", label: "Benefits & Perks", button: "+ Add benefit" },
  ];

  const display_text = job?.job_status
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
            heading={job?.job_name || "N/A"}
            candidate_name={"Edit Job Post"}
            handleClosingModal={() => setEditJobPost(false)}
          />
          <div className="flex overflow-y-auto no-scrollbar overflow-x-hidden gap-6 p-4 flex-col items-start justify-between w-full flex-1">
            <JobStatus
              job_status={job?.job_status}
              handle_update_form={handle_update_form}
              heading={"Job Status"}
              label={display_text}
            />

            <LabelInput
              onchange={handle_update_form}
              id={"job_name"}
              text="Job Title"
              default_value={job?.job_name || "N/A"}
              label_class_name={label_class_name}
              input_class_name={input_class_name}
              type="text"
            />

            <UrgentJob
              heading="Mark as Urgent"
              label="This will assign a priority badge to your listing"
              priority={job?.job_urgent}
              handle_update_form={handle_update_form}
            />

            <EditComponentAnchor
              card={job}
              handleInputChange={handle_update_form}
            />

            {sections.map((section) => (
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
                  data_prop={newForm_data[section.id] || []}
                  button={section.button}
                  updateReq_Res_Ben={handleUpdateReq_Res_Ben}
                  deletingReq_Res_Ben={deleteReq_Res_Ben}
                  addingReq_Res_Ben={addingReq_Res_Ben}
                />
              </div>
            ))}

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
