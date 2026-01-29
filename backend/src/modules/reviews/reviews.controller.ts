import { Request, Response } from "express";
import { ReviewsService } from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const review = await ReviewsService.createReview(userId, req.body);
        res.status(201).json({
            success: true,
            data: review,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMealReviews = async (req: Request, res: Response) => {
    try {
        const mealId = req.params.mealId as string;
        const reviews = await ReviewsService.getMealReviews(mealId);
        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const ReviewsController = {
    createReview,
    getMealReviews,
};
