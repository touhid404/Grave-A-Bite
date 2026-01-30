"use server";

import { adminService } from "@/services/admin.service";
import { revalidateTag } from "next/cache";

export const getAdminStatsAction = async () => {
    return await adminService.getStats();
};

export const getAllUsersAction = async () => {
    return await adminService.getAllUsers();
};

export const updateUserStatusAction = async (userId: string, status: string) => {
    const res = await adminService.updateUserStatus(userId, status);
    revalidateTag("admin-users","max");
    return res;
};

export const getAllProvidersAction = async () => {
    return await adminService.getAllProviders();
};

export const approveProviderAction = async (userId: string) => {
    const res = await adminService.approveProvider(userId);
    revalidateTag("admin-providers","max");
    revalidateTag("meals","max");
    return res;
};

export const getCategoriesAction = async () => {
    return await adminService.getAllCategories();
};

export const addCategoryAction = async (categoryData: FormData) => {
    const res = await adminService.addCategory(categoryData);
    revalidateTag("admin-categories","max");
    return res;
};

export const updateCategoryAction = async (id: string, categoryData: FormData) => {
    const res = await adminService.updateCategory(id, categoryData);
    revalidateTag("admin-categories","max");
    return res;
};

export const deleteCategoryAction = async (id: string) => {
    const res = await adminService.deleteCategory(id);
    revalidateTag("admin-categories","max");
    return res;
};

export const getAllOrdersAction = async () => {
    return await adminService.getAllOrders();
};
