import React, { useContext, useRef, useState } from "react";
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
  const { jobs, updateJobs } = useContext(Jobs_context);

  // Draft state: changes here won't affect global state until Save is clicked
  const [newForm_data, setNewForm_data] = useState({ ...jobs[Card_index] });

  const handle_update_form = (value, id) => {
    setNewForm_data((prev) => ({
      ...prev,
      [id]: value,
    }));
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
    try {
      updateJobs(Card_index, newForm_data);
      alert("Changes saved successfully");
      onclick(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const icon_class =
    "font-semibold text-lg hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";
  const input_class_name =
    "border border-light w-full py-1 px-2 placeholder-text_b rounded-small focus:outline-none focus:ring-1 ring-nevy_blue";
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
    card.status === "Active"
      ? "This job is active and candidates can apply. Applications will be reviewed by the hiring team."
      : `This job has been ${card.status}`;

  return (
    <div
      onClick={() => onclick(false)}
      className="flex absolute top-0 left-0 w-full h-full bg-light_black z-50"
    >
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "30%" }}
          exit={{ opacity: 0, width: 0 }}
          ref={targetRef}
          className="h-[90%] overflow-y-auto mr-2 overflow-x-hidden rounded-small border gap-6 border-whiter shadow-xl pb-4 px-4 m-auto flex flex-col bg-white"
        >
          <div className="flex items-center justify-between w-full border-b bg-b_white sticky top-0 border-lighter pt-3 z-10">
            <Label
              class_name="w-full font-bold text-lg"
              text={card.job_title || "Edit Job"}
            />
            <button
              onClick={() => onclick(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-lighter transition-colors"
            >
              <Icon icon="ri-close-line" class_name="text-xl text-text_b" />
            </button>
          </div>

          <CommonIconText
            card={newForm_data}
            Card_index={Card_index}
            heading={newForm_data.status}
            label={display_text}
            priority={newForm_data.priority}
          />

          <LabelInput
            onchange={handle_update_form}
            id="job title"
            text="Job Title"
            default_value={newForm_data["job title"]}
            label_class_name={label_class_name}
            input_class_name={input_class_name}
            type="text"
          />

          <CommonIconText
            heading="Mark as Urgent"
            label="This will assign a priority badge to your listing"
            bg_color="bg-red-light"
            id="checkbox"
            priority={newForm_data.priority}
          />

          <EditComponentAnchor
            card={newForm_data}
            Card_index={Card_index}
            handleInputChange={handle_update_form}
          />

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
                data_prop={newForm_data[section.id] || []}
                button={section.button}
                updateReq_Res_Ben={updateReq_Res_Ben}
                deletingReq_Res_Ben={deletingReq_Res_Ben}
                addingReq_Res_Ben={() => addingReq_Res_Ben(section.id)}
              />
            </div>
          ))}

          <Button
            text="Save Changes"
            onclick={handleSaveChanges}
            bg={true}
            class_name="py-2 w-full text-center rounded-small bg-g_btn text-text_white"
            type="submit"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EditCardDetails;
