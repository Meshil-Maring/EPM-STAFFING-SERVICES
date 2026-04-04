import {
  getClientManagementService,
  unfollowClientService,
  removeListService,
} from "../../../../../services/client_management.server";
import { insertDataService } from "../../../../../services/dynamic.service";
import {
  deleteByIdService,
  updateByIdService,
  updateByUserIdService,
} from "../../../../../utils/server_until/service";

// Before fetching data read in figma first

// Get client info => #Admin@1
export const getClientManagementData = async (page = 1) => {
  const data = await getClientManagementService(page);
  return data;
};

// follow and unfollow client => #Admin@2
// followed check follower_id or following_id
export const updatefollowClient = async (
  clientId,
  adminId,
  followed = false,
) => {
  const readyData = { follower_id: adminId, following_id: clientId };

  // user not follow
  if (!followed) {
    const res = await insertDataService(
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

// add list or remove list ==> #Admin@3
// TODO: before call this function check job (fk user_id) = user_id (clientId same as user_id, in our data will get user_id use that id for clientId);

export const updateListJob = async (jobId, clientId, listed = false) => {
  const readyData = { job_id: jobId, client_id: clientId };

  // job is not listed
  if (!listed) {
    const res = await insertDataService(
      // unfollow user
      "api/dr/insert",
      "listed_jobs",
      readyData,
    );

    return res;
  } else {
    const res = await removeListService(jobId, clientId);

    return res;
  }
};

// delete client ==> #Admin@4
export const deleteClient = async (jobId) => {
  const res = await deleteByIdService("api/dr/delete/id", "users", jobId);

  return res;
};

// save client info ==> #Admin@5
export const saveCandidates = async (
  clientId,
  companyName,
  description,
  cin,
  email,
  phone,
  street,
  city,
  state,
  pin_code,
) => {
  const company = await updateByUserIdService(
    "api/dr/update/userId",
    {
      company_name: companyName,
      registration_number: cin,
      description: description,
    },
    "company_info",
    clientId,
  );

  const address = await updateByUserIdService(
    "api/dr/update/userId",
    { street: street, city: city, state: state, pin_code: pin_code },
    "user_address",
    clientId,
  );

  const contact = await updateByUserIdService(
    "api/dr/update/userId",
    {
      email: email,
      phone: phone,
    },
    "user_contacts",
    clientId,
  );

  return { company, address, contact };
};
