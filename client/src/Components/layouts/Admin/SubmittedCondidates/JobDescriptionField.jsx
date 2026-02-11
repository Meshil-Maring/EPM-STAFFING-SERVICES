import LabelTextArea from "../../../common/LabelTextArea";

function JobDescriptionField({ input_class, jobDescription, onchange }) {
  return (
    <LabelTextArea
      id={"job description"}
      text={"Description"}
      type={"text"}
      default_value={jobDescription || "N/A"}
      label_class_name={"text-[clamp(1em,2vw,1.2em)] font-medium"}
      textarea_class_name={`min-h-30 ${input_class}`}
      onchange={onchange}
    />
  );
}

export default JobDescriptionField;
