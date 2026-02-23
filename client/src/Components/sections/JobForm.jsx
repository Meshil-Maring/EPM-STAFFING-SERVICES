import React, { useContext, useEffect, useRef, useState } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";
import { useNavigate } from "react-router-dom";
import { Jobs_context } from "../../context/JobsContext";
import Common from "../layouts/Dashboard/PostNewJob/Common";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import Button from "../common/Button";
import Header from "../layouts/Dashboard/Candidate/Common/Header";

function JobForm({ setClosing }) {
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

  // Scroll to error div when message appears
  useEffect(() => {
    if (message.text) {
      const target = document.getElementById("error_div");
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);
      }
    }
  }, [message.text]);

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

    if (missingFields.length > 0) {
      setMessage({
        type: "error",
        text: `Please fill in all required fields: ${missingFields.join(", ")}`,
      });

      setTimeout(() => {
        setMessage({
          type: "",
          text: "",
        });
      }, 5000);
      return;
    }

    if (job_form["expected ctc"].split("-").length !== 2) {
      setMessage({
        type: "error",
        text: "Expected CTC should be a range seperated by `-` e.g: 1000 - 2000",
      });
      setTimeout(() => {
        setMessage({
          type: "",
          text: "",
        });
      }, 5000);
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "info", text: "Posting job opening..." });

    try {
      // Simulate API call delay
      // Create the new job object with all required fields
      const newJob = {
        id: `job-${Date.now()}`, // Generate unique ID
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
      setMessage({ type: "success", text: "Job posted successfully!" });
      setIsSubmitting(false);

      // Wait 3 seconds before closing and navigating
      setTimeout(() => {
        setMessage({
          type: "",
          text: "",
        });
        setClosing(false);
        navigate("/client/dashboard");
      }, 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to post job. Please try again.",
      });
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
    <div
      onClick={() => setClosing(false)}
      className="absolute flex items-center justify-center p-4 top-0 left-0 w-full h-full bg-light_black z-200"
    >
      {/* Feedback Message */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex overflow-hidden flex-col items-center w-[40%] h-full bg-b_white rounded-small justify-start"
      >
        <Header
          heading={"Post New Job"}
          handleClosingModal={() => setClosing(false)}
        />
        <div className="w-full overflow-y-auto no-scrollbar flex flex-col items-center justify-start gap-4 pt-4">
          {message.text && (
            <div className="w-full flex flex-items-center justify-center p-4">
              <div
                id="error_div"
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
            </div>
          )}

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
      </div>
    </div>
  );
}

export default JobForm;
