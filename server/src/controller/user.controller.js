import { getAllUsers, getUserById } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};

export const getById = async (req, res) => {
  const id = "26241f50-ea72-4360-a8cd-9edf666b04be";

  const user = await getUserById(id);

  return res.json(user);
};
