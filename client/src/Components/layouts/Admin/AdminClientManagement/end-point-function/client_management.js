import {
  getClientManagementService,
  unfollowClientService,
} from "../../../../../services/client_management.server";
import { insertDataService } from "../../../../../services/dynamic.service";

// Before fetching data read in figma first

// Get client info
export const getClientManagementData = async (page = 1) => {
  const data = await getClientManagementService(page);
  return data;
};

// follow and unfollow client
// followed check follower_id or following_id
export const updatefollowClient = async (
  clientId,
  adminId,
  followed = false,
) => {
  const readyData = { follower_id: adminId, following_id: clientId };

  if (followed) {
    const res = await insertDataService(
      // unfollow user
      "api/dr/insert",
      "follow_users",
      readyData,
    );

    return res;
  } else {
    const res = await unfollowClientService(clientId, adminId);

    console.log("unfollow");
    // unfollow user
    // const res = await
  }
};
