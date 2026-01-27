import { Router } from "express";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";
import { AuthController } from "./auth.controller";

const router = Router();

// Auth Routes (OK check by postman)
router.get("/", authMiddleware(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.PROVIDER), AuthController.getUserProfileById);

export const AuthRoutes = router;
