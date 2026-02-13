import React, { useState, useEffect } from "react";
import Header from "./Common/Header";
import LabelInput from "../../../common/LabelInput";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import OptionalTextArea from "./Common/OptionalTextArea";
import OverlayButtons from "./Common/OverlayButtons";
import { motion } from "framer-motion";

function ReleaseOffer({ candidate, handleClosing }) {
  const [value, setValue] = useState("Full-Time");
  const [isShow, setIsShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [check, setCheck] = useState(false);

  const [form_data, setForm_data] = useState({
    "job role": "",
    "offered ctc (lpa)": "",
    "joining date": "",
    "offer type": "Full-Time",
    "message to candidate (optional)": "",
  });

  const handleInputChange = (value, id) => {
    setForm_data((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (error) setError("");
  };

  const handleFileUpLoad = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError("");
    }
  };

  const resetForm = () => {
    setChecked(false);
    setFile(null);
    setError("");
    setCheck(false);
    setForm_data({
      "job role": "",
      "offered ctc (lpa)": "",
      "joining date": "",
      "offer type": "Full-Time",
      "message to candidate (optional)": "",
    });
  };

  const handleReleaseOffer_form_submission = () => {
    const requiredTextFields = [
      "job role",
      "offered ctc (lpa)",
      "joining date",
      "offer type",
    ];
    const emptyField = requiredTextFields.find(
      (key) => !form_data[key] || form_data[key].trim() === "",
    );

    if (emptyField) {
      setError(`Please fill in the ${emptyField} field.`);
      return;
    }

    if (!file) {
      setError("Please upload the offer letter to continue!");
      return;
    }

    if (!checked) {
      setCheck(true);
      setError("Check the checkbox to confirm validity of details!");
      return;
    }

    setError("");
    setCheck(false);
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();

    Object.keys(form_data).forEach((key) => {
      formData.append(key, form_data[key]);
    });

    if (file) {
      formData.append("offer_letter", file);
    }

    try {
      console.log("Submitting FormData...");
      alert("Offer Released Successfully!");
      handleClosing();
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Server error. Please try again.");
    }
  };

  const buttons = ["Cancel", "Release Offer"];

  const handleReleasingOffer = (name) => {
    if (name === "Cancel") {
      resetForm();
      handleClosing();
    } else {
      handleReleaseOffer_form_submission();
    }
  };

  const input_class_style =
    "w-full border border-light py-1 px-2 rounded-small focus:ring-1 focus:ring-blue-400 outline-none";
  const headers_styles = "font-semibold w-full text-sm mb-1";

  return (
    <div
      onClick={() => setIsShow(false)}
      className="w-full h-full flex items-center text-[clamp(0.8em,1vw,1.2em)] text-text_l_b justify-start flex-col bg-white"
    >
      <Header
        candidate_name={candidate.name}
        heading={"Release Offer"}
        handleClosingModal={handleClosing}
      />

      <div className="flex flex-col p-4 items-center justify-start gap-4 w-full overflow-y-auto no-scrollbar max-w-2xl">
        <div className="grid grid-cols-2 gap-4 w-full">
          {["Job Role", "Offered CTC (LPA)", "Joining Date", "Offer Type"].map(
            (label) => {
              const id = label.toLowerCase();
              if (label === "Offer Type") {
                return (
                  <div key={label} className="flex w-full flex-col items-start">
                    <Label class_name={headers_styles} text={label} />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex w-full relative"
                    >
                      <input
                        readOnly
                        value={value}
                        className={`${input_class_style} cursor-pointer`}
                        onClick={() => setIsShow(!isShow)}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Icon
                          icon={
                            isShow
                              ? "ri-arrow-up-s-line"
                              : "ri-arrow-down-s-line"
                          }
                        />
                      </span>
                      {isShow && (
                        <div className="absolute z-50 top-full left-0 w-full mt-1 p-1 rounded-small bg-white border border-lighter shadow-lg">
                          {["Full-Time", "Part-Time", "Freelancer"].map(
                            (type) => (
                              <div
                                key={type}
                                className="px-3 py-1 cursor-pointer hover:bg-gray-100 rounded-sm"
                                onClick={() => {
                                  setValue(type);
                                  setIsShow(false);
                                  handleInputChange(type, "offer type");
                                }}
                              >
                                <Label text={type} />
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return (
                <LabelInput
                  key={label}
                  onchange={handleInputChange}
                  id={id}
                  text={label}
                  value={form_data[id]}
                  label_class_name={headers_styles}
                  input_class_name={input_class_style}
                  type={label === "Joining Date" ? "date" : "text"}
                  placeholder={
                    label === "Job Role" ? "Frontend Developer" : "e.g. 12"
                  }
                />
              );
            },
          )}
        </div>

        <div className="flex w-full flex-col items-start">
          <Label
            text={"Attach Offer Letter (PDF)"}
            class_name={headers_styles}
          />
          <input
            id="upload"
            type="file"
            className="hidden"
            onChange={handleFileUpLoad}
            accept=".pdf,.doc,.docx"
          />
          <label
            htmlFor="upload"
            className={`border-2 p-4 border-light cursor-pointer border-dotted w-full text-center flex flex-col items-center justify-center rounded-small transition-colors ${file ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
          >
            <Icon
              icon="ri-upload-cloud-2-line"
              class_name="text-2xl mb-1 text-gray-400"
            />
            <span className="text-sm font-medium">
              {file ? file.name : "Click to upload offer letter"}
            </span>
          </label>
        </div>

        <OptionalTextArea
          label_class_style={headers_styles}
          input_class_style={`${input_class_style} h-24 resize-none`}
          id="message to candidate (optional)"
          text={"Message to Candidate (optional)"}
          handleInputChange={handleInputChange}
          value={form_data["message to candidate (optional)"]}
          placeholder={"Congratulations! We are pleased to offer you..."}
        />

        <div className="w-full flex flex-col gap-3">
          <div
            className="flex flex-row items-center gap-2 group cursor-pointer"
            onClick={() => {
              const nextChecked = !checked;
              setChecked(nextChecked);
              if (nextChecked) setCheck(false);
            }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {}}
              className="w-4 h-4 cursor-pointer accent-blue-600"
            />
            <Label
              text={"I confirm that all the offer details are correct"}
              class_name="cursor-pointer text-sm"
            />
            {check && (
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="text-red-500"
              >
                <Icon icon="ri-arrow-left-s-line" class_name="font-bold" />
              </motion.span>
            )}
          </div>

          <div className="w-full p-3 rounded-small bg-amber-50 border border-amber-100 flex gap-2 items-start text-amber-800 text-xs">
            <Icon icon="ri-error-warning-line" class_name="mt-0.5" />
            <p>
              Releasing an offer will notify the candidate via email. Please
              verify all details before proceeding.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 bg-red-50 p-2 rounded-small text-sm border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </div>

        <OverlayButtons
          buttons={buttons}
          handleMainButton={handleReleasingOffer}
        />
      </div>
    </div>
  );
}

export default ReleaseOffer;
