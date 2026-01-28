import { Request, Response } from "express";
import { PublicService } from "./publicMeal&Provider.service";

const getAllMeals = async (req: Request, res: Response) => {
    try {
        const filters = req.query as any;
        const meals = await PublicService.getAllMeals(filters);
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

const getMealById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const meal = await PublicService.getMealById(id);
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found",
            });
        }
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

const getAllProviders = async (req: Request, res: Response) => {
    try {
        const providers = await PublicService.getAllProviders();
        res.status(200).json({
            success: true,
            data: providers,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getProviderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const provider = await PublicService.getProviderById(id);
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found",
            });
        }
        res.status(200).json({
            success: true,
            data: provider,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await PublicService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const PublicController = {
    getAllMeals,
    getMealById,
    getAllProviders,
    getProviderById,
    getAllCategories,
};
