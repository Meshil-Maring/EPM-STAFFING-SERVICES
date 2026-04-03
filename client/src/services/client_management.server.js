<<<<<<< HEAD
import { fetchAllUsersInfoService } from "./user.service";

export const getClientManagement = async (page) => {
  const userInfo = await fetchAllUsersInfoService(page);

  userInfo;
=======
const API_ROUTES = import.meta.env.VITE_URL;

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
>>>>>>> 7125c163a6437d966dba5df6986dd92181e3352a
};

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
