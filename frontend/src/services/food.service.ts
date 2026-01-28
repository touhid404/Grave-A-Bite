import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetMealsParams {
  category?: string;
  search?: string;
  page?: string;
  limit?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const foodService = {
  getMeals: async function (
    params?: GetMealsParams,
    options?: ServiceOptions
  ) {
    try {
      const url = new URL(`${API_URL}/public/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        cache: options?.cache || "default",
        next: options?.revalidate ? { revalidate: options.revalidate } : { tags: ["meals"] },
      };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch meals" } };
    }
  },

  getMealById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/meals/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch meal details" } };
    }
  },

  getProviders: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        cache: options?.cache || "default",
        next: options?.revalidate ? { revalidate: options.revalidate } : { tags: ["providers"] },
      };
      const res = await fetch(`${API_URL}/public/providers`, config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch providers" } };
    }
  },

  getProviderById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/public/providers/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch provider details" } };
    }
  },

  createOrder: async (orderData: any) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!data.success) {
        return { data: null, error: { message: data.message || "Order creation failed" } };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong during checkout" } };
    }
  },

  getMyOrders: async (options?: ServiceOptions) => {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: options?.cache || "no-store",
        next: options?.revalidate ? { revalidate: options.revalidate } : { tags: ["orders"] },
      };
      const res = await fetch(`${API_URL}/orders/my-orders`, config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch your orders" } };
    }
  },

  getCategories: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        cache: options?.cache || "default",
        next: options?.revalidate ? { revalidate: options.revalidate } : { tags: ["categories"] },
      };
      const res = await fetch(`${API_URL}/public/categories`, config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch categories" } };
    }
  },
};

