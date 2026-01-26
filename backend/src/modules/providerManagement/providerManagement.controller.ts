import { Request, Response } from "express";
import { ProviderManagementService } from "./providerManagement.service";

const addMeal = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const meal = await ProviderManagementService.addMeal(userId, req.body);
        res.status(201).json({
            success: true,
            data: meal,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateMeal = async (req: Request, res: Response) => {
    try {
        const mealId = req.params.id as string;
        const userId = (req as any).user?.id;
        const meal = await ProviderManagementService.updateMeal(userId, mealId, req.body);
        res.status(200).json({
            success: true,
            data: meal,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteMeal = async (req: Request, res: Response) => {
    try {
        const mealId = req.params.id as string;
        const userId = (req as any).user?.id;
        await ProviderManagementService.deleteMeal(userId, mealId);
        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id as string;
        const { status } = req.body;
        const order = await ProviderManagementService.updateOrderStatus(orderId, status);
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const ProviderManagementController = {
    addMeal,
    updateMeal,
    deleteMeal,
    updateOrderStatus,
};
