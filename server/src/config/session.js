import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

dotenv.config();

const PgStore = connectPgSimple(session);

export const sessionService = () => {
  return session({
    name: "session_id",
    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,

    store: new PgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),

    cookie: {
      httpOnly: true,
      secure: false, // ⚠️change in production
      maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
    },
  });
};
