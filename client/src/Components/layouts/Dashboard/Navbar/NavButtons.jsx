import React, { useContext, useEffect, useRef } from "react";
import ButtonIcon from "../../../common/ButtonIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardSection } from "../../../../context/DashboardSectionContext";

function NavButtons() {
  const { section, changeSection } = useContext(DashboardSection);
  const navigate = useNavigate();
  // Sync navigation bar with current URL and browser navigation

  const onSelect = (name) => {
    let path = "/client/dashboard";
    switch (name) {
      case "Interview pipeline":
        alert("Not yet implemented");
        break;
      case "Settings":
        path = "/client/dashboard/settings";
        break;
      case "Offer released":
        path = "/client/dashboard/offerReleased";
        break;
      case "Jobs":
        path = "/client/dashboard";
        break;
      default:
        path = "/client/dashboard";
    }
    navigate(path);
  };

  const buttons = [
    { name: "Jobs", icon: "ri-suitcase-line" },
    { name: "Offer released", icon: "ri-file-check-line" },
    { name: "Interview pipeline", icon: "ri-group-line" },
    { name: "Settings", icon: "ri-settings-5-line" },
  ];

  // Find the index of the active button for the indicator

  return (
    <div className="relative w-full h-full">
      {/* Smooth indicator bar */}

      <ul className="w-full h-full flex flex-col items-center justify-start gap-2 list-none p-1 m-0 overflow-y-auto">
        {buttons.map((button, index) => {
          const isActive = button.name.toLocaleLowerCase() === section;
          return (
            <li
              key={button.name}
              className={`w-full relative ${button.name === "Settings" ? "mt-auto" : ""}`}
            >
              <ButtonIcon
                icon={button.icon}
                id="nav"
                text={button.name}
                onSelect={onSelect}
                clicked={isActive}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavButtons;
