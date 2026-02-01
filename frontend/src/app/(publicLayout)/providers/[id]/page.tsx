import { foodService } from "@/services/food.service";
import FoodCard from "@/components/modules/homepage/foodCard";
import NewsletterFooter from "@/components/modules/homepage/NewsletterFooter";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Utensils, Info } from "lucide-react";
import Image from "next/image";

interface ProviderProfilePageProps {
    params: Promise<{ id: string }>;
}

export default async function ProviderProfilePage({ params }: ProviderProfilePageProps) {
    const { id } = await params;
    const response = await foodService.getProviderById(id);
    const provider = response.data?.data;

    if (!provider) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <h1 className="text-4xl font-black">Provider Not Found</h1>
            </div>
        );
    }

    const providerMeals = provider.meals || [];
    
    // Calculate overall rating from all meals
    const allReviews = providerMeals.flatMap((m: any) => m.reviews || []);
    const averageRating = allReviews.length > 0 
        ? (allReviews.reduce((acc: number, r: any) => acc + r.rating, 0) / allReviews.length).toFixed(1)
        : null;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="relative h-64 md:h-96 w-full">
                <Image
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
                    fill
                    alt="Cover"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative -mt-32 md:-mt-48 z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
                    {/* Logo/Avatar */}
                    <Avatar className="h-32 w-32 md:h-48 md:w-48 border-8 border-background bg-card shadow-2xl">
                        <AvatarImage src={provider.logo} />
                        <AvatarFallback className="bg-primary text-black text-4xl font-black uppercase">
                            {provider.storeName[0]}
                        </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-16">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic drop-shadow-sm">{provider.storeName}</h1>
                            <Badge className="bg-primary text-black px-4 py-1.5 font-black uppercase tracking-widest text-[10px] italic">Verified Provider</Badge>
                        </div>

                        <div className="flex flex-wrap gap-8 text-muted-foreground font-medium text-lg">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-muted rounded-xl">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-bold text-sm tracking-tight">{provider.address}</span>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                {averageRating && (
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-amber-400/10 rounded-xl">
                                            <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-foreground font-black leading-none">{averageRating}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{allReviews.length} Reviews</span>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-2 border-l border-border pl-6">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Utensils className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-foreground font-black leading-none">{provider.orderCount || 0}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Orders Done</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-muted rounded-xl">
                                    <Utensils className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-bold text-sm tracking-tight">{provider.cuisineType || "Mixed Cuisine"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Menu Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <div className="bg-card p-8 rounded-3xl border-2 sticky top-32">
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                                <Info className="h-6 w-6 text-primary" />
                                About Store
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {provider.description || `${provider.storeName} is dedicated to bringing you the finest local dishes, prepared with passion and the highest quality ingredients. Experience the taste of your neighborhood transformed into gourmet delights.`}
                            </p>
                            <div className="space-y-4 pt-6 border-t font-bold">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Opening Hours</span>
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivery Speed</span>
                                    <span className="text-primary">Fast (20-35m)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-4xl font-black mb-8 tracking-tighter uppercase italic">Our <span className="text-primary italic">Menu</span></h2>

                        {providerMeals.length === 0 ? (
                            <div className="bg-card p-12 rounded-3xl border-2 border-dashed text-center">
                                <p className="text-xl text-muted-foreground">This provider hasn't uploaded any meals yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {providerMeals.map((meal: any) => (
                                    <FoodCard key={meal.id} meal={meal} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-24">
                <NewsletterFooter />
            </div>
        </div>
    );
}
