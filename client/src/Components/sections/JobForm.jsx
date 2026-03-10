import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Jobs_context } from "../../context/JobsContext";
import Common from "../layouts/Dashboard/PostNewJob/Common";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import Button from "../common/Button";
import Header from "../layouts/Dashboard/Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";

function JobForm({ setClosing }) {
  // Requirements, Responsibilities and Benefits components
  const components = {
    Requirement: {
      placeholder: "3+ years of UI/UX design experience",
      button: "+ Add requirement",
    },
    Responsibilites: {
      placeholder: "Create wireframes, prototypes, and high-fidelity designs",
      button: "+ Add responsibility",
    },
    "Benefits & Perks": {
      placeholder: "Flexible contract terms",
      button: "+ Add benefit",
    },
  };

  const [job_form, setJob_form] = useState({
    "job title": "",
    priority: false,
    location: "",
    "contract type": "",
    "expected ctc": "",
    "experience required": "",
    "max applications": "",
    "application deadline": "",
    "job description": "",
    requirements: [],
    responsibilities: [],
    benefits: [],
  });

  // Job posting form data collection context
  const { addJob } = useContext(Jobs_context);
  const navigate = useNavigate();

  // handling Job posting form inputs filling
  const handleInputChange = (value, id) => {
    setJob_form((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // State for feedback messages
  const [isSubmitting, setIsSubmitting] = useState(false);

  // resetting the form
  useEffect(() => {
    setJob_form({
      "job title": "",
      priority: false,
      location: "",
      "contract type": "",
      "expected ctc": "",
      "experience required": "",
      "max applications": "",
      "application deadline": "",
      "job description": "",
      requirements: [],
      responsibilities: [],
      benefits: [],
    });
  }, []);

  // Validation check before submission
  const handleFormSubmission = () => {
    // Basic validation
    const requiredFields = [
      "job title",
      "location",
      "contract type",
      "expected ctc",
      "experience required",
      "max applications",
      "application deadline",
      "job description",
    ];

    const missingFields = Object.keys(job_form).filter(
      (key) =>
        requiredFields.includes(key) &&
        (job_form[key] === "" || job_form[key] === null),
    );

    if (missingFields.length > 0)
      return toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );

    if (job_form["expected ctc"].split("-").length !== 2) return;
    toast.error(
      "Expected CTC should be a range seperated by `-` e.g: 1000 - 2000",
    );

    setIsSubmitting(true);
    toast.success("Posting job opening...");

    try {
      // Simulate API call delay
      // Create the new job object with all required fields
      const newJob = {
        id: `job-${Date.now().toString.split("/").join("")}`, // Generate unique ID
        "job title": job_form["job title"],
        status: "Active",
        priority: job_form.priority,
        location: job_form.location,
        "contract type": job_form["contract type"],
        "expected ctc": job_form["expected ctc"],
        "slots available": `${job_form["max applications"]} available`,
        "date posted": "Just now",
        "experience required": job_form["experience required"],
        "max applications": job_form["max applications"],
        "application deadline": job_form["application deadline"],
        "job description": job_form["job description"],
        requirements: job_form.requirements,
        responsibilities: job_form.responsibilities,
        benefits: job_form.benefits,
      };

      // Add the job to the global context (this is where changes are reflected)
      addJob(newJob);

      // Clear the form after successful submission
      setJob_form({
        "job title": "",
        priority: false,
        location: "",
        "contract type": "",
        "expected ctc": "",
        "experience required": "",
        "max applications": "",
        "application deadline": "",
        "job description": "",
        requirements: [],
        responsibilities: [],
        benefits: [],
      });

      // Show success message for 3 seconds then navigate
      toast.success("Job posted successfully!");
      setIsSubmitting(false);

      // Wait 3 seconds before closing and navigating
      setTimeout(() => {
        setClosing(false);
        navigate("/client/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
      setIsSubmitting(false);
    }
  };

  // styles
  const icon_class =
    "font-semibold text-lg hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";

  // main return
  return (
    <div
      onClick={() => setClosing(false)}
      className="absolute flex items-center justify-center p-4 top-0 left-0 w-full h-full bg-light_black z-200"
    >
      {/* Feedback Message */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, type: "tween" }}
        onClick={(e) => e.stopPropagation()}
        className="flex overflow-hidden flex-col items-center w-[40%] h-full bg-b_white rounded-small justify-start"
      >
        <Header
          heading={"Post New Job"}
          handleClosingModal={() => setClosing(false)}
        />
        <div className="w-full overflow-y-auto no-scrollbar flex flex-col items-center justify-start gap-4 pt-4">
          <JobForm_Anchor_Component
            handleInputChange={handleInputChange}
            icon_class={icon_class}
          />
          <div className="w-full flex flex-col items-center gap-6 px-4">
            {Object.keys(components).map((key, index) => {
              return (
                <Common
                  onchange={handleInputChange}
                  key={index}
                  icon_class={icon_class}
                  heading={key}
                  placeholder={components[key].placeholder}
                  button={components[key].button}
                />
              );
            })}
          </div>
          <div className="w-full flex flex-col items-center my-4 px-4">
            <Button
              onclick={handleFormSubmission}
              isSubmitting={isSubmitting}
              class_name="py-1 w-full text-center rounded-small bg-g_btn text-text_white transition-all ease-in-out duration-120 w-full"
              text="Post Job Opening"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default JobForm;
