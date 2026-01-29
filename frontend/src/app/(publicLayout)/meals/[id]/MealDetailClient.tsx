
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
        setQuantity(1); // Reset counter after adding
    };

    if (!meal) return null;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group border border-border/50">
                        <Image
                            src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=80"}
                            fill
                            alt={meal.name}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

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
                            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter uppercase italic text-white drop-shadow-2xl">
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
                    <div className="flex flex-col justify-center space-y-8 mx-5">
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
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-primary fill-primary" />
                                    <span className="text-foreground font-black">4.9</span> (120+ Reviews)
                                </div>
                                <div className="w-px h-4 bg-border" />
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

                        <div className="flex flex-col gap-6 pt-6 border-t border-border/50">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total Price</span>
                                    <div className="text-5xl font-black text-primary tracking-tighter">
                                        {formatCurrency(meal.price * quantity)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-card border-2 border-border/50 rounded-2xl p-2 ml-auto">
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
                                className="h-16 rounded-2xl bg-primary text-black text-xl font-black hover:scale-[1.02] transition-transform w-full shadow-xl shadow-primary/20 gap-3"
                                onClick={handleAddToCart}
                                disabled={!meal.isAvailable}
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {meal.isAvailable ? "Add to Cart" : "Unavailable"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <NewsletterFooter />
        </div>
    );
}
