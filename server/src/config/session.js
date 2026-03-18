/**
 * Session configuration module
 *
 * Configures Express session middleware for user authentication and state management.
 * This module sets up session options including security settings, cookie configuration,
 * and session storage parameters.
 */

import dotevn from "dotenv";
dotevn.config();

/**
 * Session service configuration function
 *
 * @returns {Object} Express session configuration object
 */
export const sessionService = () => {
  session({
    name: "session_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httOnly: true,
      secure: false,
      maxAge: 2000 * 60 * 60,
    },
  });
};
