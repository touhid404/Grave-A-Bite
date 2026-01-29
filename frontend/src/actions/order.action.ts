
"use server";

import { foodService } from "@/services/food.service";
import { revalidateTag } from "next/cache";

export async function placeOrderAction(orderData: any) {
    try {
        const result = await foodService.createOrder(orderData);

        if (result.error) {
            return { success: false, error: result.error.message };
        }

        revalidateTag("orders", "max");
        return { success: true, data: result.data };
    } catch (error: any) {
        return { success: false, error: "An unexpected error occurred while placing your order." };
    }
}
