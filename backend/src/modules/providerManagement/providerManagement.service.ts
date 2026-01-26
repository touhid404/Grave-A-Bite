import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../generated/prisma/client";

const addMeal = async (userId: string, mealData: any) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    return await prisma.meal.create({
        data: {
            ...mealData,
            providerId: provider.id,
        },
    });
};

const updateMeal = async (userId: string, mealId: string, mealData: any) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    const meal = await prisma.meal.findUnique({
        where: { id: mealId },
    });

    if (!meal || meal.providerId !== provider.id) {
        throw new Error("Unauthorized or meal not found");
    }

    return await prisma.meal.update({
        where: { id: mealId },
        data: mealData,
    });
};

const deleteMeal = async (userId: string, mealId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    const meal = await prisma.meal.findUnique({
        where: { id: mealId },
    });

    if (!meal || meal.providerId !== provider.id) {
        throw new Error("Unauthorized or meal not found");
    }

    return await prisma.meal.delete({
        where: { id: mealId },
    });
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};

export const ProviderManagementService = {
    addMeal,
    updateMeal,
    deleteMeal,
    updateOrderStatus,
};
