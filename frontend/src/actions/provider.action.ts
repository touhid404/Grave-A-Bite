"use server";

import { providerService } from "@/services/provider.service";
import { revalidateTag } from "next/cache";

export const getMealsAction = async () => {
    return await providerService.getMeals();
};

export const addMealAction = async (mealData: any) => {
    const res = await providerService.addMeal(mealData);
    revalidateTag("meals", "max");
    return res;
};

export const updateMealAction = async (id: string, mealData: any) => {
    const res = await providerService.updateMeal(id, mealData);
    revalidateTag("meals", "max");
    return res;
};

export const deleteMealAction = async (id: string) => {
    const res = await providerService.deleteMeal(id);
    revalidateTag("meals", "max");
    return res;
};

export const getOrdersAction = async () => {
    return await providerService.getOrders();
};

export const getProviderOrderDetailsAction = async (id: string) => {
    return await providerService.getOrderById(id);
};

export const updateOrderStatusAction = async (id: string, status: string) => {
    const res = await providerService.updateOrderStatus(id, status);
    revalidateTag("orders", "max");
    return res;
};

export const getProfileAction = async () => {
    return await providerService.getProfile();
};

export const updateProfileAction = async (profileData: FormData) => {
    const res = await providerService.updateProfile(profileData);
    revalidateTag("profile", "max");
    return res;
};
