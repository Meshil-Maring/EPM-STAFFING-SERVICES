import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import ViewProfile from "./ViewProfile";
import ManageProfile from "./ManageProfile";
import Job_Card from "../../Dashboard/Job_Card";
import JobCardMoreDetails from "../../Dashboard/JobCardMoreDetails";
import EditCardDetails from "../../Dashboard/EditCardDetails/EditCardDetails";

/**
 * CardFooter component - Displays actions and additional information for candidate/job cards
 * @param {Object} props - Component props
 * @param {Object} props.icons - Icon definitions
 * @param {string} props.data_key - Unique identifier for the data
 * @param {Object} props.data - Candidate or job data
 * @param {Function} props.updateCandidate - Function to update candidate data
 * @param {Function} props.deleteCandidate - Function to delete candidate data
 * @param {boolean} props.isListed_jobs - Flag indicating if we're in listed_jobs view
 * @returns {JSX.Element} Rendered card footer component
 */
function CardFooter({
  icons,
  data_key,
  data,
  updateCandidate,
  deleteCandidate,
  isListed_jobs = false,
}) {
  // State for profile view toggle
  const [profile, setProfile] = useState(false);
  // State for manage view toggle
  const [manage, setManage] = useState(false);

  // Check if data exists
  if (!data) {
    return <div className="text-red-500">Error: Data not found</div>;
  }

  /**
   * Handle button click actions
   * @param {string} text - Button text to determine action
   */
  const handleButtonClick = (text) => {
    if (text === "View Profile") {
      setProfile(true);
    } else {
      setManage(true);
    }
  };

  /**
   * Display message when no skills are listed
   * @returns {JSX.Element} No skills message
   */
  const NoSkills = () => {
    return <p className="text-xs text-gray-500">No skills listed</p>;
  };

  // Get skills from data (candidate view) or job requirements (job view)
  const skills = isListed_jobs
    ? data["requirements"] || []
    : data["skills"] || [];

  // Get interview type from data
  const interViewType = !isListed_jobs
    ? data?.["interview type"]
    : "Not Scheduled";

  return (
    <div className="w-full text-[clamp(0.8rem,1vw,1rem)] flex flex-col items-start justify-between gap-4">
      {/* Interview information section */}
      <div className="text-text_l_b flex justify-between bg-red-light/50 flex-row w-full items-center gap-1 py-1 rounded-small px-2">
        <Label
          text={
            isListed_jobs
              ? "Application Deadline"
              : "Interview | " + interViewType
          }
          class_name={""}
        />
        <span className="flex flex-row items-center">
          <Icon
            icon={icons.calendar}
            class_name={"text-nevy_blue font-lighter"}
          />
          <Label
            text={
              isListed_jobs
                ? data?.["application deadline"]
                : data["date applied"]
            }
            class_name={""}
          />
        </span>
      </div>

      {/* Skills/requirements section */}
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

      {/* Action buttons section */}
      <div className="flex flex-row w-full items-center justify-start gap-4">
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
              className={`w-full cursor-pointer transition-all ease-in-out duration-200 px-2 rounded-small flex flex-row items-center justify-center gap-1 ${btn_text === "View Profile" ? "hover:bg-lighter border border-light" : "bg-g_btn text-text_white"}`}
            >
              <Icon icon={icn} />
              <Label text={btn_text} class_name={"text-xs whitespace-nowrap"} />
            </div>
          );
        })}
      </div>

      {/* Modal components */}
      {manage &&
        (isListed_jobs ? (
          <EditCardDetails
            setEditJobPost={setManage}
            card={data}
            card_index={data_key}
          />
        ) : (
          <ManageProfile
            data_key={data_key}
            setClosing={setManage}
            candidate={data}
            updateCandidate={updateCandidate}
            deleteCandidate={deleteCandidate}
          />
        ))}
      {profile &&
        (isListed_jobs ? (
          <JobCardMoreDetails card={data} setMoreDetails={setProfile} />
        ) : (
          <ViewProfile
            isListed_jobs={isListed_jobs}
            data={data}
            setClosing={setProfile}
          />
        ))}
    </div>
  );
}

export default CardFooter;
