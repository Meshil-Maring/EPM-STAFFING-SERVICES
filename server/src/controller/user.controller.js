import { getAllUsers, getUserById } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};

export const getUserById = async (req, res) => {
  const id = "0363af8d-eba3-475f-8a6d-8aff69a1a4b9";

  const user = await getAllUsers(id);

  return res.json(user);
};
