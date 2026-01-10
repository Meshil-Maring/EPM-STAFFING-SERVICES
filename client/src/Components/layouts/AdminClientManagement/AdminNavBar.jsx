import React, { useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import ButtonIcon from "../../common/ButtonIcon";
const navBarButtons = [
  {
    name: "Client Management",
    icon: "ri-suitcase-line",
    id: "nav",
  },
  {
    name: "Submitted Candidates",
    icon: "ri-suitcase-line",
    id: "nav",
  },
];
function AdminNavBar() {
  const [buttonName, setButtonName] = useState("Client Management");
  const handleNavigating = (name) => {
    setButtonName(name);
  };

  return (
    <div className="flex flex-col border-r border-light bg-b_white items-center justify-start gap-2 w-2/9 h-full overflow-y-auto ">
      <span className="w-full border-b border-lighter flex flex-row items-center justify-start p-4">
        <span className="w-10 h-10 flex bg-gradient-btn text-white items-center justify-center rounded-small m-2">
          <Icon icon="ri-building-line" class_name="text-md" />
        </span>
        <div className="flex flex-col items-start justify-center w-fit h-full">
          <Label text="EPM Staffing" class_name="text-lg" />
          <Label text="Services Plateform" class_name="text-xs" />
        </div>
      </span>

      <div className="flex flex-col items-center justify-start w-full h-full gap-4 pr-4 pl-6 py-4">
        {navBarButtons.map((button, index) => (
          <ButtonIcon
            key={index}
            text={button.name}
            icon={button.icon}
            id={button.id}
            onSelect={handleNavigating}
            clicked={button.name === buttonName}
            class_name="flex flex-row items-center justify-start gap-2 p-2 hover:bg-lighter rounded-md cursor-pointer w-full"
          />
        ))}
      </div>

      <div className="pl-6 pr-4 mb-4 flex items-center justify-center w-full">
        <ButtonIcon
          text="Settings"
          icon="ri-settings-5-line"
          onSelect={() => {
            alert("Navigating to Settings");
          }}
          clicked={false}
          id="nav"
          set_gradient={false}
          class_name="flex flex-row items-center justify-start gap-2 p-1  hover:bg-lighter rounded-md "
        />
      </div>
    </div>
  );
}

export default AdminNavBar;
