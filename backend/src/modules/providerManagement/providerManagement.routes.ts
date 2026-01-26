import { Router } from "express";
import { ProviderManagementController } from "./providerManagement.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";

const router = Router();
//  Meals and orders (OK)
router.post("/meals", authMiddleware(UserRole.PROVIDER), ProviderManagementController.addMeal);
router.put("/meals/:id", authMiddleware(UserRole.PROVIDER), ProviderManagementController.updateMeal);
router.delete("/meals/:id", authMiddleware(UserRole.PROVIDER), ProviderManagementController.deleteMeal);
router.patch("/orders/:id", authMiddleware(UserRole.PROVIDER), ProviderManagementController.updateOrderStatus);

export const ProviderManagementRoutes = router;
