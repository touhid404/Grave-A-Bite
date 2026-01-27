import { Router } from "express";
import { OrdersController } from "./orders.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";

const router = Router();
// Orders Routes (OK check by postman)
router.post("/", authMiddleware(UserRole.CUSTOMER), OrdersController.createOrder);
router.get("/", authMiddleware(UserRole.CUSTOMER), OrdersController.getUserOrders);
router.get("/:id", authMiddleware(UserRole.CUSTOMER), OrdersController.getOrderById);

export const OrderRoutes = router;
