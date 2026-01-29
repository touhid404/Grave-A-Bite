"use server";

import { customerService } from "@/services/customer.service";
import { foodService } from "@/services/food.service";
import { revalidateTag } from "next/cache";

export const getCustomerProfileAction = async () => {
    return await customerService.getProfile();
};

export const updateCustomerProfileAction = async (profileData: FormData) => {
    const res = await customerService.updateProfile(profileData);
    revalidateTag("profile", "max");
    return res;
};

export const submitReviewAction = async (reviewData: { mealId: string; rating: number; comment?: string }) => {
    const res = await foodService.submitReview(reviewData);
    revalidateTag("meals", "max");
    return res;
};
