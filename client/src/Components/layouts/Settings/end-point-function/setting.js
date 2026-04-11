import { getByUserIdService } from "../../../../services/dynamic.service";

export const getClientInfo = async (id) => {
  const res = await getByUserIdService("api/dr/get", "user_info", id);

  console.log(res);
  return data;
};
