import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Jobs_context } from "../../../../context/JobsContext";
import ProfileForm from "./ProfileForm";
import SkillsSection from "./SkillsSection";
import DownloadsSection from "./DownloadsSection";
import JobDescriptionField from "./JobDescriptionField";
import ActionButtons from "./ActionButtons";
import ConfirmationModal from "./ConfirmationModal";
import Header from "../../Dashboard/Candidate/Common/Header";
import { showError, showSuccess } from "../../../../utils/toastUtils";
import { createPortal } from "react-dom";
import SubmittedCandidates from "./SubmittedCandidates";

/**
 * ManageProfile component - Modal overlay for managing candidate profile information
 * @param {Object} props - Component props
 * @param {string} props.data_key - Candidate index/ID
 * @param {Function} props.setClosing - Function to close the overlay
 * @param {Object} props.candidate - Candidate data to manage
 * @param {Function} props.updateCandidate - Function to update candidate data
 * @param {Function} props.deleteCandidate - Function to delete candidate data
 * @returns {JSX.Element} Rendered manage profile component
 */
function ManageProfile({
  data_key,
  setClosing,
  candidate,
  updateCandidate,
  deleteCandidate,
}) {
  // Get jobs context for accessing job data
  const { jobs } = useContext(Jobs_context) || {};
  // Get job IDs from candidate data
  const jobIds = Array.isArray(candidate["job id"]) ? candidate["job id"] : [];
  // Get job data for the first job ID
  const jobData = jobIds.length > 0 ? jobs?.[jobIds[0]] || {} : {};

  // State for local form data
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    "contract type": "",
    "date of birth": "",
    gender: "",
    linkedin: "",
    "expected ctc": "",
    "current ctc": "",
    "notice date": "",
    skills: [],
  });
  // State for confirmation modal
  const [confirm, setConfirm] = useState({
    open: false,
    action: null,
    title: "",
    message: "",
  });

  // Initialize form data when candidate or job data changes
  useEffect(() => {
    if (candidate) {
      setLocalForm({
        name: candidate.name || "N/A",
        email: candidate.email || "N/A",
        phone: candidate["phone number"] || "N/A",
        location: candidate.location || "N/A",
        "contract type": jobData["contract type"] || "N/A",
        "date of birth": candidate["date of birth"] || "",
        gender: candidate.gender || "N/A",
        linkedin: candidate["linkedin"] || "N/A",
        "expected ctc": candidate["expected ctc"] || "N/A",
        "current ctc": candidate["current ctc"] || "N/A",
        "notice date": candidate["notice date"] || "",
        skills: candidate.skills || [],
      });
    }
  }, [candidate, jobIds, jobs]);

  /**
   * Convert date format from DD/MM/YYYY to YYYY-MM-DD
   * @param {string} date - Date string in DD/MM/YYYY format
   * @returns {string} Date string in YYYY-MM-DD format
   */
  const getDateValue = (date) => {
    if (!date || typeof date !== "string") return "";
    const parts = date.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    if (!year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  /**
   * Handle input field changes
   * @param {string} value - New input value
   * @param {string} id - Input field ID
   */
  const handleInputChange = (value, id) => {
    setLocalForm((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * Add a new skill to the skills array
   */
  const addMoreSkills = () => {
    setLocalForm((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  /**
   * Update a specific skill in the skills array
   * @param {number} index - Index of the skill to update
   * @param {string} value - New skill value
   */
  const updateSkill = (index, value) => {
    setLocalForm((prev) => ({
      ...prev,
      skills: [
        ...prev.skills.slice(0, index),
        value,
        ...prev.skills.slice(index + 1),
      ],
    }));
  };

  /**
   * Delete a specific skill from the skills array
   * @param {number} index - Index of the skill to delete
   */
  const deleteSkill = (index) => {
    setLocalForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  /**
   * Delete the candidate
   */
  const DeleteCandidate = () => {
    if (!deleteCandidate) return;
    showSuccess("Candidate deleted successfully");
    setTimeout(() => {
      try {
        deleteCandidate(data_key);
        setClosing(false);
      } catch (e) {
        showError(`Error: ${e}`);
      }
    }, 1000);
  };

  /**
   * Save changes to the candidate data
   */
  const handleCandidateChanges = () => {
    if (!updateCandidate) return;
    updateCandidate(data_key, { ...localForm });
    showSuccess("Changes saved");
    setTimeout(() => setClosing(false), 1000);
  };

  /**
   * Handle button clicks for actions
   * @param {string} text - Button text to determine action
   */
  const handleBtnClick = (text) => {
    const confirmMap = {
      "Delete Candidate": {
        title: "Delete Candidate",
        message:
          "Are you sure you want to delete this candidate? This action cannot be undone.",
        action: "delete",
      },
      "Save Changes": {
        title: "Save Changes",
        message: "Do you want to save changes made to this candidate?",
        action: "save",
      },
    };
    if (confirmMap[text]) {
      setConfirm({ open: true, ...confirmMap[text] });
    }
  };

  /**
   * Execute the confirmed action (delete or save)
   */
  const executeConfirmedAction = () => {
    if (confirm.action === "delete") {
      DeleteCandidate();
    } else if (confirm.action === "save") {
      handleCandidateChanges();
    }
    setConfirm({ open: false, action: null, title: "", message: "" });
  };

  // Downloads section configuration
  const downloads = [
    {
      label: "Attach Resume*(PDF)",
      file: candidate?.resume || "N/A",
      id: "resume",
    },
    {
      label: "Attach Cover Letter(PDF)",
      file: candidate?.["cover letter"] || "N/A",
      id: "cover letter",
    },
    {
      label: "Attach Portfolio(PDF)",
      file: candidate["portfolio"] || "N/A",
      id: "portfolio",
    },
  ];

  // Form elements configuration
  const elements = [
    { label: "Name", value: localForm.name, id: "name" },
    { label: "Email", value: localForm.email, id: "email" },
    { label: "Phone", value: localForm.phone, id: "phone number" },
    { label: "Location", value: localForm.location, id: "location" },
    { label: "Job Type", value: localForm["contract type"], id: "job type" },
    {
      label: "D.O.B",
      value: getDateValue(localForm["date of birth"]),
      id: "date of birth",
    },
    { label: "Gender", value: localForm.gender, id: "gender" },
    { label: "LinkedIn", value: localForm.linkedin, id: "linkedin" },
    {
      label: "Expected CTC",
      value: localForm["expected ctc"],
      id: "expected ctc",
    },
    {
      label: "Current CTC",
      value: localForm["current ctc"],
      id: "current ctc",
    },
    {
      label: "Notice Period",
      value: getDateValue(localForm["notice date"]),
      id: "notice period",
    },
  ];

  // Input field styling class
  const input_class =
    "text-[clamp(0.8em,1vw,1em)] w-full py-1.5 px-2 bg-lighter/70 rounded-small border border-light focus:border-none focus:ring-2 ring-highLight transition-all duration-200 ease-in-out";

  return createPortal(
    <AnimatePresence>
      <div
        onClick={() => setClosing(false)}
        className="inset-0 h-full z-20 text-xs flex items-center justify-center overflow-hidden absolute top-0 bottom-0 left-0 bg-light_black/20"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, type: "tween" }}
          className="w-[40%] h-[80%] bg-b_white rounded-small flex flex-col items-center justify-start shadow-xl overflow-hidden"
        >
          {/* Header section with candidate name and close button */}
          <Header
            handleClosingModal={() => setClosing(false)}
            heading={candidate.name}
            candidate_name={"Profile Details"}
          />
          {/* Main content area with form sections */}
          <div className="w-full flex-1 overflow-y-auto no-scrollbar p-4 gap-4 flex flex-col items-start justify-start">
            <ProfileForm
              elements={elements}
              input_class={input_class}
              handleInputChange={handleInputChange}
            />
            <SkillsSection
              skills={localForm.skills}
              onUpdateSkill={updateSkill}
              onDeleteSkill={deleteSkill}
              onAddSkill={addMoreSkills}
              input_class={input_class}
            />
            <DownloadsSection
              downloads={downloads}
              candidate={candidate}
              onFileChange={handleInputChange}
            />
            <JobDescriptionField
              input_class={input_class}
              jobDescription={jobData["job description"]}
              onchange={handleInputChange}
            />
            <ActionButtons onButtonClick={handleBtnClick} />
            <ConfirmationModal
              isOpen={confirm.open}
              title={confirm.title}
              message={confirm.message}
              onCancel={() =>
                setConfirm({
                  open: false,
                  action: null,
                  title: "",
                  message: "",
                })
              }
              onConfirm={executeConfirmedAction}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
}

export default ManageProfile;
