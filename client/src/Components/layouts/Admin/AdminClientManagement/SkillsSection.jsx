import React from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Button from "../../../common/Button";
import Label from "../../../common/Label";

function SkillsSection({
  skills,
  handleSkillChange,
  handleAddSkill,
  handleRemoveSkill,
  input_class,
  label_class,
}) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      <Label
        text={"Skills & Expertise"}
        class_name={`${label_class} border-b border-lighter w-full pb-1 mb-2`}
      />
      <div className="w-full flex flex-col items-center justify-start gap-2">
        {skills.map((_, index) => (
          <div
            key={`skill-${index}`}
            className="w-full flex flex-row items-center justify-between gap-1"
          >
            <Input
              id={"skills"}
              type={"text"}
              class_name={input_class}
              value={skills[index] || ""}
              onchange={(val) => handleSkillChange(val, index)}
            />
            <span
              onClick={() => handleRemoveSkill(index)}
              className="w-5 h-5 p-2 cursor-pointer rounded-full overflow-hidden font-semibold text-sm hover:text-red-dark hover:bg-red-light transition-all ease-in-out duration-200 flex items-center justify-center"
            >
              <Icon
                icon={"ri-close-line"}
                class_name="w-full h-full rounded-full"
              />
            </span>
          </div>
        ))}
      </div>
      <Button
        onclick={handleAddSkill}
        text={"+ Add Skill"}
        class_name="text-nevy_blue font-lighter"
      />
    </div>
  );
}

export default SkillsSection;
