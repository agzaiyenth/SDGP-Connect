import nodemailer from "nodemailer";
import { emailConfig } from "./config";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport(emailConfig);
  await transporter.sendMail({
    from: emailConfig.auth.user,
    to,
    subject,
    html,
  });
}
