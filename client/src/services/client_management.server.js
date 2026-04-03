import { fetchAllUsersInfoService } from "./user.service";

const API_ROUTES = import.meta.env.VITE_URL;

export const getClientManagementService = async (page) => {
  console.log(API_ROUTES);

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
