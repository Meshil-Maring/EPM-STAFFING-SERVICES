import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import Button from "../../../common/Button";

function SkillsSection({
  skills,
  onUpdateSkill,
  onDeleteSkill,
  onAddSkill,
  input_class,
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <Label
        text={"Skills & Expertise"}
        class_name={
          "w-full px-2 text-[clamp(1em,2vw,1.2em)] font-semibold border-b border-lighter mb-4 pb-1"
        }
      />
      <div className="w-full flex flex-col items-start text-[clamp(1em,2vw,1.4em)] justify-center gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative w-full gap-2 flex flex-row items-center justify-between"
          >
            <Input
              onchange={(val) => onUpdateSkill(index, val)}
              default_value={skill}
              class_name={input_class}
            />
            <span
              onClick={() => onDeleteSkill(index)}
              className="hover:bg-red-lighter p-1 rounded-full cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center w-fit h-fit"
            >
              <Icon
                icon={"ri-close-line"}
                class_name="w-5 h-5 rounded-full flex items-center justify-center"
              />
            </span>
          </div>
        ))}
        <Button
          text={"+ Add skill"}
          onclick={onAddSkill}
          class_name="py-1 px-2 bg-highLight text-nevy_blue font-lighter rounded-small text-sm"
        />
      </div>
    </div>
  );
}

export default SkillsSection;
