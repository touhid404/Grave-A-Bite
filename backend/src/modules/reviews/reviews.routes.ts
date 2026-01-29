import { Router } from "express";
import { ReviewsController } from "./reviews.controller";
import authMiddleware, { UserRole } from "../../middlewares/authmiddle";

const router = Router();

router.post("/", authMiddleware(UserRole.CUSTOMER), ReviewsController.createReview);
router.get("/:mealId", ReviewsController.getMealReviews);

export const ReviewRoutes = router;
