import { prisma } from "../../lib/prisma";

const findById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            providerProfile: true
        }
    });
};

const updateProfile = async (id: string, updateData: {
    name?: string;
    phone?: string;
    image?: string;
}) => {
    return await prisma.user.update({
        where: { id },
        data: updateData,
    });
};

const requestBecomeProvider = async (userId: string, data: any) => {
    return await prisma.providerProfile.create({
        data: {
            userId,
            ...data,
            isApproved: false
        }
    });
};

export const AuthService = {
    findById,
    updateProfile,
    requestBecomeProvider
};
