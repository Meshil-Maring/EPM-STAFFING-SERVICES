import sql from "../config/db.js";

export const storeOTP = async (
  user_id,
  email,
  otp_hash,
  purpose,
  expires_at,
) => {
  try {
    const result = await sql`
      INSERT INTO otp_verification (
        user_id,
        email,
        otp_hash,
        purpose,
        expires_at
      )
      VALUES (
        ${user_id},
        ${email},
        ${otp_hash},
        ${purpose},
        ${expires_at}
      )
      RETURNING id;
    `;

    return result[0]; // return inserted row id
  } catch (error) {
    console.error("Error storing OTP:", error);
    throw error;
  }
};

// Retrive otp verification data
export const getOtpVerification = async (user_id) => {
  const result =
    await sql`SELECT * FROM otp_verification WHERE user_id=${user_id}`;

  return result[0];
};

//
export const deleteOTP = async (user_id) => {
  const result =
    await sql`DELETE FROM otp_verification WHERE user_id=${user_id} RETURNING id`;

  return result[0];
};
