import { AUTH_URL, API_URL } from "@/env";
import { cookies } from "next/headers";

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
      const res = await fetch(`${API_URL}/auth-user-info`, {
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
      const res = await fetch(`${API_URL}/auth-user-info`, {
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

  requestBecomeProvider: async function (providerData: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/auth-user-info/request-become-provider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(providerData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Failed to submit request" };
      }
      return { success: true, data: data };
    } catch (err) {
      return { success: false, message: "Failed to submit request" };
    }
  },
};
