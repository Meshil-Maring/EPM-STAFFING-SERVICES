import { getById } from "../util/dbCrud.js";

// Check user is login or not
export const checkSession = async (req, res) => {
  if (req.session.userId) {
    const user = await getById("users", req.session.userId);

    return res.json({
      loggedIn: true,
      userId: user.id,
      email: user.email,
      role: user.role,
    });
  }

  return res.json({
    loggedIn: false,
  });
};

// for back checking auth
export const checkAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const saveSession = (req, user_id, email, role) => {
  req.session.userId = user_id;
  req.session.email = email;
  req.session.role = role;

  return new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
