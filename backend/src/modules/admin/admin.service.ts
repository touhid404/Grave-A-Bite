import { Category, ProviderProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const getAllCategories = async (userId: string) => {
    return await prisma.category.findMany();
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
            data: {
                ...providerData,
                isApproved: true
            },
        });

        // Update the user's role to PROVIDER
        await tx.user.update({
            where: { id: providerData.userId },
            data: { role: "PROVIDER" },
        });

        return profile;
    });
};

const getProviders = async () => {
    return await prisma.user.findMany({
        where: {
            OR: [
                { role: "PROVIDER" },
                {
                    role: "CUSTOMER",
                    id: {
                        in: (await prisma.providerProfile.findMany({
                            select: { userId: true }
                        })).map(p => p.userId)
                    }
                }
            ]
        },
        include: {
            providerProfile: true,
            sessions: false,
            accounts: false,
        }
    });
};

const approveProvider = async (userId: string) => {
    return await prisma.$transaction(async (tx) => {
        // Update the provider profile to approved
        await tx.providerProfile.update({
            where: { userId },
            data: { isApproved: true },
        });

        // Update the user's role to PROVIDER
        return await tx.user.update({
            where: { id: userId },
            data: { role: "PROVIDER" },
        });
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

const getAdminStats = async () => {
    const [userCount, providerCount, orderCount, pendingApprovals, totalRevenue] = await Promise.all([
        prisma.user.count(),
        prisma.providerProfile.count({ where: { isApproved: true } }),
        prisma.order.count(),
        prisma.providerProfile.count({ where: { isApproved: false } }),
        prisma.order.aggregate({
            where: { status: "DELIVERED" },
            _sum: { totalAmount: true }
        })
    ]);

    return {
        userCount,
        providerCount,
        orderCount,
        pendingApprovals,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
    };
};

export const AdminService = {
    getAllUsers,
    updateUserStatus,
    makeProvider,
    getProviders,
    approveProvider,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllOrders,
    getAllCategories,
    getAdminStats,
};
