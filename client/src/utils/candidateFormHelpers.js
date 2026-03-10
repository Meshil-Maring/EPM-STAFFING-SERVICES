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

export const validateRequiredFields = (candidateForm, requiredFieldIds) => {
  const missing = requiredFieldIds.filter((id) => {
    const val = candidateForm[id];
    return val === undefined || val === null || String(val).trim() === "";
  });
  return missing;
};

export const CANDIDATE_FORM_INITIAL_STATE = (jobId, companyId) => ({
  name: "",
  gender: "",
  age: "",
  image: "",
  email: "",
  date: "",
  "phone number": "",
  experience: "",
  "job id": jobId,
  "company id": companyId,
  "offer status": "",
  "hiring stage": "",
  "interview type": "",
  "date applied": "",
  "released date": "",
  "joining date": "",
  skills: [],
  "applied position": "",
  bio: "",
  linkedin: "",
  link: "",
  "current ctc": "",
  "expected ctc": "",
  "notice period": "",
  location: "",
  "notice date": "",
  resume: "",
  "cover letter": "",
  portfolio: "",
});

export const FORM_ELEMENTS = [
  { label: "Email*", id: "email", type: "email" },
  { label: "Phone*", id: "phone number", type: "tel" },
  { label: "Location*", id: "location", type: "text" },
  { label: "Job type*", id: "contract type", type: "text" },
  { label: "Current CTC*", id: "current ctc", type: "text" },
  { label: "Expected CTC*", id: "expected ctc", type: "text" },
  { label: "D.O.B*", id: "date", type: "date" },
  { label: "Gender*", id: "gender", type: "text" },
  { label: "Linkedin*", id: "linkedin", type: "text" },
  { label: "Notice Period*", id: "notice period", type: "time" },
];

export const getRequiredFieldIds = () => [
  "name",
  ...FORM_ELEMENTS.map((el) => el.id),
];
