import { fetchAllUsersInfoService } from "./user.service";

export const getClientManagement = async (page) => {
  const res = await fetch("/api/dr/get/client_management_info?page=1", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return data;
};
