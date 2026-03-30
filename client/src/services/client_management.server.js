import { fetchAllUsersInfoService } from "./user.service";

export const getClientManagement = async (page) => {
  const userInfo = await fetchAllUsersInfoService(page);

  console.log(userInfo);
};
