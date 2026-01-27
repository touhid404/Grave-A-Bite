import { Request, Response } from "express";
import { OrdersService } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const order = await OrdersService.createOrder(userId, req.body);
        res.status(201).json({
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

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const orders = await OrdersService.getUserOrders(userId);
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
        const id = req.params.id as string;
        const order = await OrdersService.getOrderById(userId, id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        // Basic check to ensure user only sees their own orders (unless admin, but simple check first)
        if (order.customerId !== userId && req.user?.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
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

export const OrdersController = {
    createOrder,
    getUserOrders,
    getOrderById,
};
