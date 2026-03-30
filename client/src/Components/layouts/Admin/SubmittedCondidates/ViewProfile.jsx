import React, { useContext } from "react";
import { createPortal } from "react-dom";
import Label from "../../../common/Label";
import { Company_context } from "../../../../context/AccountsContext";
import Icon from "../../../common/Icon";
import ManageOverlayHeader from "./ManageOverlay/ManageOverlayHeader";
import PersonalInfo from "./ManageOverlay/PersonalInfo";
import ContactInfo from "./ManageOverlay/ContactInfo";
import SubmissionDetails from "./ManageOverlay/SubmissionDetails";
import Compensation from "./ManageOverlay/Compensation";
import Skills from "./ManageOverlay/Skills";
import { Jobs_context } from "../../../../context/JobsContext";
import { showInfo } from "../../../../utils/toastUtils";
import { useLocation } from "react-router-dom";
import EmploymentDetails from "../../Dashboard/OfferReleased/EMploymentDetails";
import ImportantDates from "../../Dashboard/OfferReleased/ImportantDates";

/**
 * ViewProfile component - Modal overlay for viewing detailed data profile information
 * @param {Object} props - Component props
 * @param {Object} props.data - Data data to display
 * @param {Function} props.setClosing - Function to close the overlay
 * @returns {JSX.Element} Rendered view profile component
 */
function ViewProfile({ isListed_jobs, data, setClosing }) {
  // check the path to decide which sections to show and hide
  // pathname from location path
  const { pathname } = useLocation();

  // extracting the section name
  const section = pathname.split("/").at(-1);

  // checking if the section is Offer Released
  const isOfferReleased = section === "offer_released";

  // Get jobs context for accessing job data
  const { jobs } = useContext(Jobs_context) || {};

  // Get company context for accessing company data
  const { company_accounts } = useContext(Company_context) || {};
  // Get job keys from data data with safe access
  const jobs_keys = !isListed_jobs ? data?.["job id"] : [];
  // Get current job data safely
  const job = jobs_keys.length > 0 ? jobs?.[jobs_keys[0]] : null;
  // Get company data for the job safely
  const company = job ? company_accounts?.[job["company id"]] || {} : {};

  // Get unique company IDs from job keys safely
  const job_company_ids = new Set(
    jobs_keys.map((j_key) => jobs?.[j_key]?.["company id"]).filter(Boolean),
  );

  // Get company keys that match the job company IDs
  const company_keys = Object.keys(company_accounts || {}).filter((key) =>
    job_company_ids.has(key),
  );
  // Format job name with count safely
  const job_name = job
    ? `${job["job title"]} + ${jobs_keys.length - 1} more`
    : jobs_keys.length > 0
      ? `${jobs_keys.length} job(s)`
      : "-";
  // Get data experience
  const exp = data.experience || "-";
  // Get data status
  const cand_status = data["offer status"] || "-";
  // Heading class for consistent styling
  const heading_class =
    "font-semibold mb-2 border-b border-lighter pb-2 w-full";

  // Notes section content
  const notes = "Awaiting client feed back on portfolio";
  // Submission details for display
  const submission_details = [
    {
      label: "Client Company",
      val1: `${company.name} + ${company_keys.length - 1} more` || "-",
      val2: data["date applied"] || "-",
    },
    { label: "Current Stage", val: data["hiring stage"] || "-" },
    { label: "Job Type", val: job?.["contract type"] || "-" },
  ];

  // Contact information for the data
  const contact_info = [
    {
      label: "Email",
      icon: "ri-mail-line",
      value: data.email || "Not provided",
    },
    {
      label: "Linkedin",
      icon: "ri-linkedin-line",
      value: data.linkedin || "Not provided",
    },
    {
      label: "Phone",
      icon: "ri-phone-line",
      value: data["phone number"] || "Not provided",
    },
    {
      label: "Location",
      icon: "ri-map-pin-line",
      value: data.location || data.address || "Not provided",
    },
  ];
  // Data skills array
  const skills = Array.isArray(data.skills) ? data.skills : [];
  // Personal information for the data
  const personal_info = [
    {
      label: "Gender",
      icon: "ri-user-smile-line",
      value: data.gender || "-",
    },
    {
      label: "D.O.B",
      icon: "ri-calendar-line",
      value: data["date of birth"] || "-",
    },
    {
      label: "Notice Period",
      icon: "ri-calendar-line",
      value: data["notice period"] || "Not provided",
    },
    {
      label: "Resume",
      icon: "ri-file-pdf-2-fill",
      value: data.resume || "Not provided",
    },
    {
      label: "Cover Letter",
      icon: "ri-file-pdf-2-fill",
      value: data["cover letter"] || "Not provided",
    },
  ];
  // Validate data data
  if (!data) return showInfo("Something went wrong!");

  return createPortal(
    <div
      onClick={() => setClosing(false)}
      className="w-full h-full absolute text-xs top-0 left-0 flex items-center justify-center bg-light_black z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40%] overflow-hidden h-[80%] rounded-small bg-b_white flex flex-col justify-start gap-4"
      >
        {/* Header section with data and job information */}
        <ManageOverlayHeader
          candidate={data}
          data={data}
          job_name={job_name}
          exp={exp}
          cand_status={cand_status}
          setClosing={setClosing}
        />
        {/* Main content section with all data details */}
        <div className="w-full p-4 gap-6 flex flex-col items-start justify-start text-sm overflow-y-auto no-scrollbar">
          <PersonalInfo
            personal_info={personal_info}
            heading_class={heading_class}
          />
          <ContactInfo
            contact_info={contact_info}
            heading_class={heading_class}
          />

          {/* submission details */}
          {!isOfferReleased && (
            <SubmissionDetails
              submission_details={submission_details}
              company={company}
              heading_class={heading_class}
            />
          )}
          <Skills heading_class={heading_class} skills={skills} />
          <Compensation heading_class={heading_class} job={job} data={data} />
          <EmploymentDetails job={job} />
          {/* Important Dates section - only show for OfferReleased section */}
          {isOfferReleased && <ImportantDates data={data} />}

          {/* Notes section */}
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <Label
              text={isOfferReleased ? "Message" : "Notes"}
              class_name={heading_class}
            />
            <div className="p-2 rounded-small w-full bg-blue/5 flex flex-row items-center justify-start">
              <Icon icon={"ri-file-text-line"} class_name="text-xl" />
              <Label
                text={
                  isOfferReleased
                    ? data?.client_message || notes
                    : job.notes || "No Notes"
                }
                class_name={""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ViewProfile;
