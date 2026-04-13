import React, { useContext, useEffect, useState } from "react";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CompanyRequirements from "./CompanyRequirements.jsx";
import ManageProfile from "../SubmittedCondidates/ManageProfile.jsx";
import ViewProfile from "../SubmittedCondidates/ViewProfile.jsx";
import CandidatesTabel from "./CandidatesTabel.jsx";
import SearchCandidate from "./SearchCandidate.jsx";
import DeleteComponent from "../common/DeleteComponent.jsx";
import { getCandidateInfo } from "../SubmittedCondidates/end-point-function/submitted_candidates.js";

function AdminCompanyOverview() {
  const { deleteCandidate, updateCandidate } =
    useContext(Candidates_context) || {};

  // local state for candidates - to allow filtering without affecting global state
  const [candidates, setCandidates] = useState(null);

  // candidates ->loader function
  const LoadCandidates = async () => {
    const cands = await getCandidateInfo(1);
    if (!cands?.success) return showError("Failed to load candidates");
    console.log(cands.data);
    setCandidates(cands.data);
  };

  // loader useEffect
  useEffect(() => {
    LoadCandidates();
  }, []);

  const [viewProfile, setViewProfile] = useState(false);
  const [del_candidate, setDel_candidate] = useState(false);
  const [manageProfile, setManageProfile] = useState(false);
  const [job, setJob] = useState(null);

  // checking if a job post is currently selected to filter candidates
  const selected_job_id = sessionStorage.getItem("selected_job_id");

  // job loader function
  const loadJob = async (selected_job_id) => {
    const result = getJobById(selected_job_id);
  };

  // load job data if job id exists in storage
  useEffect(() => {
    if (!selected_job_id) return;
    loadJob(selected_job_id);
  }, [job]);

  const [candidate, setCandidate] = useState({});
  const [cand_index, setCand_index] = useState("");
  const [potentialCandidates, setPotentialCandidates] = useState([]);
  const [search_key, setSearch_key] = useState("");

  // Filter candidates for this company
  useEffect(() => {
    if (!candidates || !selected_job_id) return;

    const cands = candidates.filter(
      (candidate) =>
        Array.isArray(candidate["job id"]) &&
        candidate["job id"].includes(selected_job_id),
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
  /*
================================================================================
TABLE ACTION HANDLER
================================================================================
*/

  // const handle_table_action = (name, candidate) => {
  //   const cand_i = candidate?.name
  //     ? Object.keys(candidates).find(
  //         (key) => candidates[key]?.name === candidate.name,
  //       )
  //     : null;

  //   switch (name) {
  //     case "view candidate":
  //       setViewProfile(true);
  //       setCandidate(candidate);
  //       break;
  //     case "edit candidate":
  //       setCand_index(cand_i);
  //       setManageProfile(true);
  //       setCandidate(candidate);
  //       break;
  //     case "delete candidate":
  //       setCand_index(cand_i);
  //       setCandidate(candidate);
  //       setDel_candidate(true);
  //       break;
  //   }
  // };

  /*
  ==========================================
TABLE DELETING CANDIDDATE HANDLER
  ==========================================
  */

  // const handleConfirm = () => {
  //   deleteCandidate(cand_index);
  //   showSuccess("Candidate Deleted Successfully");
  // };

  return (
    <div className="w-full p-4 h-full flex flex-col items-center overflow-y-auto no-scrollbar overflow-x-hidden justify-start gap-10">
      {job && (
        <div className="w-full flex border-2 rounded-small p-8 bg-highlightBackground border-highLightBorder">
          <CompanyRequirements job={job} />
        </div>
      )}
      <SearchCandidate setSearchKey={setSearch_key} />
      <div className="flex flex-col items-start justify-start gap-1 w-full">
        <CandidatesTabel
          // handle_table_action={handle_table_action}
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
        <ViewProfile
          setClosing={setViewProfile}
          candidate={candidate}
          job={job}
        />
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
