import { prisma } from "../../lib/prisma";

const createReview = async (userId: string, reviewData: {
    mealId: string;
    rating: number;
    comment?: string;
}) => {
    return await prisma.review.upsert({
        where: {
            mealId_userId: {
                mealId: reviewData.mealId,
                userId: userId,
            },
        },
        update: {
            rating: reviewData.rating,
            comment: reviewData.comment ?? null,
        },
        create: {
            userId: userId,
            mealId: reviewData.mealId,
            rating: reviewData.rating,
            comment: reviewData.comment ?? null,
        },
    });
};

const getMealReviews = async (mealId: string) => {
    return await prisma.review.findMany({
        where: { mealId },
        include: {
            // Normally we'd include user name here, but better-auth user might need a join
            // For now, let's keep it simple
        },
        orderBy: { createdAt: "desc" },
    });
};

export const ReviewsService = {
    createReview,
    getMealReviews,
};
