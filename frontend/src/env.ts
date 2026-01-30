import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {},

  //   Client Example
  client: {
    NEXT_PUBLIC_CLIENT_URL: z.string(),
    NEXT_PUBLIC_BACKEND_URL: z.url(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
});

export const API_URL = `${env.NEXT_PUBLIC_BACKEND_URL}/api`;
export const AUTH_URL = `${env.NEXT_PUBLIC_BACKEND_URL}/api/auth`;
