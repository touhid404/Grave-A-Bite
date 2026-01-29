import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const customerService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getProfile: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/auth-user-info`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch profile" } };
    }
  },

  updateProfile: async function (profileData: FormData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.API_URL}/auth-user-info`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: profileData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { data: null, error: { message: data.message || "Failed to update profile" } };
      }
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to update profile" } };
    }
  },
};
