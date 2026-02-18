import React, { useContext, useEffect, useRef, useState } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import LabelInput from "../../../common/LabelInput";
import UrgentJob from "./UrgentJob";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../common/Button";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";
import JobStatus from "./JobStatus";
import { selected_job_context } from "../../../../context/SelectedJobContext";
import { Jobs_context } from "../../../../context/JobsContext";
import Header from "../Candidate/Common/Header";

function EditCardDetails({ onclick, Card_index }) {
  const { selected_job } = useContext(selected_job_context);
  const { updateJobs } = useContext(Jobs_context);
  const targetRef = useRef();
  const [isSaving, setIsSaving] = useState(false);

  // If no job is selected, don't render the component
  if (!selected_job) {
    return null;
  }

  // Draft state: changes here won't affect global state until Save is clicked
  const [newForm_data, setNewForm_data] = useState(selected_job);

  const handle_update_form = (value, id) => {
    setNewForm_data((prev) => {
      const isStatus = id === "status";
      const val = isStatus ? (value === false ? "InActive" : "Active") : value;
      return { ...prev, [id]: val };
    });
  };

  const updateReq_Res_Ben = (value, id) => {
    const [index, section] = id.split(":");
    const idx = parseInt(index);
    setNewForm_data((prev) => {
      const updatedList = [...prev[section]];
      updatedList[idx] = value;
      return { ...prev, [section]: updatedList };
    });
  };

  const deletingReq_Res_Ben = (section, index) => {
    setNewForm_data((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addingReq_Res_Ben = (section) => {
    setNewForm_data((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), ""],
    }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    try {
      updateJobs(Card_index, newForm_data);
      setTimeout(() => {
        setIsSaving(false);
        onclick(false);
      }, 2500);
    } catch (error) {
      console.log("Error:", error);
      setIsSaving(false);
    }
  };

  const icon_class =
    "font-semibold text-sm rounded-full hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";
  const input_class_name =
    "border border-light/60 w-full py-1 px-2 placeholder-text_b rounded-small focus:outline-none focus:ring-1 ring-nevy_blue";
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

  const display_text =
    selected_job.status === "Active"
      ? "This job is active and candidates can apply. Applications will be reviewed by the hiring team."
      : `This job has been ${selected_job.status}`;

  return (
    <div
      onClick={() => onclick(false)}
      className="flex items-center justify-center p-4 absolute top-0 left-0 w-full h-full bg-light_black z-50"
    >
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "tween" }}
          ref={targetRef}
          className="h-full w-[40%] overflow-hidden rounded-small shadow-xl flex flex-col bg-white"
        >
          <Header
            heading={selected_job["job title"]}
            candidate_name={"Edit Job Post"}
            handleClosingModal={() => onclick(false)}
          />
          <div className="flex overflow-y-auto no-scrollbar overflow-x-hidden gap-4 p-4 flex-col items-start justify-between w-full flex-1">
            <JobStatus
              selected_job={selected_job}
              handle_update_form={handle_update_form}
              heading={selected_job.status}
              label={display_text}
            />

            <LabelInput
              onchange={handle_update_form}
              id="job title"
              text="Job Title"
              default_value={selected_job["job title"]}
              label_class_name={label_class_name}
              input_class_name={input_class_name}
              type="text"
            />

            <UrgentJob
              heading="Mark as Urgent"
              label="This will assign a priority badge to your listing"
              priority={selected_job.priority}
              handle_update_form={handle_update_form}
            />

            <EditComponentAnchor
              selected_job={selected_job}
              handleInputChange={handle_update_form}
            />

            {sections.map((section) => (
              <div
                key={section.id}
                className="gap-1 w-full flex flex-col items-start justify-start"
              >
                <Label text={section.label} class_name={label_class_name} />
                <RequirementsEditComponent
                  id={section.id}
                  icon_class={icon_class}
                  data_prop={newForm_data[section.id] || []}
                  button={section.button}
                  updateReq_Res_Ben={updateReq_Res_Ben}
                  deletingReq_Res_Ben={deletingReq_Res_Ben}
                  addingReq_Res_Ben={() => addingReq_Res_Ben(section.id)}
                />
              </div>
            ))}

            <Button
              text={isSaving ? "Saving..." : "Save Changes"}
              onclick={handleSaveChanges}
              bg={true}
              class_name="py-2 w-full text-center rounded-small bg-g_btn text-text_white"
              type="submit"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EditCardDetails;
