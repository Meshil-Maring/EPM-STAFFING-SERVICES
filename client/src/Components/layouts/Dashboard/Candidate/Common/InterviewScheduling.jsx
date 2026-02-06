import React, { useEffect, useRef, useState } from "react";
import Header from "./Common/Header";
import OptionalTextArea from "./Common/OptionalTextArea";
import OverlayButtons from "./Common/OverlayButtons"; // Reusing the separate component
import InterviewTypeDropdown from "../Common/InterviewTypeDropdown";
import InterviewDateTime from "./InterviewDateTime";
import OnlineType from "./OnlineType";
import OfflineType from "./OfflineType";
import OnCallType from "./OnCallType";

/**
 * Main component for scheduling interviews.
 * Manages complex conditional rendering based on 'interview type'.
 */
function InterviewScheduling({ candidate, handleClosing }) {
  const [value, setValue] = useState("Online");
  const [typeShow, setTypeShow] = useState(false);
  const dropdownRef = useRef();
  const [schedule_data, setSchedule_data] = useState({
    "interview date": "",
    "interview time": "",
    "interview type": "Online",
    "meeting link": "",
    interviewer: "",
    notes: "",
    address: "",
    "phone number": "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isScheduling, setIsScheduling] = useState(false);

  /* Sync type changes to main data object */
  useEffect(() => {
    setSchedule_data((prev) => ({ ...prev, "interview type": value }));
  }, [value]);

  /* Click-outside listener for the custom dropdown */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setTypeShow(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (val, id) =>
    setSchedule_data((prev) => ({ ...prev, [id]: val }));
  const resetTypeSpecificFields = () =>
    setSchedule_data((prev) => ({
      ...prev,
      "meeting link": "",
      address: "",
      "phone number": "",
    }));

  const inputStyle =
    "w-full py-1 px-2 rounded-small border border-light focus:ring-1 ring-light outline-none";

  return (
    <div className="w-full h-full flex flex-col">
      <Header
        candidate_name={candidate.name}
        heading="Schedule Interview"
        handleClosingModal={handleClosing}
      />
      <form
        className="p-4 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <InterviewDateTime
          onInputChange={handleInputChange}
          style={inputStyle}
        />

        <InterviewTypeDropdown
          value={value}
          isOpen={typeShow}
          setIsOpen={setTypeShow}
          onSelect={(type) => {
            setValue(type);
            resetTypeSpecificFields();
          }}
          innerRef={dropdownRef}
          style={inputStyle}
        />

        {value === "Online" && (
          <OnlineType
            handleInputChange={handleInputChange}
            input_class_style={inputStyle}
          />
        )}
        {value === "On Call" && (
          <OnCallType
            handleInputChange={handleInputChange}
            input_class_style={inputStyle}
          />
        )}
        {value === "Offline" && (
          <OfflineType
            handleInputChange={handleInputChange}
            input_class_style={inputStyle}
          />
        )}

        <OptionalTextArea
          id="notes"
          text="Notes (optional)"
          handleInputChange={handleInputChange}
          input_class_style={inputStyle}
        />

        {/* Feedback Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        <OverlayButtons
          buttons={["Cancel", "Schedule"]}
          handleMainButton={(btn) => {
            if (btn === "Cancel") {
              handleClosing();
            } else {
              // Schedule interview
              const requiredFields = [
                "interview date",
                "interview time",
                "interviewer",
              ];
              const missingFields = requiredFields.filter(
                (field) => !schedule_data[field],
              );

              if (missingFields.length > 0) {
                setMessage({
                  type: "error",
                  text: `Please fill in all required fields: ${missingFields.join(", ")}`,
                });
                return;
              }

              setIsScheduling(true);
              setMessage({ type: "info", text: "Scheduling interview..." });

              // Simulate API call
              setTimeout(() => {
                console.log("Interview scheduled:", schedule_data);
                setMessage({
                  type: "success",
                  text: "Interview scheduled successfully!",
                });
                setIsScheduling(false);

                // Close after success
                setTimeout(() => {
                  handleClosing();
                }, 1000);
              }, 1000);
            }
          }}
          isScheduling={isScheduling}
        />
      </form>
    </div>
  );
}

export default InterviewScheduling;
