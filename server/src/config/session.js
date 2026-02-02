import dotevn from "dotenv";
dotevn.config();

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
