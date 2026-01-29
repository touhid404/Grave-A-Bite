
"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, MapPin, ChefHat, ArrowRight, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProviderCardProps {
    provider: any;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
    return (
        <Card className="group relative overflow-hidden border border-border bg-card shadow-sm transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 rounded-[1.75rem] p-0 flex flex-col h-full">
            <Link href={`/providers/${provider.id}`} className="flex flex-col h-full">
                <div className="relative aspect-[1.8/1] w-full overflow-hidden">
                    <Image
                        src={provider.logo || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"}
                        fill
                        alt={provider.storeName}
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-primary text-black">
                                <ChefHat className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-background/20 backdrop-blur-md rounded-md text-[10px] text-white font-black uppercase tracking-widest border border-white/10">
                                <Utensils className="h-3 w-3 text-primary" />
                                {provider.cuisineType || "Mixed Cuisine"}
                            </div>
                        </div>
                        <h3 className="font-black text-2xl text-white uppercase italic tracking-tighter line-clamp-1 drop-shadow-xl">
                            {provider.storeName}
                        </h3>
                    </div>
                </div>

                <CardContent className="p-5 flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <span className="line-clamp-1">{provider.address || "123 Culinary Ave, Food City"}</span>
                    </div>

                    <div className="flex items-center gap-4 py-2 border-t border-b border-border/50">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span className="font-black text-sm">4.8</span>
                        </div>
                        <div className="w-px h-3 bg-border" />
                        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            500+ Orders
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {provider.description || "Experience the finest flavors from our kitchen to your table. Quality ingredients and passion in every dish."}
                    </p>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProviderCard;
