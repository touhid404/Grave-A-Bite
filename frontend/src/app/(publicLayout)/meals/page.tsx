import FoodCard from "@/components/modules/homepage/foodCard";
import { Input } from "@/components/ui/input";
import { foodService } from "@/services/food.service";
import { Search, SlidersHorizontal, Utensils, X, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MealsFilter from "@/components/modules/meals/MealsFilter";
import PaginationControls from "@/components/ui/pagination-controls";

interface MealsPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        page?: string;
        dietary?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
    const params = await searchParams;

    // Fetch meals and categories in parallel for efficiency
    const [mealsRes, categoriesRes] = await Promise.all([
        foodService.getMeals({
            search: params.search,
            category: params.category === "All" ? undefined : params.category,
            dietary: params.dietary,
            minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
            maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
            page: params.page,
            limit: "8",
        }),
        foodService.getCategories()
    ]);

    const meals = mealsRes.data?.data?.data || [];
    const meta = mealsRes.data?.data?.meta || { limit: 8, page: 1, total: 0, totalPages: 0 };
    const categories = categoriesRes.data?.data || [];
    const hasError = mealsRes.error?.message;

    return (
        <div className="min-h-screen pt-24 pb-16 mx-5">
            <div className="container mx-auto px-4">

                {/* Dynamic Filter Component */}
                <MealsFilter categories={categories} searchParams={params} />

                {/* Results Grid */}
                {hasError ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-card/50 backdrop-blur-xl rounded-[40px] border-2 border-dashed border-destructive/20 text-center px-6">
                        <div className="p-4 bg-destructive/10 rounded-full mb-6">
                            <X className="h-10 w-10 text-destructive" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Sync Error</h3>
                        <p className="text-muted-foreground font-medium max-w-sm lowercase">{hasError}</p>
                    </div>
                ) : meals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-card/50 backdrop-blur-xl rounded-[40px] border-2 border-dashed border-zinc-200 text-center px-6">
                        <div className="p-4 bg-zinc-100 rounded-full mb-6 italic font-black text-2xl">
                            Ø
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">No Matches Found</h3>
                        <p className="text-muted-foreground font-medium max-w-sm lowercase">
                            {params.search
                                ? `The culinary architect could not find "${params.search}" in the current matrix.`
                                : "Empty sector. No meals currently available in this frequency."}
                        </p>
                        <Link href="/meals" className="mt-8 underline font-black uppercase text-[10px] tracking-widest">Reset Viewport</Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="h-[2px] w-12 bg-primary"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Viewing {meals.length} exquisite selections
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {meals.map((meal: any, index: number) => (
                                <div
                                    key={meal.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <FoodCard meal={meal} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center pt-10">
                            <PaginationControls meta={meta} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
