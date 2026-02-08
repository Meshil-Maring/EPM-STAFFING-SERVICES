import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import Candidates_Information from "../../../dummy_data_structures/Candidate_information.json";
import ProfileOverlay from "./ProfileOverlay";

function CardFooter({ icons, cand_index }) {
  const [profile, setProfile] = useState(false);
  const [manage, setManage] = useState(false);

  const handleButtonClick = (text) => {
    if (text === "View Profile") {
      setProfile((prev) => !prev);
    } else {
      setManage((prev) => !prev);
    }
  };
  const NoSkills = () => {
    return <p className="text-xs text-gray-500">No skills listed</p>;
  };
  const skills = Candidates_Information[cand_index]["skills"];
  const interViewType = Candidates_Information[cand_index]["interview type"];
  return (
    <div className="w-full text-[clamp(0.8rem,1vw,1rem)] flex flex-col items-start justify-between gap-4">
      <div className="text-text_l_b flex justify-between bg-red-light flex-row w-full items-center gap-1 py-1 rounded-small px-2">
        <Label text={"Interview | " + interViewType} class_name={""} />
        <span className="flex flex-row items-center">
          <Icon
            icon={icons.calendar}
            class_name={"text-nevy_blue font-lighter"}
          />
          <Label text={"12/05/2023"} class_name={""} />
        </span>
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        {skills.length > 0
          ? skills.map((skill, i) => {
              return (
                <Label
                  key={i}
                  text={skill}
                  class_name={"text-xs bg-lighter py-1 px-2 rounded-small"}
                />
              );
            })
          : NoSkills()}
      </div>
      <div className="flex flex-row  w-full items-center justify-start gap-4">
        {["View Profile", "Manage"].map((btn_text, i) => {
          const icn =
            btn_text === "View Profile"
              ? profile
                ? icons.eye
                : icons.eye_off
              : icons.user_edit;
          return (
            <div
              key={i}
              onClick={() => handleButtonClick(btn_text)}
              className={`w-full cursor-pointer transition-all ease-in-out duration-200 px-2 rounded-small flex flex-row items-center justify-center ${btn_text === "View Profile" ? "hover:bg-lighter border border-light" : "bg-g_btn text-text_white"}`}
            >
              <Icon icon={icn} />
              <Label text={btn_text} class_name={"text-xs whitespace-nowrap"} />
            </div>
          );
        })}
      </div>
      {profile && (
        <ProfileOverlay cand_index={cand_index} setClosing={setProfile} />
      )}
    </div>
  );
}

export default CardFooter;
