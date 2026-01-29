import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"
import config from "../config";
import { getEmailVerificationTemplate } from "../templates/emailVerification";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [config.app_url!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
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
        const verificationUrl = `${config.app_url}/verify-email?token=${token}`
        await transporter.sendMail({
          from: '"GrabABite" <noreply@grab-a-bite.com>',
          to: user.email,
          subject: "Verify your GrabABite account",
          html: getEmailVerificationTemplate(user.name, verificationUrl),
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
      clientId: config.google.client_id as string,
      clientSecret: config.google.client_secret as string,
    },
  },
});
