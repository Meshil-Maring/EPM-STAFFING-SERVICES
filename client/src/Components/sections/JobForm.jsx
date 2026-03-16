import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Jobs_context } from "../../context/JobsContext";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import Button from "../common/Button";
import Header from "../layouts/Dashboard/Candidate/Common/Header";
import { motion } from "framer-motion";
import { showSuccess, showError } from "../../utils/toastUtils";
import { getJobsByUserID } from "../../services/jobs.services";

function JobForm({ setClosing }) {
  const [job_form, setJob_form] = useState({
    job_title: "",
    priority: false,
    location: "",
    contract_type: "",

    offer_ctc_min: "",
    offer_ctc_max: "",

    experience_required: "",
    max_applications: "",
    application_deadline: "",
    job_description: "",

    requirements: [],
    responsibilities: [],
    benefits: [],
  });

  const { addJob } = useContext(Jobs_context);
  const navigate = useNavigate();

  const handleInputChange = (value, id) => {
    setJob_form((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    setJob_form({
      job_title: "",
      priority: false,
      location: "",
      contract_type: "",

      offer_ctc_min: "",
      offer_ctc_max: "",

      experience_required: "",
      max_applications: "",
      application_deadline: "",
      job_description: "",

      requirements: [],
      responsibilities: [],
      benefits: [],
    });
  }, []);

  // Form submit
  const handleFormSubmission = async () => {
    const requiredFields = [
      "job_title",
      "location",
      "contract_type",
      "offer_ctc_min",
      "offer_ctc_max",
      "experience_required",
      "max_applications",
      "application_deadline",
      "job_description",
    ];

    const missingFields = requiredFields.filter(
      (field) => !job_form[field] || job_form[field] === "",
    );

    if (missingFields.length > 0) {
      return showError(
        `Please fill required fields: ${missingFields.join(", ")}`,
      );
    }

    if (Number(job_form.offer_ctc_min) > Number(job_form.offer_ctc_max)) {
      return showError("Minimum CTC cannot be greater than Maximum CTC");
    }

    try {
      const newJob = {
        job_title: job_form.job_title,
        status: "Active",
        priority: job_form.priority,
        location: job_form.location,
        contract_type: job_form.contract_type,

        offer_ctc_min: job_form.offer_ctc_min,
        offer_ctc_max: job_form.offer_ctc_max,

        slots_available: `${job_form.max_applications} available`,
        date_posted: "Just now",

        experience_required: job_form.experience_required,
        max_applications: job_form.max_applications,
        application_deadline: job_form.application_deadline,
        job_description: job_form.job_description,

        requirements: job_form.requirements,
        responsibilities: job_form.responsibilities,
        benefits: job_form.benefits,

        company_id: sessionStorage.getItem("logged_user_id"),
      };

      addJob(newJob);

      const readyPost = {
        active: true,
        urgent: job_form.priority,
        job_name: job_form.job_title,
        job_type: job_form.contract_type.toLowerCase(),

        salary_min: Number(job_form.offer_ctc_min),
        salary_max: Number(job_form.offer_ctc_max),

        experience_years: job_form.experience_required,
        max_applications: job_form.max_applications,
        deadline: job_form.application_deadline,
        description: job_form.job_description,

        user_id: "f687e1c9-d06e-431d-9350-c2e5f5d3a448a", // FIX ME:
      };

      // POST to job api
      const res = await postJobs(readyPost);
      const status = res.ok;

      if (status) {
        showSuccess("Job posted successfully!");
      } else {
        showError("Failed to post job");
      }

      setTimeout(() => {
        setClosing(false);
        navigate("/client/dashboard");
      }, 3000);
    } catch (error) {
      console.error(error);
      showError("Failed to post job");
    }
  };

  const icon_class =
    "font-semibold text-lg hover:text-red transition-all duration-200 hover:border border-red_light w-6 h-6 p-2";

  return (
    <div
      onClick={() => setClosing(false)}
      className="absolute flex items-center justify-center p-4 top-0 left-0 w-full h-full bg-light_black z-200"
    >
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="flex overflow-hidden flex-col items-center w-[40%] h-full bg-b_white rounded-small"
      >
        <Header
          heading={"Post New Job"}
          handleClosingModal={() => setClosing(false)}
        />

        <div className="w-full overflow-y-auto flex flex-col items-center gap-4 pt-4">
          {/* Main form inputs */}
          <JobForm_Anchor_Component
            handleInputChange={handleInputChange}
            icon_class={icon_class}
          />

          {/* Post Button */}
          <div className="w-full flex flex-col items-center my-4 px-4">
            <Button
              onclick={handleFormSubmission}
              class_name="py-1 w-full rounded-small bg-g_btn text-text_white"
              text="Post Job"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default JobForm;
