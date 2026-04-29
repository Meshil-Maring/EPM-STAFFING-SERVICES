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
