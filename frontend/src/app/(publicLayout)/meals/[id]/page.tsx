import { foodService } from "@/services/food.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, ChefHat, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NewsletterFooter from "@/components/modules/homepage/NewsletterFooter";

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

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=80"}
                            fill
                            alt={meal.name}
                            className="object-cover"
                        />
                        <div className="absolute top-6 left-6 flex gap-2">
                            {meal.dietary?.map((tag: string) => (
                                <Badge key={tag} className="bg-primary/90 text-black border-none px-4 py-1 font-bold">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">
                        <Link
                            href={`/providers/${meal.providerId}`}
                            className="inline-flex items-center gap-2 text-primary font-bold mb-4 hover:underline"
                        >
                            <ChefHat className="h-5 w-5" />
                            {meal.provider?.storeName || "Premium Kitchen"}
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">
                            {meal.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground font-medium">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-primary fill-primary" />
                                <span className="text-foreground font-black">4.9</span> (120+ Reviews)
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                20-30 min
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                {meal.provider?.address || "Downtown"}
                            </div>
                        </div>

                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            {meal.description || "Indulge in our masterfully crafted signature dish, prepared with the finest locally sourced ingredients and a passion for exceptional flavor."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-card rounded-3xl border-2 mb-10">
                            <div className="text-4xl font-black text-primary">
                                ${meal.price}
                            </div>
                            <div className="h-10 w-[2px] bg-border hidden sm:block" />
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2">
                                    <Minus className="h-5 w-5" />
                                </Button>
                                <span className="text-2xl font-black w-8 text-center">1</span>
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2">
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <Button size="lg" className="h-16 rounded-2xl bg-primary text-black text-xl font-black hover:scale-[1.02] transition-transform w-full sm:w-auto px-12 gap-3">
                            <ShoppingCart className="h-6 w-6" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            <NewsletterFooter />
        </div>
    );
}
