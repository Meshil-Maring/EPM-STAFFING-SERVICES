import React, { useState, createContext } from "react";

export const Jobs_context = createContext(null);

function JobsContext({ children }) {
  const [jobs, setJob] = useState([
    {
      id: "job-1",
      job_name: "Senior Software Engineer",
      status: "Active",
      priority: true,
      location: "Bangalore, India",
      contract_type: "Full-time",
      salary_range: "15-20 LPA",
      slots_available: "25 available",
      date_posted: "4 days ago",
      experience_required: "1+ years",
      max_applications: "23",
      application_deadline: "12/02/27",
      job_description:
        "We are looking for a motivated professional to join our team.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Profiency in Figma, Sketch, or Adobe XD",
      ],
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
      ],
      benefits: ["Flexible contract terms", "Remote Work opportunity"],
    },
    {
      id: "job-2",
      job_name: "Product Manager",
      status: "Snoozed",
      priority: false,
      location: "Mumbai, India",
      contract_type: "Full-time",
      salary_range: "20-30 LPA",
      slots_available: "10 available",
      date_posted: "5 days ago",
      experience_required: "3+ years",
      max_applications: "29",
      application_deadline: "12/02/29",
      job_description:
        "We are looking for a motivated professional to join our team.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Profiency in Figma, Sketch, or Adobe XD",
      ],
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
      ],
      benefits: ["Flexible contract terms", "Remote Work opportunity"],
    },
    {
      id: "job-3",
      job_name: "DevOps",
      status: "UnActive",
      priority: false,
      location: "Pune, India",
      contract_type: "Contract",
      salary_range: "18-28 LPA",
      slots_available: "25 available",
      date_posted: "6 days ago",
      experience_required: "4+ years",
      max_applications: "10",
      application_deadline: "12/02/28",
      job_description:
        "We are looking for a motivated professional to join our team.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Profiency in Figma, Sketch, or Adobe XD",
      ],
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
      ],
      benefits: ["Flexible contract terms", "Remote Work opportunity"],
    },
  ]);

  const updateJobs = (index, key, newValue) => {
    // updating a job
    const jobsUpdater = jobs.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: newValue };
      }
      return item;
    });
    setJob(jobsUpdater);
  };

  //   adding a new job
  const addJob = (newJob) => {
    setJob([...jobs, newJob]);
  };

  //   deleting a job
  const deleteJob = (idToDelete) => {
    const filteredJobs = jobs.filter((job) => job.id !== idToDelete);
    setJob(filteredJobs);
  };

  return (
    <Jobs_context.Provider value={{ jobs, updateJobs, addJob, deleteJob }}>
      {children}
    </Jobs_context.Provider>
  );
}

export default JobsContext;
