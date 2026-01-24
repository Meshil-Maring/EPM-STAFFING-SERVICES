import cron from "node-cron";
import sql from "../config/db.js";

cron.schedule("*/1 * * * *", async () => {
  try {
    const result =
      await sql`DELETE FROM otp_verification WHERE expires_at < NOW();`;

    if (result.count > 0) {
      console.log(`Deleted ${result.count} expired OTP(s)`);
    }
  } catch (err) {
    console.log(err);
  }
});
