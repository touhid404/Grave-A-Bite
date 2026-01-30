import { Router } from "express";
import { AdminController } from "./admin.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";
import { upload } from "../../middlewares/upload";

const router = Router();
// Manage Users (OK)
router.get("/users", authMiddleware(UserRole.ADMIN), AdminController.getAllUsers);
router.patch("/users/:id", authMiddleware(UserRole.ADMIN), AdminController.updateUserStatus);

// Make Provider Request (OK)
router.post("/make-provider/:customerId", authMiddleware(UserRole.ADMIN), AdminController.makeProvider);
router.get("/providers", authMiddleware(UserRole.ADMIN), AdminController.getAllProviders);
router.patch("/approve-provider/:id", authMiddleware(UserRole.ADMIN), AdminController.approveProvider);

// Manage Categories (OK)
router.get("/categories", authMiddleware(UserRole.ADMIN), AdminController.getAllCategories);
router.post("/categories", authMiddleware(UserRole.ADMIN), upload.single("image"), AdminController.addCategory);
router.put("/categories/:id", authMiddleware(UserRole.ADMIN), upload.single("image"), AdminController.updateCategory);
router.delete("/categories/:id", authMiddleware(UserRole.ADMIN), AdminController.deleteCategory);

// View All Orders
router.get("/orders", authMiddleware(UserRole.ADMIN), AdminController.getAllOrders);

// Admin Stats
router.get("/stats", authMiddleware(UserRole.ADMIN), AdminController.getAdminStats);

export const AdminRoutes = router;
