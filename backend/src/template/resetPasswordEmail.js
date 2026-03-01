import envFile from "../config/env.js";

export const resetPasswordEmail = (name, email, token) => {
  const resetUrl = `${envFile.FRONTEND_URL || ""}/reset-password?token=${encodeURIComponent(token)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Protection Pools</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Protection Pools
              </h1>
              <p style="margin: 8px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                Password Reset
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #333333; font-size: 22px; font-weight: 600;">
                Hello ${name},
              </h2>
              <p style="margin: 0 0 20px; color: #666666; font-size: 16px;">
                You requested a password reset for your Protection Pools account (${email}). Click the button below to choose a new password. This link will expire in 1 hour.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; color: #888888; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; word-break: break-all;">
                <a href="${resetUrl}" style="color: #dc2626; text-decoration: none;">${resetUrl}</a>
              </p>
              <div style="background-color: #fff5f5; border-left: 4px solid #f56565; padding: 15px; margin: 25px 0 0; border-radius: 4px;">
                <p style="margin: 0; color: #c53030; font-size: 14px;">
                  <strong>Didn't request this?</strong> If you didn't ask to reset your password, you can safely ignore this email. Your password will stay the same.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Protection Pools. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
