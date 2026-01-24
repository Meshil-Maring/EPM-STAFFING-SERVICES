import React, { useContext, useEffect, useRef } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import LabelInput from "../../../common/LabelInput";
import CommonIconText from "./CommonIconText";
import { motion, AnimatePresence } from "framer-motion";
import { Jobs_context } from "../../../../context/JobsContext";
import Button from "../../../common/Button";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";

function EditCardDetails({ card, onclick, Card_index }) {
  const targetRef = useRef();

  // Pulling global state functions from JobsContext
  const { updateJobs, deleteJob } = useContext(Jobs_context);

  const icon_class =
    "font-semibold text-lg hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";
  const input_class_name =
    "border border-lighter w-full py-1 px-2 rounded-small focus:outline-none focus:ring-1 ring-nevy_blue";
  const label_class_name = "font-semibold text-sm";

  // Function to send individual field updates (like Job Title) to the global state
  const handleUpdate = (value, key) => {
    updateJobs(Card_index, key, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Checking if critical information is missing
    const isHeaderEmpty = !card.job_name || card.job_name.trim() === "";
    const isLocationEmpty = !card.location || card.location.trim() === "";

    // If the user cleared everything, offer to delete the job entirely
    if (isHeaderEmpty && isLocationEmpty) {
      const confirmDelete = window.confirm(
        "Essential fields are empty. Would you like to remove this job card completely?",
      );

      if (confirmDelete) {
        deleteJob(card.id); // Remove from global jobs list
        onclick(false); // Close the edit modal
      }
      return;
    }

    // If data is valid, confirm save and close
    alert("Changes saved successfully!");
    onclick(false);
  };

  // Logic to close the modal if the user clicks outside of the form
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        onclick(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onclick]);

  // Configuration for the list-based sections
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
    card.status === "Active"
      ? "This job is active and candidates can apply. Applications will be reviewed by the hiring team."
      : `This job has been ${card.status}`;

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-slate-900/60 backdrop-blur-sm z-50">
      <AnimatePresence>
        <motion.form
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          ref={targetRef}
          onSubmit={handleSubmit}
          className="w-[40%] h-[90%] overflow-y-auto overflow-x-hidden rounded-small border gap-6 border-whiter shadow-xl pb-4 px-6 m-auto flex flex-col bg-white"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between w-full border-b bg-b_white sticky top-0 border-lighter pt-3 z-10">
            <Label
              class_name="w-full font-bold text-lg"
              text={card.job_name || "New Job"}
            />
            <span className="cursor-pointer" onClick={() => onclick(false)}>
              <Icon icon={"ri-close-line"} class_name={icon_class} />
            </span>
          </div>

          <CommonIconText
            card={card}
            Card_index={Card_index}
            heading={card.status}
            label={display_text}
            priority={card.priority}
          />

          {/* Direct Input for Job Title */}
          <LabelInput
            onchange={handleUpdate}
            id="job_name"
            text="Job Title"
            value={card.job_name}
            label_class_name={label_class_name}
            input_class_name={input_class_name}
            type="text"
          />

          <CommonIconText
            heading="Mark as Urgent"
            label="This will assign a priority badge to your listing"
            bg_color="bg-red-light"
            id="checkbox"
            priority={card.priority}
          />

          {/* Anchor Component for Location, Salary, etc. */}
          <EditComponentAnchor card={card} Card_index={Card_index} />

          {/* Mapping through Requirements, Responsibilities, and Benefits */}
          {sections.map((section) => (
            <div
              key={section.id}
              className="gap-1 flex flex-col items-start justify-start"
            >
              <Label text={section.label} class_name={label_class_name} />
              <RequirementsEditComponent
                Card_index={Card_index}
                id={section.id}
                icon_class={icon_class}
                data_prop={card[section.id] || []}
                button={section.button}
              />
            </div>
          ))}

          <Button
            text="Save Changes"
            bg={true}
            class_name="py-2 w-full text-center rounded-small bg-g_btn text-text_white"
            type="submit"
          />
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

export default EditCardDetails;
