import { Router } from "express";
import { AdminController } from "./admin.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";

const router = Router();
// Manage Users (OK)
router.get("/users", authMiddleware(UserRole.ADMIN), AdminController.getAllUsers);
router.patch("/users/:id", authMiddleware(UserRole.ADMIN), AdminController.updateUserStatus);

// Make Provider Request (OK)
router.post("/make-provider/:customerId", authMiddleware(UserRole.ADMIN), AdminController.makeProvider);

// Manage Categories (OK)
router.post("/categories", authMiddleware(UserRole.ADMIN), AdminController.addCategory);
router.put("/categories/:id", authMiddleware(UserRole.ADMIN), AdminController.updateCategory);
router.delete("/categories/:id", authMiddleware(UserRole.ADMIN), AdminController.deleteCategory);

// View All Orders
router.get("/orders", authMiddleware(UserRole.ADMIN), AdminController.getAllOrders);

export const AdminRoutes = router;
