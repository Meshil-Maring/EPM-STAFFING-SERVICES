import { getByUserIdService } from "../../../../services/dynamic.service";
import { updateUsers } from "../../../../services/user.service";

export const getUserInfo = async (id) => {
  const res = await getByUserIdService("api/dr/get", "user_info", id);

  if (!res.success) return { success: false, message: "user fetched failed" };

  return { success: true, message: "fetched successfully", data: res.data };
};

// update user info
export const updateUser = async (id, email = null, password = null) => {
  const userData = {};

  if (email !== null) {
    userData.email = email;
  }

  if (password !== null) {
    userData.password = password;
  }

  if (Object.keys(userData).length > 0) {
    const user = await updateUsers("api/users/update", "users", id, userData);
    return user;
  }
};
