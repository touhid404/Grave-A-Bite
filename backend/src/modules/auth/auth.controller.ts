import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { prisma } from "../../lib/prisma";


const getUserProfileById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const userRole = req.user?.role as string;

        let userData = await AuthService.findById(userId) as any;

        if (userRole === "PROVIDER") {
            const providerProfile = await prisma.providerProfile.findUnique({
                where: { userId }
            });
            userData = { ...userData, providerProfile };
        }

        res.status(200).json({
            success: true,
            data: userData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
        });
    }
};

export const AuthController = {
    getUserProfileById
};