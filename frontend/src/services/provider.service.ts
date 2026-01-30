import { cookies } from "next/headers";

import { API_URL } from "@/env";

export const providerService = {
    getMeals: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/meals`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch meals" } };
        }
    },

    addMeal: async function (mealData: FormData) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/meals`, {
                method: "POST",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                body: mealData,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to add meal" } };
            }
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to add meal" } };
        }
    },

    updateMeal: async function (id: string, mealData: FormData) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/meals/${id}`, {
                method: "PUT",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                body: mealData,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to update meal" } };
            }
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to update meal" } };
        }
    },

    deleteMeal: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/meals/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to delete meal" } };
            }
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to delete meal" } };
        }
    },

    getOrders: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/orders`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch orders" } };
        }
    },

    getOrderById: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/orders/${id}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to fetch order details" } };
            }
            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch order details" } };
        }
    },

    updateOrderStatus: async function (id: string, status: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to update status" } };
            }
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to update status" } };
        }
    },

    getProfile: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/profile`, {
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
            const res = await fetch(`${API_URL}/provider-management/profile`, {
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

    getStats: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/provider-management/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to fetch stats" } };
            }
            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch stats" } };
        }
    },
};
