
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, ChefHat, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NewsletterFooter from "@/components/modules/homepage/NewsletterFooter";
import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import { toast } from "sonner";
import { cn, formatCurrency } from "@/lib/utils";

interface MealDetailClientProps {
    meal: any;
}

export default function MealDetailClient({ meal }: MealDetailClientProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addItem({
            id: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=80",
            quantity: quantity,
            providerId: meal.providerId,
            providerName: meal.provider?.storeName || "Premium Kitchen",
        });
        setQuantity(1);
    };

    if (!meal) return null;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl group border border-border/50">
                        <Image
                            src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=80"}
                            fill
                            alt={meal.name}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-2">
                            <Badge className="bg-primary/90 text-black border-none px-4 py-1.5 font-bold uppercase tracking-widest text-xs shadow-lg backdrop-blur-md">
                                {meal.category?.name || "Specialty"}
                            </Badge>
                            {meal.dietary?.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="bg-black/60 text-white backdrop-blur-md border border-white/10 px-4 py-1.5 font-bold uppercase tracking-widest text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-3xl md:text-4xl font-black mb-1.5 tracking-tighter uppercase italic text-white drop-shadow-2xl">
                                {meal.name}
                            </h1>
                            <div className="flex items-center gap-2 text-white/90">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="font-bold text-sm uppercase tracking-wide">
                                    {meal.provider?.address || "Available for delivery"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Provider Info Card */}
                        <Link
                            href={`/providers/${meal.providerId}`}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors group/provider"
                        >
                            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/provider:scale-110 transition-transform">
                                <ChefHat className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg uppercase italic tracking-tighter">
                                    {meal.provider?.storeName}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                    {meal.provider?.description || "Verified Provider"}
                                </p>
                            </div>
                            <div className="ml-auto">
                                <Badge variant="outline" className="border-primary/20 text-primary">View Store</Badge>
                            </div>
                        </Link>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium p-4 rounded-2xl border border-border/50 bg-muted/10">
                                {meal.reviews?.length > 0 && (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                            <span className="text-foreground font-black">
                                                {(meal.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / meal.reviews.length).toFixed(1)}
                                            </span> 
                                            ({meal.reviews.length} {meal.reviews.length === 1 ? 'Review' : 'Reviews'})
                                        </div>
                                        <div className="w-px h-4 bg-border" />
                                    </>
                                )}
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    20-30 min
                                </div>
                                <div className="w-px h-4 bg-border" />
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={cn("uppercase text-[10px] tracking-widest font-black", meal.isAvailable ? "border-green-500/50 text-green-500" : "border-destructive/50 text-destructive")}>
                                        {meal.isAvailable ? "Available Now" : "Currently Unavailable"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">Description</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {meal.description || "Indulge in our masterfully crafted signature dish, prepared with the finest locally sourced ingredients and a passion for exceptional flavor."}
                                </p>
                            </div>
                            {meal.category?.description && (
                                <div className="bg-muted/20 p-4 rounded-xl border border-border/50">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Category Info</h4>
                                    <p className="text-sm font-medium">{meal.category.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 pt-6 border-t border-border/50">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex flex-col w-full sm:w-auto">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Price</span>
                                    <div className="text-4xl font-black text-primary tracking-tighter">
                                        {formatCurrency(meal.price * quantity)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-card border-2 border-border/50 rounded-2xl p-1.5 w-full sm:w-auto justify-between sm:justify-start sm:ml-auto">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 rounded-xl hover:bg-muted"
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-5 w-5" />
                                    </Button>
                                    <span className="text-2xl font-black w-12 text-center tabular-nums">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 rounded-xl hover:bg-muted"
                                        onClick={handleIncrement}
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="h-14 rounded-2xl bg-primary text-black text-lg font-black hover:scale-[1.01] transition-transform w-full shadow-xl shadow-primary/20 gap-3"
                                onClick={handleAddToCart}
                                disabled={!meal.isAvailable}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {meal.isAvailable ? "Add to Cart" : "Unavailable"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-24 space-y-12">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Badge variant="outline" className="border-primary/30 text-primary uppercase tracking-[0.2em] px-6 py-2 font-black italic">
                            Customer Feedback
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                            Recent <span className="text-primary underline decoration-primary/30 underline-offset-8">Reviews</span>
                        </h2>
                        <p className="text-muted-foreground max-w-lg">
                            See what our community thinks about this dish. We value every bite and every word.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {meal.reviews?.length > 0 ? (
                            meal.reviews.slice(0, 5).map((review: any) => (
                                <div key={review.id} className="p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1">
                                    {/* Glassmorphism accent */}
                                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                                    
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-sm uppercase">
                                            {review.user?.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm tracking-tight">{review.user?.name || "Anonymous Guest"}</h4>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={cn(
                                                            "h-3 w-3", 
                                                            i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                                            {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm italic leading-relaxed">
                                        "{review.comment || "No comment provided."}"
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 rounded-3xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground">
                                    <Star className="h-8 w-8 opacity-20" />
                                </div>
                                <div>
                                    <p className="font-black uppercase tracking-widest text-muted-foreground/50 italic text-sm">No reviews yet</p>
                                    <p className="text-xs text-muted-foreground/30">Be the first to share your experience!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <NewsletterFooter />
        </div>
    );
}
