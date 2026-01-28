import { Category, ProviderProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const updateUserStatus = async (userId: string, status: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { status },
    });
};

const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    meal: {
                        include: {
                            provider: true
                        }
                    }
                }
            }
        },
        orderBy: { createdAt: "desc" }
    });
};

// Make Provider By Admin
const makeProvider = async (providerData: ProviderProfile) => {
    return await prisma.$transaction(async (tx) => {
        // Create the provider profile
        const profile = await tx.providerProfile.create({
            data: providerData,
        });

        // Update the user's role to PROVIDER
        await tx.user.update({
            where: { id: providerData.userId },
            data: { role: "PROVIDER" },
        });

        return profile;
    });
};


// Manage Categories
const addCategory = async (categoryData: Category) => {
    return await prisma.category.create({
        data: categoryData,
    });
};

const updateCategory = async (categoryId: string, categoryData: Category) => {
    return await prisma.category.update({
        where: { id: categoryId },
        data: categoryData,
    });
};

const deleteCategory = async (categoryId: string) => {
    return await prisma.category.delete({
        where: { id: categoryId },
    });
};

export const AdminService = {
    getAllUsers,
    updateUserStatus,
    makeProvider,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllOrders,
};
