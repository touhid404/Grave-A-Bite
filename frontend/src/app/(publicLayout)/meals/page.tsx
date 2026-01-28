import FoodCard from "@/components/modules/homepage/foodCard";
import { Input } from "@/components/ui/input";
import { foodService } from "@/services/food.service";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealsPageProps {
    searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}

export default async function MealsPage({ searchParams }: MealsPageProps) {
    const params = await searchParams;

    const response = await foodService.getMeals({
        search: params.search,
        category: params.category,
        page: params.page,
        limit: "12",
    });

    const meals = response.data?.data || [];
    const hasError = response.error?.message;

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-black mb-4 tracking-tighter italic">
                            Explore Our <span className="text-primary italic">Menu</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            From gourmet kitchen to your doorstep. Browse local cuisines and discover your next favorite meal.
                        </p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <form>
                                <Input
                                    name="search"
                                    placeholder="Search meals..."
                                    defaultValue={params.search}
                                    className="pl-10 h-12 rounded-xl bg-card border-none focus-visible:ring-primary shadow-sm"
                                />
                            </form>
                        </div>
                        <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-2">
                            <SlidersHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Categories (Placeholder for now) */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {["All", "Burgers", "Pizza", "Sushi", "Desserts", "Healthy"].map((cat) => (
                        <Button
                            key={cat}
                            variant={params.category === cat ? "default" : "secondary"}
                            className="rounded-full px-6 font-bold"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Results */}
                {hasError ? (
                    <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-destructive/20">
                        <p className="text-destructive text-xl font-bold">{hasError}</p>
                    </div>
                ) : meals.length === 0 ? (
                    <div className="text-center py-24 bg-card rounded-3xl border border-dashed border-zinc-200">
                        <p className="text-2xl font-black mb-2 tracking-tight">No meals found</p>
                        <p className="text-muted-foreground">
                            {params.search
                                ? `We couldn't find anything matching "${params.search}".`
                                : "There are no meals available in this category yet."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                )}
            </div>
        </div>
    );
}
