import { Router } from "express";
import { UploadController } from "./upload.controller";
import { upload } from "../../middlewares/upload";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";

const router = Router();

// Upload image - requires authentication (Provider or Admin)
router.post(
    "/image",
    authMiddleware(UserRole.PROVIDER, UserRole.ADMIN),
    upload.single("image"),
    UploadController.uploadImage
);

export const UploadRoutes = router;
