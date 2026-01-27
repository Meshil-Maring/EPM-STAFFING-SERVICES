export const emailTemplate = (otp, purpose) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>OTP Verification</title>
</head>

<body style="
  margin:0;
  padding:0;
  width:100%;
  height:100%;
  background-color:#e9efff;
  font-family:Arial, Helvetica, sans-serif;
">

  <!-- Full height wrapper -->
  <table width="100%" height="100%" cellpadding="0" cellspacing="0"
    style="background-color:#e9efff;">
    <tr>
      <td align="center" valign="middle">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0"
          style="
            max-width:500px;
            background:#ffffff;
            border-radius:10px;
            padding:32px;
            box-shadow:0 8px 20px rgba(0,0,0,0.08);
          ">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#222;">Verify Your Email</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="color:#555; font-size:15px; line-height:1.6; text-align:center;">
              <p style="margin:0 0 20px;">
                Use the following One-Time Password (OTP) to <strong>${purpose}</strong>.
              </p>
            </td>
          </tr>

          <!-- OTP -->
          <tr>
            <td align="center" style="padding:24px 0;">
              <div style="
                display:inline-block;
                background:#f1f5ff;
                color:#1a4fff;
                font-size:30px;
                font-weight:bold;
                letter-spacing:6px;
                padding:14px 28px;
                border-radius:8px;
              ">
                ${otp}
              </div>
            </td>
          </tr>

          <!-- Expiry -->
          <tr>
            <td style="color:#777; font-size:14px; text-align:center;">
              This OTP is valid for <strong>5 minutes</strong>.
            </td>
          </tr>

          <!-- Info -->
          <tr>
            <td style="padding-top:20px; color:#888; font-size:13px; text-align:center;">
              If you did not request this, please ignore this email.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px; font-size:12px; color:#aaa;">
              © 2026 EPM Staffing Services. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
};
