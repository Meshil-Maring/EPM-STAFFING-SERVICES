import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

dotenv.config();

const PgStore = connectPgSimple(session);

export const sessionService = () => {
  // ===============================
  // ENV VALIDATION
  // ===============================

  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  console.log("Initializing session service...");

  return session({
    name: "session_id",

    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,

store: new PgStore({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: true,

  ssl: {
    rejectUnauthorized: false,
  },
}),

    cookie: {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",

      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  });
};