import { prisma } from "../../lib/prisma";

const findById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const AuthService = {
    findById
};
