import React, { useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import ButtonIcon from "../../common/ButtonIcon";

const navBarButtons = [
  {
    name: "Client Management",
    icon: "ri-suitcase-line",
    id: "nav-client",
  },
  {
    name: "Submitted Candidates",
    icon: "ri-group-line",
    id: "nav-candidates",
  },
];

function AdminNavBar() {
  const [activeButton, setActiveButton] = useState("Client Management");

  const handleNavigating = (name) => {
    setActiveButton(name);
  };

  const handleSettings = () => {
    alert(`Admin Client Settings clicked`);
  };

  return (
    <aside className="flex flex-col border-r border-lighter bg-white items-center justify-start w-64 lg:w-72 h-full overflow-y-auto sticky top-0">
      <header className="w-full border-b border-lighter flex flex-row items-center justify-start p-4 mb-2">
        <div
          className="w-10 h-10 flex bg-gradient-btn text-white items-center justify-center rounded-small shrink-0 shadow-sm"
          aria-hidden="true"
        >
          <Icon icon="ri-building-line" class_name="text-xl" />
        </div>
        <div className="flex flex-col items-start justify-center ml-3">
          <Label
            as="h2"
            text="EPM Staffing"
            class_name="text-base font-bold text-text_b"
          />
          <Label
            as="span"
            text="Services Platform"
            class_name="text-[10px] uppercase tracking-tighter text-text_b_l opacity-70"
          />
        </div>
      </header>

      <nav
        className="flex flex-col items-center justify-start w-full flex-1 gap-2 px-4 py-4"
        aria-label="Admin Side Navigation"
      >
        <ul className="w-full list-none p-0 m-0 flex flex-col gap-2">
          {navBarButtons.map((button) => {
            const isCurrent = button.name === activeButton;
            return (
              <li key={button.name} className="w-full">
                <ButtonIcon
                  text={button.name}
                  icon={button.icon}
                  id={button.id}
                  onSelect={handleNavigating}
                  clicked={isCurrent}
                  aria-current={isCurrent ? "page" : undefined}
                  class_name="w-full justify-start transition-all duration-200"
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="px-4 pb-6 mt-auto w-full border-t border-lighter pt-4">
        <ButtonIcon
          text="Settings"
          icon="ri-settings-5-line"
          onSelect={handleSettings}
          clicked={false}
          id="nav-settings"
          class_name="w-full justify-start opacity-80 hover:opacity-100"
        />
      </footer>
    </aside>
  );
}

export default AdminNavBar;
