import React, { useContext, useEffect, useRef, useState } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Common from "../layouts/Dashboard/PostNewJob/Common";
import { motion, AnimatePresence } from "framer-motion";
import JobForm_Anchor_Component from "../layouts/JobForm_Anchor_Component/JobForm_Anchor_Component";

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

  // Job posting form data collection context
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);
  const navigate = useNavigate();

  // handling Job posting form inputs filling
  const handleInputChange = (value, id) => {
    setform_details((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Validation check before submission
  const handleFormSubmission = () => {
    e.preventDefault();
    const isEmpty = Object.fromEntries(
      Object.entries(form_details).filter(
        ([key, value]) =>
          (value != "" || value != null || value != undefined) && key != urgent,
      ),
    );
    if (!isEmpty) {
      // logic to post here
      alert("Job posted successfully");
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
      ref={containerRef}
      className="w-full h-dvh absolute top-0 left-0 z-20000 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
    >
      {/* main form */}
      <AnimatePresence>
        <motion.form
          ref={targetRef}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onSubmit={handleFormSubmission}
          className="w-[40%] h-[90%] overflow-y-auto overflow-x-hidden rounded-small border gap-6 border-whiter shadow-xl pb-4 px-6 m-auto flex flex-col bg-white"
        >
          <JobForm_Anchor_Component
            handleInputChange={handleInputChange}
            icon_class={icon_class}
          />

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
          <Button
            text="Post Job Opening"
            bg={true}
            class_name="py-1 w-full text-center rounded-small bg-g_btn text-text_white transition-all ease-in-out duration-120 w-fit"
            type="submit"
          />
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

export default JobForm;
