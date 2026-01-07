import React, { useState } from "react";
import ButtonIcon from "../../../common/ButtonIcon";

function NavButtons() {
  const [buttonName, setButtonName] = useState("Job");

  const onSelect = (name) => {
    setButtonName(name);
  };

  const buttons = [
    {
      id: "nav",
      name: "Job",
      icon: "ri-suitcase-line",
    },
    {
      id: "nav",
      name: "Offer released",
      icon: "ri-file-check-line",
    },
    {
      id: "nav",
      name: "Interview pipeline",
      icon: "ri-group-line",
    },
  ];
  return (
    <div className="w-full border-b border-lighter transition-all ease-in-out duration-100 h-full gap-5 flex text-primary flex-col items-center justify-start">
      {buttons.map((button, index) => (
        <ButtonIcon
          key={index}
          icon={button.icon}
          id={button.id}
          text={button.name}
          onSelect={onSelect}
          clicked={button.name === buttonName}
        />
      ))}
    </div>
  );
}

export default NavButtons;
