import bcrypt from "bcrypt";

import {
  getAllUsers,
  getUserById,
  createUserDb,
} from "../services/user.service.js";

// Checking user id format is valid or not
const isValidUUID = (id) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id
  );
};

// Retrieve all users data
export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};

// Retrieve single user data
export const getById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
      });
    }

    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// POST : create an users account
export const createUser = async (req, res) => {
  try {
    const { company_name, email, cin, location, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUserDb(
      company_name,
      email,
      cin,
      location,
      phone,
      hashedPassword
    );

    res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
