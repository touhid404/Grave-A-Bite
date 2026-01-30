import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { uploadToCloudinary } from "../../lib/cloudinary";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await AdminService.getAllUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        // Only check coming inside status or not
        if (!req.body.status) {
            res.status(400).json({
                success: false,
                message: "Status is required",
            });
            return;
        }
        const { status } = req.body;
        const user = await AdminService.updateUserStatus(userId, status as string);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Manage Categories
const addCategory = async (req: Request, res: Response) => {
    try {
        let categoryData = req.body;

        // Handle image upload if file is present
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/categories");
            categoryData.image = uploadResult.url;
        }

        const category = await AdminService.addCategory(categoryData);
        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get all categories of this admin
const getAllCategories = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const categories = await AdminService.getAllCategories(userId);
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

const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id as string;
        let categoryData = req.body;

        // Handle image upload if file is present
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer, "foodhub/categories");
            categoryData.image = uploadResult.url;
        }

        const category = await AdminService.updateCategory(categoryId, categoryData);
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id as string;
        await AdminService.deleteCategory(categoryId);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error: any) {
        let message = error.message;
        if (error.code === 'P2003') {
            message = "Cannot delete category because it has associated items (meals). Please delete or move those items first.";
        }
        res.status(500).json({
            success: false,
            message: message,
        });
    }
};


// Make Provider By Admin (OK)
const makeProvider = async (req: Request, res: Response) => {
    try {
        const customerId = req.params.customerId as string;
        const provider = await AdminService.makeProvider({
            userId: customerId,
            ...req.body,
        });
        res.status(201).json({
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

const getAllProviders = async (req: Request, res: Response) => {
    try {
        const providers = await AdminService.getProviders();
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

const approveProvider = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string;
        const user = await AdminService.approveProvider(userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await AdminService.getAllOrders();
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

const getAdminStats = async (req: Request, res: Response) => {
    try {
        const stats = await AdminService.getAdminStats();
        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const AdminController = {
    getAllUsers,
    updateUserStatus,
    makeProvider,
    getAllProviders,
    approveProvider,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllOrders,
    getAllCategories,
    getAdminStats,
};
