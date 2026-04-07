// Candidate form validation and calculation helpers

export const computeAgeFromDOB = (dob) => {
  if (!dob) return "";
  // dob can be in format YYYY-MM-DD or DD/MM/YYYY
  let birth;
  if (dob.includes("-")) {
    const [y, m, d] = dob.split("-");
    birth = new Date(Number(y), Number(m) - 1, Number(d));
  } else if (dob.includes("/")) {
    const [d, m, y] = dob.split("/");
    birth = new Date(Number(y), Number(m) - 1, Number(d));
  } else {
    birth = new Date(dob);
  }
  if (isNaN(birth.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export const validateRequiredFields = (candidateForm) => {
  const missing = Object.keys(candidateForm).filter((id) => {
    const val = candidateForm[id];
    if (val === undefined || val === null || String(val).trim() === "")
      return id;
  });
  return missing;
};

export const CANDIDATE_FORM_INITIAL_STATE = (jobId, companyId) => ({
  candidate_name: "",
  email: "",
  experience: "",
  phone: "",
  location: "",
  contract_type: "",
  current_ctc: "",
  expected_ctc: "",
  date_of_birth: "",
  gender: "",
  linkedin: "",
  notice_period_days: "",
  job_id: jobId,
  company_id: companyId,
  description: "",
});

export const FORM_ELEMENTS = [
  {
    label: "Email*",
    id: "email",
    type: "email",
  },
  {
    label: "Phone*",
    id: "phone",
    type: "tel",
  },
  { label: "Location*", id: "location", type: "text" },
  { label: "Job type*", id: "contract_type", type: "text" },
  { label: "Current CTC*", id: "current_ctc", type: "number" },
  { label: "Expected CTC*", id: "expected_ctc", type: "number" },
  { label: "D.O.B*", id: "date_of_birth", type: "date" },
  { label: "Gender*", id: "gender", type: "text" },
  { label: "Experience*", id: "experience", type: "text" },
  { label: "Linkedin*", id: "linkedin", type: "text" },
  { label: "Notice Period*", id: "notice_period_days", type: "number" },
];
