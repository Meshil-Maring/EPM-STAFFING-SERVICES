import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CompanyRequirements from "./CompanyRequirements.jsx";
import ManageProfile from "../SubmittedCondidates/ManageProfile.jsx";
import ViewProfile from "../SubmittedCondidates/ViewProfile.jsx";
import CandidatesTabel from "./CandidatesTabel.jsx";
import SearchCandidate from "./SearchCandidate.jsx";
import DeleteComponent from "../common/DeleteComponent.jsx";
import { getCandidateInfo } from "../SubmittedCondidates/end-point-function/submitted_candidates.js";
import { getJobOverviewInfo } from "../../common_function/job_overview.js";
import {
  showError,
  showInfo,
  showSuccess,
} from "../../../../utils/toastUtils.js";
import Label from "../../../common/Label.jsx";

function AdminCompanyOverview() {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);

  // Fetch job data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", job_id],
    queryFn: () => getJobOverviewInfo(job_id, 1),
  });

  const { deleteCandidate, updateCandidate } =
    useContext(Candidates_context) || {};

  const [candidates, setCandidates] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);
  const [del_candidate, setDel_candidate] = useState(false);
  const [manageProfile, setManageProfile] = useState(false);

  const [candidate, setCandidate] = useState({});
  const [cand_index, setCand_index] = useState("");
  const [potentialCandidates, setPotentialCandidates] = useState([]);
  const [search_key, setSearch_key] = useState("");

  // Sync React Query data to local job state safely
  useEffect(() => {
    if (data?.data?.data) {
      setJob(data.data.data);
    }
  }, [data]);

  // Load all candidates on mount
  const LoadCandidates = async () => {
    const cands = await getCandidateInfo(1);
    if (!cands?.success) return showError("Failed to load candidates");
    setCandidates(cands.data);
  };

  useEffect(() => {
    LoadCandidates();
  }, []);

  // Filter and Search Logic
  useEffect(() => {
    if (!candidates || !job_id) return;

    let filtered = candidates.filter(
      (cand) =>
        Array.isArray(cand["job id"]) && cand["job id"].includes(job_id),
    );

    if (search_key.trim() !== "") {
      const lowerKey = search_key.toLowerCase();
      filtered = filtered.filter((cand) =>
        [
          cand.name,
          cand["offer status"],
          cand.experience,
          cand.location,
          String(cand["current ctc"]),
          String(cand["expected ctc"]),
        ].some((field) => String(field).toLowerCase().includes(lowerKey)),
      );
    }
    setPotentialCandidates(filtered);
  }, [candidates, job_id, search_key]);

  // Table action logic for View, Edit, and Delete
  const handle_table_action = (actionType, selectedCand) => {
    // Find index in the original candidates list if needed for context updates
    const originalIndex = candidates.findIndex((c) => c.id === selectedCand.id);
    setCandidate(selectedCand);
    setCand_index(originalIndex);

    switch (actionType) {
      case "view candidate":
        setViewProfile(true);
        break;
      case "edit candidate":
        setManageProfile(true);
        break;
      case "delete candidate":
        setDel_candidate(true);
        break;
      default:
        break;
    }
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteCandidate(cand_index);
      showSuccess("Candidate Deleted Successfully");
      setDel_candidate(false);
    }
  };

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center p-4">
        <Label text="Loading..." class_name="font-bold text-lg" />
      </div>
    );

  if (error) {
    showError("Failed to load job");
    return null;
  }

  const headings = [
    "Name",
    "Status",
    "Location",
    "Experience",
    "Current CTC",
    "Expected CTC",
    "Action",
  ];

  return (
    <div className="w-full p-4 h-full flex flex-col items-center overflow-y-auto no-scrollbar justify-start gap-10">
      {job && (
        <div className="w-full flex border-2 rounded-large p-8 border-highLightBorder/20">
          <CompanyRequirements job={job} />
        </div>
      )}

      <SearchCandidate setSearchKey={setSearch_key} />

      <div className="flex flex-col items-start justify-start gap-1 w-full">
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
          handleConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default AdminCompanyOverview;
