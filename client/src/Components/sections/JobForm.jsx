import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import Button from "../common/Button";
import Header from "../layouts/Dashboard/Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError } from "../../utils/toastUtils";
import { useAuth } from "../../hooks/useAuth";
import { insertDataService } from "../../utils/server_until/service";

const sections = [
  { id: "requirements", label: "Requirements" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "benefits", label: "Benefits & Perks" },
];

function JobForm({ setClosing, refreshJobs }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const defaultForm = {
    job_title: "",
    priority: false,
    location: "",
    contract_type: "full-time",
    offer_ctc_min: "",
    offer_ctc_max: "",
    experience_required: "",
    max_applications: "",
    application_deadline: "",
    description: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
  };

  const [job_form, setJob_form] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  // ── Generic field handler ──────────────────────────────────────────────────
  const handleInputChange = (value, id) => {
    setJob_form((prev) => ({ ...prev, [id]: value }));
  };

  // ── Dynamic list handlers ──────────────────────────────────────────────────
  const handleAddItem = (sectionId) => {
    setJob_form((prev) => ({
      ...prev,
      [sectionId]: [...prev[sectionId], ""],
    }));
  };

  const handleItemChange = (sectionId, index, value) => {
    setJob_form((prev) => {
      const updated = [...prev[sectionId]];
      updated[index] = value;
      return { ...prev, [sectionId]: updated };
    });
  };

  const handleRemoveItem = (sectionId, index) => {
    setJob_form((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((_, i) => i !== index),
    }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleFormSubmission = async () => {
    if (loading) return;

    const requiredFields = [
      "job_title",
      "location",
      "contract_type",
      "offer_ctc_min",
      "offer_ctc_max",
      "experience_required",
      "max_applications",
      "application_deadline",
      "description",
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
      setLoading(true);

      const readyPost = {
        active: true,
        urgent: job_form.priority,
        location: job_form.location,
        job_name: job_form.job_title,
        job_type: job_form.contract_type.toLowerCase(),
        salary_min: Number(job_form.offer_ctc_min),
        salary_max: Number(job_form.offer_ctc_max),
        experience_years: job_form.experience_required,
        max_applications: job_form.max_applications,
        deadline: job_form.application_deadline,
        description: job_form.description,
        user_id: user.id,
      };

      // ── Submit core job ────────────────────────────────────────────────────
      const res = await insertDataService("api/dr/insert/jobs", readyPost);

      if (res.success) {
        showSuccess("Job posted successfully!");
        refreshJobs();
      } else {
        showError("Failed to post job");
      }

      // ── Submit requirements (only if not empty) ────────────────────────────
      if (job_form.requirements.length > 0) {
        await insertDataService("api/dr/insert/job_requirements", {
          job_id: res.data.id,
          requirements: { ...job_form.requirements },
        });
      } else {
        await insertDataService("api/dr/insert/job_requirements", {
          job_id: res?.data?.id,
          requirements: {},
        });
      }

      // ── Submit responsibilities (only if not empty) ────────────────────────
      if (job_form.responsibilities.length > 0) {
        await insertDataService("api/dr/insert/job_responsibilities", {
          job_id: res.data.id,
          responsibilities: { ...job_form.responsibilities },
        });
      } else {
        await insertDataService("api/dr/insert/job_responsibilities", {
          job_id: res.data.id,
          responsibilities: {},
        });
      }

      // ── Submit benefits (only if not empty) ───────────────────────────────
      if (job_form.benefits.length > 0) {
        await insertDataService("api/dr/insert/job_benefits", {
          job_id: res.data.id,
          benefits: { ...job_form.benefits },
        });
      } else {
        await insertDataService("api/dr/insert/job_benefits", {
          job_id: res.data.id,
          benefits: {},
        });
      }

      setClosing(false);
      navigate("/client/dashboard");
    } catch (error) {
      console.error(error);
      showError("Failed to post job");
    } finally {
      setLoading(false);
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
          {/* Existing form fields */}
          <JobForm_Anchor_Component
            handleInputChange={handleInputChange}
            job_form={job_form}
            icon_class={icon_class}
          />

          {/* ── Dynamic List Sections ───────────────────────────────────── */}
          {sections.map(({ id, label }) => (
            <div key={id} className="w-full px-4 flex flex-col gap-2">
              {/* Section header */}
              <div className="flex items-center justify-between">
                <label className="font-semibold text-sm text-gray-700">
                  {label}
                </label>
                <button
                  type="button"
                  onClick={() => handleAddItem(id)}
                  className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 font-medium transition-colors duration-150"
                >
                  <span className="text-base leading-none">+</span> Add
                </button>
              </div>

              {/* Empty state */}
              {job_form[id].length === 0 && (
                <p className="text-xs text-gray-400 italic">
                  No items yet. Click &quot;+ Add&quot; to begin.
                </p>
              )}

              {/* Items */}
              <AnimatePresence initial={false}>
                {job_form[id].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleItemChange(id, index, e.target.value)
                      }
                      placeholder={`Enter ${label.toLowerCase()} item...`}
                      className="flex-1 border border-gray-300 rounded-small px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(id, index)}
                      className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 text-lg leading-none flex-shrink-0"
                      aria-label={`Remove ${label} item`}
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}

          {/* Submit Button */}
          <div className="w-full flex flex-col items-center my-4 px-4">
            <Button
              onclick={handleFormSubmission}
              disabled={loading}
              class_name={`py-2 w-full rounded-small text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-700 hover:scale-105"
              }`}
              text={loading ? "Posting..." : "Post Job"}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default JobForm;
