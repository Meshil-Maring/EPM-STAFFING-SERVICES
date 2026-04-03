// Before fetching data read in figma first

import { fetchAllUsersInfoService } from "../../../../../services/user.service";

export const getClientManagementData = async (page = 1) => {
  const users = await fetchAllUsersInfoService(1);
  //   const jobs = await fetchAllJobInfoService(1);

  return { users };
};
