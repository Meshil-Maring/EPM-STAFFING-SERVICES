import {
  getClientManagementService,
  unfollowClientService,
  removeListService,
} from '../../../api/features/client_management.server';
import { insertDataService } from '../../../api/features/dynamic.service';
import {
  deleteByIdService,
  updateByUserIdService,
} from '../../../shared/utils/server_until/service';

/**
 * Get client management data with pagination
 */
export const getClientManagementData = async (page = 1) => {
  const data = await getClientManagementService(page);
  return data;
};

/**
 * Follow or unfollow a client
 */
export const updateFollowClient = async (clientId, adminId, followed) => {
  if (!clientId || !adminId) {
    throw new Error('clientId and adminId are required');
  }

  if (!followed) {
    const readyData = {
      follower_id: adminId,
      following_id: clientId,
    };

    const res = await insertDataService('api/dr/insert', 'follow_clients', readyData);

    if (res?.success) {
      return { success: true, message: 'Followed Client' };
    }

    return { success: false, message: 'Failed to follow client' };
  }

  const res = await unfollowClientService(clientId, adminId);

  if (res?.success) {
    return { success: true, message: 'Unfollowed client' };
  }

  return { success: false, message: 'Failed to unfollow client' };
};

/**
 * Add or remove job from list
 */
export const updateListJob = async (jobId, clientId, listed = false) => {
  const readyData = { job_id: jobId, client_id: clientId };

  if (!listed) {
    const res = await insertDataService('api/dr/insert', 'listed_jobs', readyData);
    return res;
  } else {
    const res = await removeListService(jobId, clientId);
    return res;
  }
};

/**
 * Delete a client
 */
export const deleteClient = async (clientId) => {
  const res = await deleteByIdService('api/dr/delete/id', 'users', clientId);
  return res;
};

/**
 * Save/update client information
 */
export const saveClients = async (clientData) => {
  const {
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
  } = clientData;

  const company = await updateByUserIdService(
    'api/dr/update/userId',
    {
      company_name: companyName,
      registration_number: cin,
      description: description,
    },
    'company_info',
    clientId
  );

  const address = await updateByUserIdService(
    'api/dr/update/userId',
    { street: street, city: city, state: state, pin_code: pin_code },
    'user_address',
    clientId
  );

  const contact = await updateByUserIdService(
    'api/dr/update/userId',
    {
      email: email,
      phone: phone,
    },
    'user_contacts',
    clientId
  );

  return { company, address, contact };
};
