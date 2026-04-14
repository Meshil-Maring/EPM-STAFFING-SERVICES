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

  const { updateCandidate } = useContext(Candidates_context) || {};

  const [applications, setApplications] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);
  const [manageProfile, setManageProfile] = useState(false);

  const [candidate, setCandidate] = useState({});
  const [cand_index, setCand_index] = useState("");
  const [potentialCandidates, setPotentialApplication] = useState([]);
  const [search_key, setSearch_key] = useState("");

  // Sync React Query data to local job state safely
  useEffect(() => {
    if (data?.data) {
      const extracted_job = data?.data?.data[0]?.jobs?.[0];
      console.log(data.data.data[0]);
      setJob(extracted_job);
    }
  }, [data]);

  // Load all applications on mount
  const loadApplications = async () => {
    const app = await getJobOverviewInfo(job_id, 1);
    if (!app?.success) return showError("Failed to load applications");
    console.log(app.data.data);
    setApplications(app?.data?.data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // Filter and Search Logic
  useEffect(() => {
    if (!applications || !job_id) return;

    if (!search_key) return setPotentialApplication(applications ?? []);
    const searchKeyLowerCase = search_key.toLowerCase();
    const filtered = applications.filter(
      (application) =>
        application?.candidate?.candidate_name === searchKeyLowerCase ||
        application?.candidate?.gender === searchKeyLowerCase ||
        application?.candidate?.job_type === searchKeyLowerCase ||
        application?.candidate?.location === searchKeyLowerCase ||
        application?.candidate?.email === searchKeyLowerCase ||
        String(application?.candidate?.current_ctc) === searchKeyLowerCase ||
        String(application?.candidate?.expected_ctc) === searchKeyLowerCase,
    );

    setPotentialApplication(filtered);
  }, [applications, job_id, search_key]);

  {
    /*
=============================================================================
TABLE ACTIONS(view more details, edt, delete): RESERVED FOR FUTURE IMPLEMANTATION
=============================================================================
*/
  }

  // Table action logic for View, Edit, and Delete
  // const handle_table_action = (actionType, selectedCand) => {
  //   // Find index in the original applications list if needed for context updates
  //   const originalIndex = applications.findIndex((c) => c.id === selectedCand.id);
  //   setCandidate(selectedCand);
  //   setCand_index(originalIndex);

  //   switch (actionType) {
  //     case "view candidate":
  //       setViewProfile(true);
  //       break;
  //     case "edit candidate":
  //       setManageProfile(true);
  //       break;
  //     case "delete candidate":
  //       setDel_candidate(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleConfirmDelete = () => {
  //   if (deleteCandidate) {
  //     deleteCandidate(cand_index);
  //     showSuccess("Candidate Deleted Successfully");
  //     setDel_candidate(false);
  //   }
  // };

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
    { label: "Name", id: "candidate_name" },
    { label: "Status", id: "active" },
    { label: "Location", id: "location" },
    { label: "Experience", id: "experience" },
    { label: "Current CTC", id: "current_ctc" },
    { label: "Expected CTC", id: "expected_ctc" },
    // {label:"Action", id:"action"},
  ];

  return (
    <div className="w-full p-4 h-full flex flex-col items-center overflow-y-auto no-scrollbar justify-start gap-10">
      {job && (
        <div className="w-full flex border-2 rounded-large p-8 border-highLightBorder/60 bg-highlightBackground/60">
          <CompanyRequirements job={job} />
        </div>
      )}

      <SearchCandidate setSearchKey={setSearch_key} />

      <div className="flex flex-col items-start justify-start gap-1 w-full">
        <CandidatesTabel
          // handle_table_action={handle_table_action}
          potentialApplications={potentialCandidates}
          headings={headings}
        />
      </div>

      {/*
=============================================================================
MANAGE PROFILE, VIEW PROFILE, DELETE CANDIDATE ACTION FROM TABLE: RESERVED FOR FUTURE IMPLEMANTATION
=============================================================================
*/}
      {/* {manageProfile && (
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
      )} */}

      {/* {del_candidate && (
        <DeleteComponent
          Close={setDel_candidate}
          item={candidate.name}
          handleConfirm={handleConfirmDelete}
        />
      )} */}
    </div>
  );
}

export default AdminCompanyOverview;
