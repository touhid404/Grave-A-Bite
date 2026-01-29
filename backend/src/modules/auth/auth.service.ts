import { prisma } from "../../lib/prisma";

const findById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
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

export const AuthService = {
    findById,
    updateProfile
};
