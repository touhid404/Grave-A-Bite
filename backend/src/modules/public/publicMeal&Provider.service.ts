import { prisma } from "../../lib/prisma";

const getAllMeals = async (filters: {
    cuisine?: string;
    dietary?: string;
    minPrice?: string;
    maxPrice?: string;
}) => {
    const { cuisine, dietary, minPrice, maxPrice } = filters;

    const where: any = {
        isAvailable: true,
    };

    if (cuisine) {
        where.category = {
            name: {
                contains: cuisine,
                mode: 'insensitive',
            },
        };
    }

    if (dietary) {
        where.dietary = {
            has: dietary,
        };
    }

    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    return await prisma.meal.findMany({
        where,
        include: {
            provider: true,
            category: true,
        },
    });
};

const getMealById = async (id: string) => {
    return await prisma.meal.findUnique({
        where: { id },
        include: {
            provider: true,
            category: true,
            reviews: true,
        },
    });
};

const getAllProviders = async () => {
    return await prisma.providerProfile.findMany({
        where: { isApproved: true },
    });
};

const getProviderById = async (id: string) => {
    return await prisma.providerProfile.findUnique({
        where: { id },
        include: {
            meals: {
                where: { isAvailable: true },
                include: {
                    category: true,
                },
            },
        },
    });
};

const getAllCategories = async () => {
    return await prisma.category.findMany();
};

export const PublicService = {
    getAllMeals,
    getMealById,
    getAllProviders,
    getProviderById,
    getAllCategories,
};
