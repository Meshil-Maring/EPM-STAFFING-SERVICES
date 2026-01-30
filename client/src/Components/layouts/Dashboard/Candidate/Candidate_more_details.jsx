import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Candidate_main_details from "./Candidate_main_details";
import candidate_icons from "../../../dummy_data_structures/candidate_icons.json";
import Button from "../../../common/Button";

function Candidate_more_details({ candidate }) {
  const icons = candidate_icons.details_icons;
  const isGreen = candidate.status === "scheduled";
  const isGold = candidate.status === "accepted";
  const isRed = candidate.status === "canceled";
  return (
    <div className="w-full h-full flex flex-col items-start justify-start overflow-y-auto">
      <header className="w-full rounded-tr-small rounded-tl-small flex items-center flex-row justify-between pt-2 px-4 border-b border-border1 pb-1 sticky top-0 bg-b_white">
        <Label
          text={candidate.name}
          class_name="text[clamp(1em,2vw,2em)] font-bold"
        />
        <Icon
          icon={"ri-close-line"}
          class_name="font-lighter text-[clamp(1em,1vw,1.4em)] hover:text-text_white hover:bg-red transition-all ease-in-out duration-200 text-text"
        />
      </header>
      <Label
        text={candidate.status}
        class_name={`px-2 py-1 m-4 rounded-small ${isGreen ? "bg-light_green" : isGold ? "bg-gold_lighter" : isRed ? "bg-red-light" : ""}`}
      />
      <div className="w-full grid grid-cols-2 p-4 items-center justify-center gap-4">
        {icons.map((icon, index) => {
          return (
            <Candidate_main_details
              key={index}
              candidate={candidate}
              icon={icon}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-start justify-start p-4">
        <div className="flex flex-row items-center justify-start text-[clamp(1em,1vw,1.2em)] font-semibold gap-1">
          <Icon icon={"ri-file-text-line"} class_name="font-lighter" />
          <Label text={"Story"} class_name={"text-text"} />
        </div>
        <Label
          text={candidate.bio}
          class_name={"text-text text-[clamp(0.8em,1vw,1em)]"}
        />
      </div>
      <div className="w-full p-4 flex flex-col items-start justify-start">
        <Label
          text={"Skills"}
          class_name={
            "text-[clamp(1em,1vw,1.4em)] font-semibold border-b border-border1 mb-2 pb-1 w-full"
          }
        />
        <div className="flex flex-col items-start justify-start gap-2">
          {candidate.skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center flex-row gap-2"
              >
                <span className="w-3 h-3 rounded-full border-4 border-hover-bth" />
                <Label
                  text={skill}
                  class_name="text-[clamp(0.8em,0.8vw,1em)]"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full border-t border-border1 p-4 flex flex-row items-center justify-between gap-4">
        {["Resume", "Cover Letter", "Portfolio"].map((button) => {
          return (
            <div
              key={button}
              className="w-full items-center justify-between flex rounded-small flex-row py-1.5 px-4 text-text_white bg-g_btn"
            >
              <Icon icon={"ri-download-cloud-2-line"} class_name="w-6 h-6" />
              <Button
                text={button}
                class_name=" w-full whitespace-nowrap rounded-small text-[clamp(0.8em,1vw,1.2em)]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Candidate_more_details;
