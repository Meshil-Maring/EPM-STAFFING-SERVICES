import React, { useState } from "react";
import Image from "../../common/Image";
import Label from "../../common/Label";
import SpanLabel from "../../common/SpanLabel";
import Icon from "../../common/Icon";
import NameInitials from "../../common/NameInitials";

function OverviewCards({ candidate, id }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const isScheduled = candidate.status.toLowerCase().endsWith("scheduled");

  return (
    <article className="flex border border-lighter shadow-sm rounded-small w-full flex-col md:flex-row items-start justify-start gap-6 px-5 py-6 bg-white">
      <NameInitials name={candidate.cand_name} id={id} />

      <div className="flex flex-col flex-1 items-start justify-start gap-5 w-full">
        <header className="flex flex-wrap items-center justify-start gap-4 w-full">
          <Label
            as="h3"
            text={candidate.cand_name}
            class_name="text-base font-bold text-text_b tracking-tight"
          />
          <SpanLabel
            text={candidate.status}
            class_name={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              isScheduled
                ? "text-blue bg-blueBackground"
                : "text-red-dark bg-red-light"
            }`}
          />
        </header>

        <ul
          className="flex flex-wrap items-center justify-start gap-2 list-none p-0"
          aria-label="Skills"
        >
          {candidate.skills.map((skill, index) => (
            <li key={index}>
              <Label
                as="span"
                text={skill}
                class_name="text-xs font-medium bg-lighter px-2.5 py-1 rounded-small text-primary border border-lighter/50"
              />
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {Object.keys(candidate.more_info).map((key, index) => (
            <div
              className="p-3 gap-1 bg-hover-light/30 border border-lighter rounded-small flex flex-col items-start justify-center transition-colors hover:bg-hover-light"
              key={index}
            >
              <div className="flex flex-row items-center text-blue gap-2">
                <Icon
                  icon={candidate.more_info[key].icon}
                  class_name="text-sm"
                />
                <Label
                  as="span"
                  text={candidate.more_info[key].label}
                  class_name="text-[10px] font-bold uppercase opacity-70"
                />
              </div>
              <Label
                text={candidate.more_info[key].value}
                class_name="text-sm font-semibold text-text_b"
              />
            </div>
          ))}
        </div>

        <footer className="flex flex-wrap items-center justify-start gap-3 w-full pt-2 border-t border-lighter/50 mt-2">
          {Object.keys(candidate.buttons).map((key) => (
            <button
              key={key}
              type="button"
              className={`flex flex-row items-center text-xs font-bold px-4 py-2 rounded-small transition-all duration-200 active:scale-95 outline-none focus:ring-2 focus:ring-offset-1 ${
                key === "schedule"
                  ? "bg-blue text-white hover:bg-darkBlue focus:ring-blue"
                  : key === "comment"
                  ? "bg-blueBackground text-blue hover:bg-blue/10 focus:ring-blue"
                  : key === "offer"
                  ? "bg-Darkgold text-white hover:bg-Darkgold-hover focus:ring-Darkgold"
                  : "border border-lighter text-secondary hover:bg-lighter focus:ring-lighter"
              }`}
            >
              <Icon icon={candidate.buttons[key].icon} class_name="mr-2" />
              {candidate.buttons[key].btn_name}
            </button>
          ))}

          <button
            onClick={handleToggleDetails}
            type="button"
            className="ml-auto p-2 text-xl text-secondary hover:text-primary transition-colors focus:ring-2 focus:ring-blue rounded-full"
            aria-label={showDetails ? "Hide details" : "Show details"}
            aria-expanded={showDetails}
          >
            <i
              className={showDetails ? "ri-eye-line" : "ri-eye-off-line"}
              aria-hidden="true"
            />
          </button>
        </footer>
      </div>
    </article>
  );
}

export default OverviewCards;
