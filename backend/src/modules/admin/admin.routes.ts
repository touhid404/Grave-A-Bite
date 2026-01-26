import { Router } from "express";
import { AdminController } from "./admin.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";

const router = Router();

router.get("/users", authMiddleware(UserRole.ADMIN), AdminController.getAllUsers);
router.patch("/users/:id", authMiddleware(UserRole.ADMIN), AdminController.updateUserStatus);

// Make Provider Request
router.post("/make-provider/:customerId", authMiddleware(UserRole.ADMIN), AdminController.makeProvider);

// Manage Categories
router.post("/categories", authMiddleware(UserRole.ADMIN), AdminController.addCategory);
router.put("/categories/:id", authMiddleware(UserRole.ADMIN), AdminController.updateCategory);
router.delete("/categories/:id", authMiddleware(UserRole.ADMIN), AdminController.deleteCategory);

export const AdminRoutes = router;
