import { cookies } from "next/headers";
import { API_URL } from "@/env";

export const adminService = {
    getStats: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/stats`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return { data: null, error: { message: data.message || "Failed to fetch admin stats" } };
            }
            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch admin stats" } };
        }
    },

    getAllUsers: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: { Cookie: cookieStore.toString() },
                cache: "no-store",
            });
            const data = await res.json();
            return { data, error: null };
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
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to update user status" } };
        }
    },

    getAllProviders: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/providers`, {
                headers: { Cookie: cookieStore.toString() },
                cache: "no-store",
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch providers" } };
        }
    },

    approveProvider: async function (userId: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/approve-provider/${userId}`, {
                method: "PATCH",
                headers: { Cookie: cookieStore.toString() },
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to approve provider" } };
        }
    },

    getAllCategories: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories`, {
                headers: { Cookie: cookieStore.toString() },
                cache: "no-store",
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch categories" } };
        }
    },

    addCategory: async function (categoryData: FormData) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories`, {
                method: "POST",
                headers: { Cookie: cookieStore.toString() },
                body: categoryData,
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to add category" } };
        }
    },

    updateCategory: async function (id: string, categoryData: FormData) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories/${id}`, {
                method: "PUT",
                headers: { Cookie: cookieStore.toString() },
                body: categoryData,
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to update category" } };
        }
    },

    deleteCategory: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/categories/${id}`, {
                method: "DELETE",
                headers: { Cookie: cookieStore.toString() },
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to delete category" } };
        }
    },

    getAllOrders: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/orders`, {
                headers: { Cookie: cookieStore.toString() },
                cache: "no-store",
            });
            const data = await res.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Failed to fetch orders" } };
        }
    },
};
