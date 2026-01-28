import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
    getAllUsers: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch users" } };
        }
    },

    updateUserStatus: async function (userId: string, status: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to update user status" } };
        }
    },

    getCategories: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch categories" } };
        }
    },

    addCategory: async function (categoryData: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(categoryData),
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to add category" } };
        }
    },

    updateCategory: async function (id: string, categoryData: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(categoryData),
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to update category" } };
        }
    },

    deleteCategory: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to delete category" } };
        }
    },

    getAllOrders: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/orders`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch all orders" } };
        }
    },
};
