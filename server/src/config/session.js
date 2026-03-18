import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

/**
 * Session service configuration function
 *
 * @returns {Object} Express session configuration object
 */
export const sessionService = () => {
  return session({
    name: "session_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2000 * 60 * 60,
    },
  });
};
