import { Request, Response } from "express";
import { ProviderManagementService } from "./providerManagement.service";
import { uploadToCloudinary } from "../../lib/cloudinary";

const addMeal = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        let mealData = { ...req.body };

        // Handle image upload if file is present
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/meals");
            mealData.image = uploadResult.url;
        }

        // Sanitize data from FormData
        if (mealData.price) {
            mealData.price = parseFloat(mealData.price);
        }

        if (mealData['dietary[]']) {
            mealData.dietary = Array.isArray(mealData['dietary[]'])
                ? mealData['dietary[]']
                : [mealData['dietary[]']];
            delete mealData['dietary[]'];
        }

        const meal = await ProviderManagementService.addMeal(userId, mealData);
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
        const userId = req.user?.id as string;
        let mealData = { ...req.body };

        // Handle image upload if file is present
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/meals");
            mealData.image = uploadResult.url;
        }

        // Sanitize data from FormData
        if (mealData.price) {
            mealData.price = parseFloat(mealData.price);
        }

        if (mealData['dietary[]']) {
            mealData.dietary = Array.isArray(mealData['dietary[]'])
                ? mealData['dietary[]']
                : [mealData['dietary[]']];
            delete mealData['dietary[]'];
        }

        const meal = await ProviderManagementService.updateMeal(userId, mealId, mealData);
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
        const userId = req.user?.id as string;
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
        // Only check coming inside status or not
        if (!req.body.status) {
            res.status(400).json({
                success: false,
                message: "Status is required",
            });
            return;
        }
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

const getProviderOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const orders = await ProviderManagementService.getProviderOrders(userId);
        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderById = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const orderId = req.params.id as string;
        const order = await ProviderManagementService.getOrderById(userId, orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

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

const getProviderMeals = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const meals = await ProviderManagementService.getProviderMeals(userId);
        res.status(200).json({
            success: true,
            data: meals,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const profile = await ProviderManagementService.getProfile(userId);
        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        let profileData = { ...req.body };

        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/providers");
            profileData.logo = uploadResult.url;
        }

        const profile = await ProviderManagementService.updateProfile(userId, profileData);
        res.status(200).json({
            success: true,
            data: profile,
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
    getProviderOrders,
    getOrderById,
    getProviderMeals,
    getProfile,
    updateProfile,
};
