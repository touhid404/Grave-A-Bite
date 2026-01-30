import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/authmiddle";


const getUserProfileById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const userRole = req.user?.role as string;

        let userData = await AuthService.findById(userId) as any;

        if (userRole === UserRole.PROVIDER) {
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

const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const { name, phone } = req.body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;

        const updatedUser = await AuthService.updateProfile(userId, updateData);

        res.status(200).json({
            success: true,
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const requestBecomeProvider = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const result = await AuthService.requestBecomeProvider(userId, req.body);
        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const AuthController = {
    getUserProfileById,
    updateProfile,
    requestBecomeProvider
};