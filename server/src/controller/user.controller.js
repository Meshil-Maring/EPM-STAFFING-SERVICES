import express from "express";
import { getAllUsers, getUserById } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};

export const getById = async (req, res) => {
  const id = req.params.id;

  const user = await getUserById(id);

  return res.json(user);
};
