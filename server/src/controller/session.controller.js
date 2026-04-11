// Check user is login or not
export const checkSession = (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      userId: req.session.userId,
      email: req.session.email,
      role: req.session.role,
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
