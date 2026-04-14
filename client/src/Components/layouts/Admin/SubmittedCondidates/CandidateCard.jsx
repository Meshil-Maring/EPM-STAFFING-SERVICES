import React, { useState, useEffect, useContext } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import CandidateMiddleInformation from "./CandidateMiddleInformation";
import Details from "./Details";
import CardFooter from "./CardFooter";
import Arrow from "./Arrow";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Button from "../../../common/Button";
import { Company_context } from "../../../../context/AccountsContext";
import { showSuccess } from "../../../../utils/toastUtils";
import ConfirmModal from "../../../common/ConfirmModal";
import Image from "../../../common/Image";
import { getInitials } from "../../../../utils/getAvatar";

/**
 * CandidateCard component - Displays candidate or job information based on route
 * @param {Object} props - Component props
 * @param {Object} props.data - Candidate or job data
 * @param {string} props.data_key - Unique identifier for the data
 * @param {Object} props.jobs - Jobs context data
 * @param {Object} props.company_accounts - Company accounts data
 * @param {Object} props.icons - Icon definitions
 * @param {Function} props.updateCandidate - Function to update candidate data
 * @param {Function} props.deleteCandidate - Function to delete candidate data
 * @param {Function} props.handleViewDetails - Function to handle view details action
 * @returns {JSX.Element} Rendered candidate card component
 */
function CandidateCard({
  data,
  data_key,
  jobs,
  icons,
  updateCandidate,
  deleteCandidate,
  handleViewDetails,
  deleteJob,
}) {
  // Get candidates context for accessing candidate data
  const { company_accounts } = useContext(Company_context);
  // Get current route path to determine view mode
  const { pathname } = useLocation();
  // Determine if we're in listed_jobs route
  const section = pathname.split("/").at(-1);
  const isListed_jobs = section === "listed_jobs";
  // State for job navigation index
  const [job_index, set_job_index] = useState(1);
  // State for total job count
  const [t_jobs, setT_jobs] = useState(0);
  // Get related job keys from data
  const related_job_keys = !isListed_jobs ? data["job id"] : [];

  // Update counts and indices when data changes
  useEffect(() => {
    // Set count based on view mode
    if (!isListed_jobs) {
      setT_jobs(related_job_keys?.length || 0);
    }
    // Initialize indices to 1 when data is available
  }, [related_job_keys?.length, isListed_jobs]);

  // state to open or close the modal to cancel or confirm the deleting action
  const [modal, setModal] = useState(false);

  // Handling the removing of a job from the listed jobs
  const handleRemovingJobCard = () => {
    setModal(true);
  };

  // handling confirming the deletion action
  const handleConfirming = (id) => {
    if (id === "cancel") {
      showSuccess("Deletion Aborted");
      return setModal(false);
    }
    deleteJob(data_key);
    setModal(false);
    showSuccess("Deleted successfully");
  };

  /**
   * Handle navigation between related items (jobs or candidates)
   * @param {string} dir - Direction of navigation ("left" or "right")
   */
  const handleNavCompany = (dir) => {
    const target = document.getElementById(`${data_key}_${job_index - 1}`);
    if (dir === "left") {
      if (job_index <= 1) {
        set_job_index(t_jobs);
      } else {
        set_job_index(job_index - 1);
        target.style.translate("-50px");
      }
    } else if (dir === "right") {
      if (job_index >= t_jobs) {
        set_job_index(1);
      } else {
        set_job_index(job_index + 1);
      }
    }
  };

  // Determine status styling based on current status
  const isPending = data.status === "Pending";
  const isInterviewed = data.status === "Interviewed";
  const isAccepted = data.status === "Accepted";
  const isRejected = data.status === "Rejected";

  // Set background color and text color based on status
  let bg = "";
  if (isPending) bg = "bg-gold_lighter text-Darkgold";
  if (isInterviewed) bg = "bg-blue-hover text-blue-dark";
  if (isAccepted) bg = "bg-light_green text-green-dark";
  if (isRejected) bg = "bg-red-light text-red-dark";

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-small bg-white">
        {/* Top section: Display job info for listed_jobs, candidate info for candidates view */}
        <div className="w-full flex flex-row items-center justify-start gap-4">
          {/* Display name initials based on view mode */}
          <NameInitials
            name={isListed_jobs ? data["job title"] : data.name}
            bg="5629dc"
          />
          <div className="flex flex-col items-start justify-start">
            {/* Display job title for listed_jobs, candidate name for candidates view */}
            <Label
              text={isListed_jobs ? data["job title"] : data.name}
              class_name="text-sm font-medium"
            />
            {/* Display location - job location for listed_jobs, candidate location for candidates view */}
            <span className="text-xs text-gray-500 flex flex-row items-center justify-start">
              <Icon icon={icons.location} class_name={""} />
              <Label text={data.location} />
            </span>
          </div>
          {/* Display remove button for listed_jobs, status for candidates view */}
          {isListed_jobs ? (
            <Button
              onclick={handleRemovingJobCard}
              text="Remove"
              class_name="px-3 py-2 text-xs bg-g_btn text-text_white font-semibold tracking-wide ml-auto rounded-large border-lighter border shadow-sm shadow-lighter"
            />
          ) : (
            <Label
              text={data["offer status"]}
              class_name={`font-lighter ml-auto text-xs py-1 px-2 rounded-full ml-auto ${bg}`}
            />
          )}
        </div>

        {/* Middle section: Display company info for listed_jobs, job/company slideshow for candidates view */}
        <div className="w-full relative h-fit">
          {/* Show navigation arrows and count for candidates view (slideshow functionality) */}
          {!isListed_jobs && (
            <div className="flex absolute top-2 right-2 flex-row items-center justify-center bg-lighter rounded-large z-10">
              <Arrow
                icon={"ri-arrow-left-s-line"}
                id={"left"}
                onArrowClick={handleNavCompany}
              />
              {/* Display slide count for candidates view */}
              <span className="text-[8px] px-1 font-medium">
                {`${job_index} / ${t_jobs}`}
              </span>
              <Arrow
                icon={"ri-arrow-right-s-line"}
                id={"right"}
                onArrowClick={handleNavCompany}
              />
            </div>
          )}
          <div
            className={`w-full overflow-x-auto no-scrollbar flex flex-row items-center justify-start gap-2 scroll-smooth ${isListed_jobs ? "h-fit" : "h-20"}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
                key={isListed_jobs ? "listed_jobs" : `${job_index}`}
                className="translate w-full h-full flex shrink-0"
              >
                <CandidateMiddleInformation
                  icons={icons}
                  currentJob={
                    !isListed_jobs
                      ? jobs?.[related_job_keys?.[job_index - 1]] || null
                      : "N/A"
                  }
                  handleViewDetails={handleViewDetails}
                  handleNavCompany={handleNavCompany}
                  relatedCompany={
                    isListed_jobs ? company_accounts[data["company id"]] : null
                  }
                  isListed_jobs={isListed_jobs}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Details section: Display job details for listed_jobs, candidate details for candidates view */}
        <Details data={data} isListed_jobs={isListed_jobs} />

        {/* Footer section: Actions and additional information */}
        <CardFooter
          icons={icons}
          data_key={data_key}
          data={data}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
          isListed_jobs={isListed_jobs}
        />
      </div>
      {modal && (
        <ConfirmModal
          handleConfirming={handleConfirming}
          message={`Confirm to delete ${data?.["job title"]}`}
        />
      )}
    </>
  );
}

export default CandidateCard;
