"use server";

import { foodService } from "@/services/food.service";
import { revalidateTag } from "next/cache";

export const getMeals = async (params?: any) => {
  return await foodService.getMeals(params);
};

export const getProviders = async () => {
  return await foodService.getProviders();
};

export const createOrderAction = async (data: any) => {
  const res = await foodService.createOrder(data);
  revalidateTag("orders", "max");
  return res;
};
