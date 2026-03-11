import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Jobs_context } from "../../context/JobsContext";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import Button from "../common/Button";
import Header from "../layouts/Dashboard/Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError, showInfo } from "../../utils/toastUtils";
import Label from "../common/Label";
import Input from "../common/Input";
import Icon from "../common/Icon";
import { generateJobId } from "../../utils/generateJobId";

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

  // State for dynamic form fields
  const [requirements, setRequirements] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [benefits, setBenefits] = useState([]);

  // Job posting form data collection context
  const { addJob } = useContext(Jobs_context);
  const navigate = useNavigate();

  // handling Job posting form inputs filling
  const handleInputChange = (value, id) => {
    setJob_form((prev) => {
      // Prevent infinite loop by checking if value actually changed
      if (prev[id] === value) {
        return prev;
      }
      return {
        ...prev,
        [id]: value,
      };
    });
  };

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
      return showError(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );

    if (job_form["expected ctc"].split("-").length !== 2)
      return showError(
        "Expected CTC should be a range seperated by `-` e.g: 1000 - 2000",
      );

    // Fix CTC formatting - trim each part separately
    const ctcParts = job_form["expected ctc"].split("-");
    const trimmed_ctc = ctcParts.map((part) => part.trim()).join("-");
    setJob_form((prev) => ({ ...prev, ["expected ctc"]: trimmed_ctc }));

    try {
      // Create the new job object with all required fields
      const newJob = {
        "job title": job_form["job title"],
        status: "Active",
        priority: job_form.priority,
        location: job_form.location,
        "contract type": job_form["contract type"],
        "expected ctc": trimmed_ctc,
        "slots available": `${job_form["max applications"]} available`,
        "date posted": "Just now",
        "experience required": job_form["experience required"],
        "max applications": job_form["max applications"],
        "application deadline": job_form["application deadline"],
        "job description": job_form["job description"],
        requirements: job_form.requirements,
        responsibilities: job_form.responsibilities,
        benefits: job_form.benefits,
        "company id": sessionStorage.getItem("logged_user_id"), // Add company ID
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
      showSuccess("Job posted successfully!");

      // Wait 3 seconds before closing and navigating
      setTimeout(() => {
        setClosing(false);
        navigate("/client/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error posting job:", error);
      showError("Failed to post job. Please try again.");
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
            {/* Requirements */}
            <div className="flex w-full flex-col items-start justify-start gap-0.5">
              <Label
                type="text"
                text="Requirements"
                class_name={"text-text_b_l"}
              />
              {job_form.requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center justify-center w-full gap-1"
                >
                  <Input
                    onchange={(value) => {
                      const newRequirements = [...job_form.requirements];
                      newRequirements[i] = value;
                      setJob_form((prev) => ({
                        ...prev,
                        requirements: newRequirements,
                      }));
                    }}
                    type="text"
                    value={req}
                    class_name="border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full py-1 px-2 rounded-small"
                    placeholder="3+ years of UI/UX design experience"
                  />
                  <span
                    type="icon"
                    className="w-fit h-fit cursor-pointer"
                    onClick={() => {
                      if (job_form.requirements.length > 1) {
                        const newRequirements = job_form.requirements.filter(
                          (_, index) => index !== i,
                        );
                        setJob_form((prev) => ({
                          ...prev,
                          requirements: newRequirements,
                        }));
                      }
                    }}
                  >
                    {job_form.requirements.length > 1 && (
                      <Icon icon="ri-close-line" class_name={icon_class} />
                    )}
                  </span>
                </div>
              ))}
              <button
                onClick={() =>
                  setJob_form((prev) => ({
                    ...prev,
                    requirements: [...prev.requirements, ""],
                  }))
                }
                type="button"
                className="text-nevy_blue cursor-pointer hover:font-medium transition-all ease-in-out duration-200 font-lighter"
              >
                + Add requirement
              </button>
            </div>

            {/* Responsibilities */}
            <div className="flex w-full flex-col items-start justify-start gap-0.5">
              <Label
                type="text"
                text="Responsibilities"
                class_name={"text-text_b_l"}
              />
              {job_form.responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center justify-center w-full gap-1"
                >
                  <Input
                    onchange={(value) => {
                      const newResponsibilities = [
                        ...job_form.responsibilities,
                      ];
                      newResponsibilities[i] = value;
                      setJob_form((prev) => ({
                        ...prev,
                        responsibilities: newResponsibilities,
                      }));
                    }}
                    type="text"
                    value={resp}
                    class_name="border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full py-1 px-2 rounded-small"
                    placeholder="Create wireframes, prototypes, and high-fidelity designs"
                  />
                  <span
                    type="icon"
                    className="w-fit h-fit cursor-pointer"
                    onClick={() => {
                      if (job_form.responsibilities.length > 1) {
                        const newResponsibilities =
                          job_form.responsibilities.filter(
                            (_, index) => index !== i,
                          );
                        setJob_form((prev) => ({
                          ...prev,
                          responsibilities: newResponsibilities,
                        }));
                      }
                    }}
                  >
                    {job_form.responsibilities.length > 1 && (
                      <Icon icon="ri-close-line" class_name={icon_class} />
                    )}
                  </span>
                </div>
              ))}
              <button
                onClick={() =>
                  setJob_form((prev) => ({
                    ...prev,
                    responsibilities: [...prev.responsibilities, ""],
                  }))
                }
                type="button"
                className="text-nevy_blue cursor-pointer hover:font-medium transition-all ease-in-out duration-200 font-lighter"
              >
                + Add responsibility
              </button>
            </div>

            {/* Benefits */}
            <div className="flex w-full flex-col items-start justify-start gap-0.5">
              <Label
                type="text"
                text="Benefits & Perks"
                class_name={"text-text_b_l"}
              />
              {job_form.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center justify-center w-full gap-1"
                >
                  <Input
                    onchange={(value) => {
                      const newBenefits = [...job_form.benefits];
                      newBenefits[i] = value;
                      setJob_form((prev) => ({
                        ...prev,
                        benefits: newBenefits,
                      }));
                    }}
                    type="text"
                    value={benefit}
                    class_name="border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full py-1 px-2 rounded-small"
                    placeholder="Flexible contract terms"
                  />
                  <span
                    type="icon"
                    className="w-fit h-fit cursor-pointer"
                    onClick={() => {
                      if (job_form.benefits.length > 1) {
                        const newBenefits = job_form.benefits.filter(
                          (_, index) => index !== i,
                        );
                        setJob_form((prev) => ({
                          ...prev,
                          benefits: newBenefits,
                        }));
                      }
                    }}
                  >
                    {job_form.benefits.length > 1 && (
                      <Icon icon="ri-close-line" class_name={icon_class} />
                    )}
                  </span>
                </div>
              ))}
              <button
                onClick={() =>
                  setJob_form((prev) => ({
                    ...prev,
                    benefits: [...prev.benefits, ""],
                  }))
                }
                type="button"
                className="text-nevy_blue cursor-pointer hover:font-medium transition-all ease-in-out duration-200 font-lighter"
              >
                + Add benefit
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col items-center my-4 px-4">
            <Button
              onclick={handleFormSubmission}
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
