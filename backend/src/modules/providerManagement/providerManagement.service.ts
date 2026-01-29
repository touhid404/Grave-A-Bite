import { Meal, OrderStatus, ProviderProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const addMeal = async (userId: string, mealData: Meal) => {
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

const updateMeal = async (userId: string, mealId: string, mealData: Meal) => {
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

const getProviderOrders = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    // Orders that contain meals from this provider
    return await prisma.order.findMany({
        where: {
            orderItems: {
                some: {
                    meal: {
                        providerId: provider.id,
                    },
                },
            },
        },
        include: {
            orderItems: {
                where: {
                    meal: {
                        providerId: provider.id,
                    },
                },
                include: {
                    meal: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};

const getOrderById = async (userId: string, orderId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            orderItems: {
                where: {
                    meal: {
                        providerId: provider.id,
                    },
                },
                include: {
                    meal: true,
                },
            },
        },
    });
};

const getProviderMeals = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) {
        throw new Error("Provider profile not found");
    }

    return await prisma.meal.findMany({
        where: { providerId: provider.id },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });
};

const getProfile = async (userId: string) => {
    return await prisma.providerProfile.findUnique({
        where: { userId },
    });
};

const updateProfile = async (userId: string, profileData: Partial<ProviderProfile>) => {
    return await prisma.providerProfile.update({
        where: { userId },
        data: profileData,
    });
};

export const ProviderManagementService = {
    addMeal,
    updateMeal,
    deleteMeal,
    updateOrderStatus,
    getProviderOrders,
    getOrderById,
    getProviderMeals,
    getProfile,
    updateProfile,
};
