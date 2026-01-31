import React, { useEffect, useRef, useState } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import Button from "../../../common/Button";
import Input from "../../../common/Input";
import { motion, AnimatePresence } from "framer-motion";
import OnlineType from "./OnlineType";
import OfflineType from "./OfflineType";
import OnCallType from "./OnCallType";
import Header from "./Common/Header";
import OptionalTextArea from "./OptionalTextArea";

function InterviewScheduling({ candidate, handleClosing }) {
  const [value, setValue] = useState("Online");
  const [error, setError] = useState("");
  const [typeShow, setTypeShow] = useState(false);
  const [schedule_data, setSchedule_data] = useState({
    "interview date": "",
    "interview time": "",
    "interview type": "",
    "meeting link": "",
    interviewer: "",
    notes: "",
    address: "",
    "phone number": "",
  });
  useEffect(() => {
    setSchedule_data((prev) => ({
      ...prev,
      "interview type": value,
    }));
  }, [value]);

  const isOnline = value === "Online";
  const isOnCall = value === "On Call";

  //   reference to the interview type selection
  const InterviewTypeRef = useRef();

  //   clearing the form data on closing
  const clearForm_data = () => {
    setSchedule_data({
      "interview date": "",
      "interview time": "",
      "interview type": "",
      "meeting link": "",
      interviewer: "",
      notes: "",
      address: "",
      "phone number": "",
    });
  };

  //   scheduling form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (schedule_data["phone number"].length < 10) {
      setError("Valid Phone required");
      return;
    }
    setError("");
    console.log(schedule_data);
  };

  const resetForm = () => {
    setSchedule_data((prev) => ({
      ...prev,
      "meeting link": "",
      interviewer: "",
      address: "",
      "phone number": "",
    }));
  };

  //   handling the modal closing
  const handleClosingScheduling = () => {
    handleClosing();
    setTypeShow(false);
    clearForm_data();
  };

  //   controlling when to close the interview type closing
  useEffect(() => {
    const updateType = (e) => {
      const InterviewType = InterviewTypeRef.current;
      if (!InterviewType) return;
      if (InterviewType && !InterviewType.contains(e.target)) {
        setTypeShow(false);
      }
    };
    window.addEventListener("mousedown", updateType);
    return () => window.removeEventListener("mousedown", updateType);
  });

  //   handling the form filling
  const handleInputChange = (value, id) => {
    setSchedule_data((prev) => ({ ...prev, [id]: value }));
  };

  const input_class_style =
    "w-full py-1 px-2 rounded-small border border-light focus:outline-none focus:ring-1 ring-light";

  return (
    <div className="w-full text-[clamp(1.2em, 1.4vw,1.4em)] font-lighter h-full flex flex-col items-center justify-start">
      <Header
        candidate_name={candidate.name}
        heading={"Schedule Interview"}
        handleClosingModal={handleClosing}
      />
      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-2">
        <div className="w-full px-4 gap-4 my-2 flex flex-row items-center justify-center">
          {["Interview Date", "Interview TIme"].map((label) => {
            const isDate = label === "Interview Date";
            return (
              <LabelInput
                key={label}
                onchange={handleInputChange}
                id={label.toLocaleLowerCase()}
                text={label}
                placeholder="mm/dd/yyyy"
                label_class_name=""
                input_class_name={input_class_style}
                type={isDate ? "date" : "time"}
                auto_complete="off"
              />
            );
          })}
        </div>
        <div className="flex flex-col my-2 items-center justify-start gap-4 w-full px-4">
          <div className="w-full flex flex-col items-start justify-start">
            <Label text={"Interview Type"} class_name={""} />
            <div
              ref={InterviewTypeRef}
              onClick={(e) => e.stopPropagation()}
              className="flex relative w-full"
            >
              <Input
                id={"interview type"}
                read_only={true}
                value={value}
                class_name={input_class_style}
              />
              <span
                onClick={() => setTypeShow((prev) => !prev)}
                className="absolute top-0 bottom-0 right-2 font-lighter"
              >
                <Icon
                  icon={
                    typeShow ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                  }
                  class_name=""
                />
              </span>
              {typeShow && (
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "20%" }}
                  className="absolute bg-b_white border p-2 border-lighter shadow-md z-2000 rounded-small gap-2 top-full right-0"
                >
                  {["Online", "Offline", "On Call"].map((type) => {
                    return (
                      <div
                        onClick={() => {
                          setValue(type);
                          setTypeShow(false);
                        }}
                        key={type}
                        className="w-full flex cursor-pointer"
                      >
                        <Label
                          text={type}
                          class_name={
                            "whitespace-nowrap w-full px-1 hover:bg-lighter"
                          }
                        />
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>
          {isOnline ? (
            <OnlineType
              resetForm={resetForm}
              handleInputChange={handleInputChange}
              input_class_style={input_class_style}
            />
          ) : isOnCall ? (
            <OnCallType
              error={error}
              resetForm={resetForm}
              handleInputChange={handleInputChange}
              input_class_style={input_class_style}
            />
          ) : (
            <OfflineType
              error={error}
              resetForm={resetForm}
              handleInputChange={handleInputChange}
              input_class_style={input_class_style}
            />
          )}
        </div>
        <OptionalTextArea
          input_class_style={input_class_style}
          id="notes"
          text={"Notes (optional)"}
          handleInputChange={handleInputChange}
          placeholder={"Any instructions for the candidate..."}
        />
        <div className="w-full p-4 flex flex-row items-center justify-end gap-4">
          {["Cancel", "Schedule"].map((btn) => {
            const isCancel = btn === "Cancel";
            const handleSchedule = () => {
              "";
            };
            const isSchedule = btn === "Schedule";
            const handleBtnClick = (name) => {
              switch (name) {
                case "Cancel":
                  handleClosingScheduling();
                  break;
                case "Schedule":
                  handleSchedule();
              }
            };
            return (
              <Button
                onclick={(btn) => handleBtnClick(btn)}
                key={btn}
                text={btn}
                type={isSchedule ? "submit" : "button"}
                class_name={`rounded-small py-1.5 px-4 ${isCancel ? "border border-border1" : "bg-g_btn text-text_white"}`}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default InterviewScheduling;
