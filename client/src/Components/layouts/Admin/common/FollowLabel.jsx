import React, { useState } from "react";
import { showError } from "../../../../utils/toastUtils";
import { updateFollowClient } from "../AdminClientManagement/end-point-function/client_management";

function FollowLabel({ class_name, company_id, user_id, company }) {
  // tracking the toggling state for the loading effect
  const [toggling, setToggling] = useState(false);
  // follow status state
  const [follow, setFollow] = useState(() => {
    const followers = company?.followers;
    if (followers.length > 0) {
      return !!followers.find((follower) => follower.follower_id === user_id);
    }
    return false;
  });
  // toggle follow status
  const toggle_follow = async (val) => {
    const changed_status = !val;
    setToggling(true);
    const res = await updateFollowClient(company_id, user_id, changed_status);
    if (!res?.success) {
      console.log(`Follow Error: ${e}`);
      showError(res?.message || "Could not save follow status!");
      return setToggling(false);
    }
    setFollow(changed_status);
    setToggling(false);
  };
  const classes = `px-2 cursor-pointer rounded-small ${class_name} ${!follow ? "bg-g_btn text-text_white" : "border border-lighter"}`;
  return toggling ? (
    <button
      type="button"
      className="bg-indigo-500 w-6 h-6 border overflow-hidden items-center justify-center border-gray-800 rounded-full text-text_white flex"
      disabled
    >
      <svg
        className="m-0.5 size-6 animate-spin bg-b_white w-full h-full"
        viewBox="0 0 24 24"
      >
        -- ... --
      </svg>
    </button>
  ) : (
    <button onClick={() => toggle_follow(follow)} className={classes}>
      {follow ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowLabel;
