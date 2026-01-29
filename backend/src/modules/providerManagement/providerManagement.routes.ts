import { Router } from "express";
import { ProviderManagementController } from "./providerManagement.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";
import { upload } from "../../middlewares/upload";

const router = Router();
//  Meals and orders (OK)
router.post("/meals", authMiddleware(UserRole.PROVIDER), upload.single("image"), ProviderManagementController.addMeal);
router.put("/meals/:id", authMiddleware(UserRole.PROVIDER), upload.single("image"), ProviderManagementController.updateMeal);
router.delete("/meals/:id", authMiddleware(UserRole.PROVIDER), ProviderManagementController.deleteMeal);
router.get("/meals", authMiddleware(UserRole.PROVIDER), ProviderManagementController.getProviderMeals);
router.get("/orders", authMiddleware(UserRole.PROVIDER), ProviderManagementController.getProviderOrders);
router.get("/orders/:id", authMiddleware(UserRole.PROVIDER), ProviderManagementController.getOrderById);
router.patch("/orders/:id", authMiddleware(UserRole.PROVIDER), ProviderManagementController.updateOrderStatus);

// Profile Settings
router.get("/profile", authMiddleware(UserRole.PROVIDER), ProviderManagementController.getProfile);
router.put("/profile", authMiddleware(UserRole.PROVIDER), upload.single("logo"), ProviderManagementController.updateProfile);

export const ProviderManagementRoutes = router;
