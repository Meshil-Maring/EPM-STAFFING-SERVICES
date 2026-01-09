import { getAllUsers } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};
