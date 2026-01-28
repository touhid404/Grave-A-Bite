import { prisma } from "../../lib/prisma";

const getAllMeals = async (filters: {
    category?: string;
    dietary?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    page?: string;
    limit?: string;
}) => {
    const { category, dietary, minPrice, maxPrice, search, page, limit } = filters;

    const where: any = {
        isAvailable: true,
    };

    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (category) {
        where.category = {
            name: {
                contains: category,
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

    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 100;
    const skip = (pageNumber - 1) * limitNumber;

    return await prisma.meal.findMany({
        where,
        include: {
            provider: true,
            category: true,
        },
        skip,
        take: limitNumber,
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
