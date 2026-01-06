import React, { useState } from "react";
import ButtonIcon from "../common/ButtonIcon";
import Icon from "../common/Icon";
import LogoHeadings from "./LogoHeadings";

function HeaderLayouts() {
  const handleAgreement = (name) => {
    alert(`Button ${name} clicked!`);
  };

  return (
    <div className="flex pr-9 pl-5 py-2 border-b border-lighter flex-row items-center justify-start">
      <LogoHeadings />
      <div className="flex flex-row gap-4  items-center justify-center ml-auto">
        <span className="h-10 flex justify-center">
          <ButtonIcon
            id="nav"
            text="Agreement"
            icon="ri-file-text-line"
            onSelect={handleAgreement}
          />
        </span>
        <span className="relative after:w-1 after:h-1 after:absolute after:bottom-[70%] after:left-[70%] after:rounded-full after:bg-Darkgold">
          <Icon icon="ri-notification-4-line" class_name="text-xl" />
        </span>
        <span className="w-10 h-10 rounded-full p-1 bg-gradient-btn text-whiter">
          <Icon icon="ri-user-line" class_name="text-2xl w-full h-full" />
        </span>
      </div>
    </div>
  );
}

export default HeaderLayouts;
