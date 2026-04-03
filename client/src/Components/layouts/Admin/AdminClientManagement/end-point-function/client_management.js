import { getClientManagementService } from "../../../../../services/client_management.server";

// Before fetching data read in figma first
getClientManagementService;

export const getClientManagementData = async (page = 1) => {
  const data = await getClientManagementService(page);

  return data;
};
