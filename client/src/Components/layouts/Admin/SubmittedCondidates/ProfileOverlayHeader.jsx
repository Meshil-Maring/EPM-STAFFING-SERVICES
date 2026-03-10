import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function ProfileOverlayHeader({ onClose }) {
  return (
    <header className="w-full border-b p-2 px-4 border-lighter flex flex-row items-center justify-between">
      <Label text={"Candidate Details"} class_name={"text-lg font-medium"} />
      <button
        onClick={onClose}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-lighter transition-all ease-in-out duration-200"
      >
        <Icon
          icon={"ri-close-line"}
          class_name="w-full h-full text-[clamp(1em,2vw,1.2em)] font-semibold flex items-center justify-center"
        />
      </button>
    </header>
  );
}

export default ProfileOverlayHeader;
