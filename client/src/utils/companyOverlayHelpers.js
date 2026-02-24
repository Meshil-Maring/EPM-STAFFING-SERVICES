// Company overlay calculation and helper functions

export const getTotalCandidates = (candidates, jobKey) => {
  const potentialCandidates = Object.values(candidates).filter(
    (candidate) => candidate["job id"] === jobKey,
  );
  return potentialCandidates.length;
};

export const getDaysPosted = (jobs, jobKey) => {
  const date = jobs[jobKey]["date posted"];
  const [day, month, year] = date.split("/").map(Number);
  const postedDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  postedDate.setHours(0, 0, 0, 0);
  const dateDiffer = today - postedDate;
  const daysDiffer = Math.floor(dateDiffer / (1000 * 60 * 60 * 24));
  return daysDiffer;
};

export const getCompanyKey = (companyAccounts, company) => {
  return Object.keys(companyAccounts).find(
    (key) => companyAccounts[key] === company,
  );
};

export const getRelatedJobs = (jobs, compKey) => {
  return Object.keys(jobs).filter((key) => jobs[key]["company id"] === compKey);
};

export const CONTACT_ELEMENTS = [
  { label: "Email", icon: "ri-mail-line", key: "email" },
  { label: "Phone", icon: "ri-phone-line", key: "phone number" },
  { label: "Location", icon: "ri-map-pin-line", key: "location" },
  { label: "Website", icon: "ri-global-line", key: "website" },
];

export const BUSINESS_DETAILS = (company) => [
  {
    label: "Joined Date",
    icon: "ri-calendar-line",
    value: company["joined date"],
  },
  {
    label: "CIN number",
    icon: "ri-id-card-line",
    value: company["registration number"],
  },
];
