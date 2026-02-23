import React, { useContext, useEffect, useState } from "react";
import { selected_job_id_context } from "../../../../context/SelectedJobContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import Icon from "../../../common/Icon";
import CompanyRequirements from "./CompanyRequirements.jsx";
import { Jobs_context } from "../../../../context/JobsContext.jsx";
import Input from "../../../common/Input.jsx";
import ManageProfile from "../SubmittedCondidates/ManageProfile.jsx";
import ViewProfile from "../SubmittedCondidates/ViewProfile.jsx";
import Label from "../../../common/Label.jsx";
import Button from "../../../common/Button.jsx";
import { motion, AnimatePresence } from "framer-motion";
import CandidatesTabel from "./CandidatesTabel.jsx";
import SearchCandidate from "./SearchCandidate.jsx";
import DeleteComponent from "../common/DeleteComponent.jsx";

function AdminCompanyOverview() {
  const { candidates, deleteCandidate, updateCandidate } =
    useContext(Candidates_context) || {};
  const { selected_job_id } = useContext(selected_job_id_context) || {};
  const { jobs } = useContext(Jobs_context) || {};
  const [viewProfile, setViewProfile] = useState(false);
  const [del_candidate, setDel_candidate] = useState(false);
  const [manageProfile, setManageProfile] = useState(false);

  const job = jobs[selected_job_id];

  const [candidate, setCandidate] = useState({});
  const [cand_index, setCand_index] = useState("");
  const [potentialCandidates, setPotentialCandidates] = useState([]);
  const [search_key, setSearch_key] = useState("");
  const [error, setError] = useState({
    type: "",
    text: "",
  });

  // Filter candidates for this company
  useEffect(() => {
    if (!candidates || !selected_job_id) return;

    const cands = Object.values(candidates).filter(
      (candidate) => candidate["job id"] === selected_job_id,
    );
    if (search_key !== "") {
      const searched_candidates = cands.filter(
        (candidate) =>
          candidate.name
            .toLocaleLowerCase()
            .includes(search_key.toLocaleLowerCase()) ||
          candidate["offer status"]
            .toLocaleLowerCase()
            .includes(search_key.toLocaleLowerCase()) ||
          candidate.experience
            .toLocaleLowerCase()
            .includes(search_key.toLocaleLowerCase()) ||
          String(candidate["current ctc"])
            .toLocaleLowerCase()
            .includes(search_key.toLocaleLowerCase()) ||
          candidate.location
            .toLocaleLowerCase()
            .includes(search_key.toLocaleLowerCase()) ||
          String(candidate["expected ctc"])
            .toLocaleLowerCase()
            .includes(search_key.toLocaleLowerCase()),
      );
      setPotentialCandidates(searched_candidates);
      return;
    }
    setPotentialCandidates(cands);
  }, [candidates, selected_job_id, search_key]);

  const headings = [
    "Name",
    "Status",
    "Location",
    "Experience",
    "Current CTC",
    "Expected CTC",
    "Action",
  ];
  const handle_table_action = (name, candidate) => {
    const cand_i = Object.keys(candidates).find(
      (key) => candidates[key] === candidate,
    );

    switch (name) {
      case "view candidate":
        setViewProfile(true);
        setCandidate(candidate);
        break;
      case "edit candidate":
        setCand_index(cand_i);
        setManageProfile(true);
        setCandidate(candidate);
        break;
      case "delete candidate":
        setCand_index(cand_i);
        setCandidate(candidate);
        setDel_candidate(true);
        break;
    }
  };

  const handleConfirm = () => {
    deleteCandidate(cand_index);
    setError({ type: "success", text: "Candidate Deleted Successfully" });
  };

  return (
    <div className="w-full p-4 h-full flex flex-col items-center justify-start gap-10">
      <div className="w-full flex border-2 rounded-small p-8 bg-highlightBackground border-highLightBorder">
        <CompanyRequirements job={job} />
      </div>
      <SearchCandidate setSearchKey={setSearch_key} />
      <div className="flex flex-col items-start justify-start gap-1 w-full">
        {error.text !== "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
              type: "tween",
            }}
            id="error"
            className="w-full flex items-center justify-center"
          >
            <Label
              text={error.text}
              class_name={`text-sm font-lighter ${error.type === "error" ? "text-red-dark" : "text-text_green"}`}
            />
          </motion.div>
        )}
        <CandidatesTabel
          handle_table_action={handle_table_action}
          potentialCandidates={potentialCandidates}
          headings={headings}
        />
      </div>

      {manageProfile && (
        <ManageProfile
          candidate={candidate}
          setClosing={setManageProfile}
          cand_index={cand_index}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
        />
      )}
      {viewProfile && (
        <ViewProfile setClosing={setViewProfile} candidate={candidate} />
      )}
      {del_candidate && (
        <DeleteComponent
          Close={setDel_candidate}
          item={candidate.name}
          setError={setError}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default AdminCompanyOverview;
