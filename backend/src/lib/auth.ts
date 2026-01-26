import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
        await transporter.sendMail({
          from: '"FoodHub" <noreply@foodhub.com>',
          to: user.email,
          subject: "Verify your FoodHub account",
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); }
    .header { background-color: #0f172a; color: #ffffff; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; font-weight: 800; color: #ffffff; }
    .header span { color: #e11d48; }
    .content { padding: 40px; color: #334155; line-height: 1.8; }
    .content h2 { margin-top: 0; font-size: 22px; color: #0f172a; font-weight: 700; }
    .button-wrapper { text-align: center; margin: 35px 0; }
    .verify-button { background-color: #e11d48; color: #ffffff !important; padding: 16px 32px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; transition: background-color 0.3s ease; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.39); }
    .verify-button:hover { background-color: #be123c; }
    .footer { background-color: #f8fafc; padding: 25px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9; }
    .url-text { font-size: 12px; color: #94a3b8; word-break: break-all; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Food<span>Hub</span></h1>
    </div>
    <div class="content">
      <h2>Almost there!</h2>
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>Thank you for joining FoodHub! To complete your registration and start exploring the best meals in town, please verify your email address by clicking the button below.</p>
      <div class="button-wrapper">
        <a href="${verificationUrl}" class="verify-button">Verify My Account</a>
      </div>
      <p>This link will expire in 24 hours. If you did not create a FoodHub account, you can safely ignore this email.</p>
      <p>Happy Eating,<br /><strong>The FoodHub Team</strong></p>
      <div class="url-text">
        If the button isn't working, copy and paste this link: <br />
        ${verificationUrl}
      </div>
    </div>
    <div class="footer">
      &copy; 2026 FoodHub. All rights reserved. <br />
      Designed for foodies, by foodies.
    </div>
  </div>
</body>
</html>`
        });
        console.log("Premium verification email sent to:", user.email);
      } catch (err) {
        console.error("Failed to send premium verification email:", err);
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
