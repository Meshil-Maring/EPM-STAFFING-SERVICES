import {
  getByColumnName,
  insertDataService,
  updateByIdService,
} from "../../../services/dynamic.service";

export const pushNotification = async (
  reference_id,
  user_id,
  type,
  title,
  message,
  user_type,
  reference_type,
) => {
  const res = await insertDataService("api/dr/insert", "notifications", {
    reference_id,
    user_id,
    type,
    title,
    message,
    user_type,
    reference_type,
  });

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
