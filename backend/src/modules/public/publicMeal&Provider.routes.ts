import { Router } from "express";
import { PublicController } from "./publicMeal&Provider.controller";

const router = Router();
// Public Routes (OK)
router.get("/meals", PublicController.getAllMeals);
router.get("/meals/:id", PublicController.getMealById);
router.get("/providers", PublicController.getAllProviders);
router.get("/providers/:id", PublicController.getProviderById);
router.get("/categories", PublicController.getAllCategories);

export const PublicRoutes = router;
