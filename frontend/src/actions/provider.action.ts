"use server";

import { providerService } from "@/services/provider.service";
import { revalidateTag } from "next/cache";

export const getMealsAction = async () => {
    return await providerService.getMeals();
};

export const addMealAction = async (mealData: any) => {
    const res = await providerService.addMeal(mealData);
    revalidateTag("meals","max");
    return res;
};

export const updateMealAction = async (id: string, mealData: any) => {
    const res = await providerService.updateMeal(id, mealData);
    revalidateTag("meals","max");
    return res;
};

export const deleteMealAction = async (id: string) => {
    const res = await providerService.deleteMeal(id);
    revalidateTag("meals","max");
    return res;
};

export const getOrdersAction = async () => {
    return await providerService.getOrders();
};

export const updateOrderStatusAction = async (id: string, status: string) => {
    const res = await providerService.updateOrderStatus(id, status);
    revalidateTag("orders","max");
    return res;
};
