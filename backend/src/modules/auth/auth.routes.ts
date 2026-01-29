import { Router } from "express";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";
import { AuthController } from "./auth.controller";

import { upload } from "../../middlewares/upload";

const router = Router();

// Auth Routes (OK check by postman)
router.get("/", authMiddleware(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.PROVIDER), AuthController.getUserProfileById);
router.put("/", authMiddleware(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.PROVIDER), upload.single("image"), AuthController.updateProfile);

export const AuthRoutes = router;
