import React, { useContext, useEffect, useRef, useState } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";
import { useNavigate } from "react-router-dom";
import { Jobs_context } from "../../context/JobsContext";
import Common from "../layouts/Dashboard/PostNewJob/Common";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import JobFormContainer from "../layouts/Dashboard/PostNewJob/JobFormContainer";
import Button from "../common/Button";

function JobForm() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
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
    "salary range": "",
    "experience required": "",
    "max applications": "",
    "application deadline": "",
    "job description": "",
    requirements: [],
    responsibilities: [],
    benefits: [],
  });

  // Job posting form data collection context
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);
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
  const [message, setMessage] = useState({ type: "", text: "" });

  // Validation check before submission
  const handleFormSubmission = async () => {
    console.log(job_form);
    // Basic validation
    const requiredFields = [
      "job title",
      "location",
      "contract type",
      "salary range",
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

    if (missingFields.length > 0) {
      setMessage({
        type: "error",
        text: `Please fill in all required fields: ${missingFields.join(", ")}`,
      });
      const target = document.getElementById("error_div");
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "info", text: "Posting job opening..." });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create the new job object with all required fields
      const newJob = {
        id: `job-${Date.now()}`, // Generate unique ID
        "job title": job_form["job title"],
        status: "Active",
        priority: job_form.priority,
        location: job_form.location,
        "contract type": job_form["contract type"],
        "salary range": job_form["salary range"],
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

      setMessage({ type: "success", text: "Job posted successfully!" });

      // Clear the form after successful submission
      setJob_form({
        "job title": "",
        priority: false,
        location: "",
        "contract type": "",
        "salary range": "",
        "experience required": "",
        "max applications": "",
        "application deadline": "",
        "job description": "",
        requirements: [],
        responsibilities: [],
        benefits: [],
      });

      // Navigate back to dashboard after success
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to post job. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // smooth popping of overlay manager
  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!target || !container) return;
    const onclick = (e) => {
      if (!target.contains(e.target)) {
        navigate("/client/dashboard");
      }
    };
    container.addEventListener("mousedown", onclick);
    return () => container.removeEventListener("mousedown", onclick);
  }, []);

  // styles
  const icon_class =
    "font-semibold text-lg hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";

  // main return
  return (
    <JobFormContainer>
      {/* Feedback Message */}
      <div
        id="error_div"
        className={`flex items-center justify-center ${message.text === "" ? "w-0.5 h-0.5 border" : "w-full h-fit p-4"}`}
      >
        {message.text && (
          <div
            className={`p-3 rounded-small border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : message.type === "error"
                  ? "bg-red-lighter border-red-light text-red-dark"
                  : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}
      </div>

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
    </JobFormContainer>
  );
}

export default JobForm;
