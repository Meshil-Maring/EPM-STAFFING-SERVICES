import React, { useContext } from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import { Jobs_context } from "../../../../context/JobsContext";
import { Job_posting_elements } from "../../../dummy_data_structures/Job_Posting_elements";

function EditComponentAnchor({ card, Card_index }) {
  const { updateJobs } = useContext(Jobs_context);

  const input_class =
    "border border-lighter focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-gray-400";
  const label_class = "font-semibold text-sm text-text";

  const handleInputChange = (newValue, key) => {
    updateJobs(Card_index, key, newValue);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 ">
      {Job_posting_elements.map((el, i) => (
        <div
          key={i}
          className="flex gap-4 flex-row items-start justify-between w-full"
        >
          <LabelInput
            text={el.label1}
            id={el.id1}
            value={card[el.id1] || ""}
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />

          <LabelInput
            text={el.label2}
            id={el.id2}
            value={card[el.id2] || ""}
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />
        </div>
      ))}

      <LabelTextArea
        id={"job_description"}
        text={"Job Description"}
        value={card.job_description}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-lighter"
      />
    </div>
  );
}

export default EditComponentAnchor;
