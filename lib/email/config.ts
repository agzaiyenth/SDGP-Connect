export const emailConfig = {
host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
secure: Number(process.env.SMTP_PORT) === 465, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
