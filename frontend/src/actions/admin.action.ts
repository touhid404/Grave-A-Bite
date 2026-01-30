"use server";

import { adminService } from "@/services/admin.service";
import { revalidateTag } from "next/cache";

export const getAllUsersAction = async () => {
    return await adminService.getAllUsers();
};

export const getAllProvidersAction = async () => {
    return await adminService.getAllProviders();
};

export const approveProviderAction = async (userId: string) => {
    return await adminService.approveProvider(userId);
};

export const updateUserStatusAction = async (userId: string, status: string) => {
    const res = await adminService.updateUserStatus(userId, status);
    return res;
};

export const getCategoriesAction = async () => {
    return await adminService.getCategories();
};

export const addCategoryAction = async (categoryData: any) => {
    const res = await adminService.addCategory(categoryData);
    revalidateTag("categories", "max");
    return res;
};

export const updateCategoryAction = async (id: string, categoryData: any) => {
    const res = await adminService.updateCategory(id, categoryData);
    revalidateTag("categories", "max");
    return res;
};

export const deleteCategoryAction = async (id: string) => {
    const res = await adminService.deleteCategory(id);
    revalidateTag("categories", "max");
    return res;
};

export const getAllOrdersAction = async () => {
    return await adminService.getAllOrders();
};
