import { foodService } from "@/services/food.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MealDetailClient from "./MealDetailClient";

interface MealDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function MealDetailPage({ params }: MealDetailPageProps) {
    const { id } = await params;
    const response = await foodService.getMealById(id);
    const meal = response.data?.data;

    if (!meal) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Meal Not Found</h1>
                    <Button asChild>
                        <Link href="/meals">Back to Menu</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return <MealDetailClient meal={meal} />;
}
