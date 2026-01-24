import { sendEmail } from "../services/sendEmail.js";

export const sendMailController = async (req, res) => {
  const mail = await sendEmail({
    to: "dsmeshilmaring13@gmail.com",
    subject: "Welcome to My app",
    text: "Hello! This is a test email.",
    html: "<h1>Hello!</h1><p>This is a test email.</p>",
  });

  console.log(mail);
};
