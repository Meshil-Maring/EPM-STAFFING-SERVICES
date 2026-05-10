// Company overlay calculation and helper functions

// calculating total candidates for a job by filtering candidates based on job id
export const getTotalCandidates = (candidates, jobKey) => {
  const potentialCandidates = candidates.filter((candidate) =>
    candidate?.job_id?.includes(jobKey),
  );
  return potentialCandidates?.length || 0;
};

// calculating days since job was posted by comparing current date with job's created_at date
export const getDaysPosted = (created_at) => {
  const postedDate = new Date(created_at);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  postedDate.setHours(0, 0, 0, 0);
  const dateDiffer = today - postedDate;
  const daysDiffer = Math.floor(dateDiffer / (1000 * 60 * 60 * 24));
  return daysDiffer;
};

// contact details to show in the overlay
export const CONTACT_ELEMENTS = (company) => [
  {
    label: "Email",
    icon: "ri-mail-line",
    key: "email",
    value: company?.email || "N/A",
  },
  {
    label: "Phone",
    icon: "ri-phone-line",
    key: "phone number",
    value: company?.phone || "N/A",
  },
  {
    label: "Location",
    icon: "ri-map-pin-line",
    key: "address",
    value: `${company?.street || ""}, ${company?.city || ""}, ${company?.state || "N/A"}`,
  },
  {
    label: "Website",
    icon: "ri-global-line",
    key: "website",
    value: company?.website || "N/A",
  },
];

// business details to show in the overlay
// : formating the date of account creation
const getDateFormatted = (company) => {
  const { user_created_at } = company || {};
  if (!user_created_at) return "N/A";
  const [date, time] = user_created_at.split("T") || [];
  return `${date || "N/A"} | ${time ? time.split(".")[0] : ""}`;
};

// formatting the business details to show in the overlay
export const BUSINESS_DETAILS = (company) => [
  {
    label: "Joined Date",
    icon: "ri-calendar-line",
    value: getDateFormatted(company),
  },
  {
    label: "CIN number",
    icon: "ri-id-card-line",
    value: company?.registration_number || "N/A",
  },
];
