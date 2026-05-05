import {
  getByColumnName,
  insertDataService,
  updateByIdService,
} from "../../../services/dynamic.service";

export const pushNotification = async (
  reference_id, // where to go (id)
  user_id, // user id (id)
  type, // candidate_applied, interview_scheduled, job_post, messages, rejected, offer_released, schedule_interview, cancel_interview (enum)
  title, // Title of the notification (text)
  message, // discription of the notification
  user_type, // client, candidate, admin (enum)
  reference_type, // job, application, candidate (enum)
  user_to = null, // uuid, null
) => {
  const res = await insertDataService("api/dr/insert", "notifications", {
    reference_id,
    user_id,
    type,
    title,
    message,
    user_type,
    reference_type,
    user_to,
  });

  console.log(res);

  return res;
};

export const getClientNotification = async () => {
  const res = await getByColumnName(
    "api/dr/get",
    "notifications",
    "user_type",
    "client",
  );

  return res;
};

export const getAdminNotification = async () => {
  const res = await getByColumnName(
    "api/dr/get",
    "notifications",
    "user_type",
    "admin",
  );

  return res;
};

export const updateNotification = async (notification_id) => {
  const res = await updateByIdService(
    "api/dr/update/id",
    {
      is_read: true,
    },
    "notifications",
    notification_id,
  );

  console.log(res);

  return res;
};
