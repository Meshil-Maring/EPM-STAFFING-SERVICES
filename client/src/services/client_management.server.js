const API_ROUTES = import.meta.env.VITE_URL;

/*
==============================
          GET
==============================
*/

export const getClientManagementService = async (page) => {
  const res = await fetch(
    `${API_ROUTES}/api/dr/get/client_management_info?page=${page}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();

  return data;
};

/*
==============================
          DELETE
==============================
*/

// unfollow user
export const unfollowClientService = async (followingId, followerId) => {
  const res = await fetch(
    `${API_ROUTES}/api/admin/unfollow/follow_users?followerId=${followerId}&followingId=${followingId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await res.json();

  return data;
};

// remove from listed job
export const removeListService = async (jobId, clientId) => {
  const res = await fetch(
    `${API_ROUTES}/api/admin/remove-list/listed_jobs?jobId=${jobId}&clientId=${clientId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
};
