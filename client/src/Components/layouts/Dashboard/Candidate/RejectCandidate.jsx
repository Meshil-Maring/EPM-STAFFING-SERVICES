import React, { useContext, useEffect, useState } from "react";
import Header from "./Common/Header";
import Label from "../../../common/Label";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import TextArea from "../../../common/TextArea";
import Button from "../../../common/Button";
import { Candidates_context } from "../../../../context/CandidatesContext";
import { selected_job_id_context } from "../../../../context/SelectedJobContext";

function RejectCandidate({ handleClosing, candidate }) {
  const { candidates, updateCandidate } = useContext(Candidates_context);
  const { selected_job_id } = useContext(selected_job_id_context);
  const [error, setError] = useState({
    type: "",
    text: "",
  });

  const cand_key = Object.keys(candidates).find(
    (key) => candidates[key] === candidate,
  );

  const [reason, setReason] = useState("");
  const [rejectionForm, setRejectionForm] = useState({
    reason: "",
    note: "",
    message: "",
    confirm: false,
  });

  const handleInputChange = (value, id) => {
    setRejectionForm((prev) => ({ ...prev, [id]: value }));
  };
  const [expand, setExpand] = useState(false);

  const clearError = () => {
    setTimeout(() => {
      setError({ type: "", text: "" });
    }, 2000);
  };
  const handleBtnClick = (name) => {
    if (name.toLocaleLowerCase() === "cancel") {
      handleClosing();
      setRejectionForm({ reason: "", note: "", message: "", confirm: false });
    } else if (name.toLocaleLowerCase() === "reject") {
      if (rejectionForm.confirm === false || rejectionForm.reason === "") {
        setError({
          type: "error",
          text: `⚠ Rejection Reason and confirming details are mandatory fields!!`,
        });
        clearError();
        return;
      }
      setError({ type: "success", text: "Removing Candidate..." });
      const job_keys = Array.isArray(candidate["job id"])
        ? candidate["job id"]
        : [];
      const updated_jobs_ids = job_keys.filter(
        (key) => key !== selected_job_id,
      );
      const newCandidate = { ...candidate, "job id": updated_jobs_ids };
      updateCandidate(cand_key, newCandidate);
      clearError();
      setTimeout(() => {
        handleClosing();
      }, 2000);
    }
  };
  const elements = [
    {
      label: "Rejection Reason *",
      id: "reason",
      placeholder: "Select a reason",
    },
    {
      label: "Internal Note (optional)",
      id: "note",
      placeholder: "Visible only to internal team...",
    },
    {
      label: "Message to Candidate (optional)",
      id: "message",
      placeholder: "Thank you for your time and interest...",
    },
  ];

  const reasons = ["Not Eligible", "Missing Reuirements"];

  return (
    <AnimatePresence>
      <div
        onClick={() => setExpand(false)}
        className="w-full text-sm h-full flex-col items-center justify-start"
      >
        <Header
          heading={"Reject Candidate"}
          candidate_name={candidate.name}
          handleClosingModal={handleClosing}
        />
        <div className="w-full p-4 gap-4 flex-1 flex flex-col items-center justify-start">
          {error.text !== "" && (
            <motion.div
              initial={{ opacity: 0, h: 0, w: 0 }}
              animate={{ opacity: 1, h: "auto", w: "100%" }}
              transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
              className={`rounded-small p-2 w-full flex items-center justify-center ${error.type === "error" ? "text-red-700 bg-red-100" : "bg-gree-100 text-text_green"}`}
            >
              <Label text={error.text} class_name={""} />
            </motion.div>
          )}
          {elements.map((el) => {
            return (
              <div
                key={el.id}
                className="w-full flex flex-col gap-1 items-start justify-start"
              >
                {el.id === "reason" ? (
                  <>
                    <Label text={el.label} class_name={""} />
                    <div
                      onClick={(e) => {
                        (setExpand((prev) => !prev), e.stopPropagation());
                      }}
                      className="relative w-full rounded-small flex border border-lighter"
                    >
                      <Input
                        placeholder={el.placeholder}
                        value={reason}
                        onchange={handleInputChange}
                        id={el.id}
                        read_only={true}
                        class_name={
                          "w-full py-1 pl-2 pr-6 focus:outline-none focus:ring-1 ring-nevy_blue rounded-small"
                        }
                      />
                      <span
                        className={`transition-all absolute top-0 bottom-0 right-2 duration-200 ease-in-out ${expand ? "rotate-180" : ""}`}
                      >
                        <Icon icon={"ri-arrow-down-s-line"} class_name="" />
                      </span>
                      {expand && (
                        <motion.div
                          initial={{ h: 0 }}
                          animate={{ h: "auto" }}
                          transition={{
                            duration: 0.2,
                            type: "tween",
                            ease: "easeInOut",
                          }}
                          className={
                            "absolute text-sm flex-col flex gap-1 text-text top-full p-1 rounded-small bg-b_white right-0 shadow-sm"
                          }
                        >
                          {reasons.map((r) => {
                            return (
                              <div
                                key={r}
                                className="w-full flex hover:bg-lighter cursor-pointer px-2"
                                onClick={() => {
                                  (setReason(r),
                                    setExpand(false),
                                    handleInputChange(r, "reason"));
                                }}
                              >
                                <Label text={r} class_name={""} />
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Label text={el.label} class_name={""} />
                    <TextArea
                      placeholder={el.placeholder}
                      onchange={handleInputChange}
                      class_name="min-h-20 w-full rounded-small border-lighter border p-2 focus:outline-none focus:ring-1 ring-nevy_blue"
                    />
                  </>
                )}
              </div>
            );
          })}
          <div className="w-full p-2 rounded-small text-red-800 bg-red-100">
            <Label
              text={`⚠ This action is irreversible. The candidate will benotifies via email`}
            />
          </div>
          <div className="flex w-full flex-row items-center justify-start gap-1">
            <Input
              type={"checkbox"}
              class_name="mt-1"
              id={"confirm"}
              onchange={handleInputChange}
            />
            <Label
              text={"I confirm that all the details are correct"}
              class_name={"w-full"}
            />
          </div>
          <div className="w-full flex flex-row justify-end gap-4">
            {["Cancel", "Reject"].map((btn) => {
              const isReject = btn === "Reject";
              return (
                <Button
                  text={btn}
                  key={btn}
                  class_name={`border font-semibold border-lighter py-1 px-2 rounded-small ${isReject ? "bg-g_btn text-text_white" : ""}`}
                  onclick={handleBtnClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default RejectCandidate;
