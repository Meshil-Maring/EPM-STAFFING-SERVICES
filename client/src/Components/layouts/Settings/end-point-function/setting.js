import { getByUserIdService } from "../../../../services/dynamic.service";

export const getUserInfo = async (id) => {
  const res = await getByUserIdService("api/dr/get", "user_info", id);

  if (!res.success) return { success: false, message: "user fetched failed" };

  return { success: true, message: "fetched successfully", data: res.data };
};
