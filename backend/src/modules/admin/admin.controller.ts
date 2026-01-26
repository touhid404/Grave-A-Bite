import { Request, Response } from "express";
import { AdminService } from "./admin.service";

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
        const category = await AdminService.addCategory(req.body);
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

const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id as string;
        const category = await AdminService.updateCategory(categoryId, req.body);
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
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};  


// Make Provider By Admin (OK)
const makeProvider = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const customerId = req.params.customerId as string;
        const customerData = {
            userId: customerId,
            ...req.body,
        }
        const provider = await AdminService.makeProvider(customerData);
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

export const AdminController = {
    getAllUsers,
    updateUserStatus,
    makeProvider,
    addCategory,
    updateCategory,
    deleteCategory,
};
