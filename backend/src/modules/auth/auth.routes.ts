import { Router } from "express";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";
import { AuthController } from "./auth.controller";

import { upload } from "../../middlewares/upload";

const router = Router();

// Auth Routes (OK check by postman)
router.get("/", authMiddleware(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.PROVIDER), AuthController.getUserProfileById);
router.put("/", authMiddleware(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.PROVIDER), AuthController.updateProfile);
router.post("/request-become-provider", authMiddleware(UserRole.CUSTOMER), AuthController.requestBecomeProvider);

export const AuthRoutes = router;
