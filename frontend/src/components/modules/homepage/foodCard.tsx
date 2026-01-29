"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Meal } from "@/types";

interface FoodCardProps {
    meal: Meal;
}

const FoodCard = ({ meal }: FoodCardProps) => {
    return (
        <Card className="group relative overflow-hidden border border-border bg-card shadow-sm transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 rounded-[1.75rem] p-0 gap-0">
            <Link href={`/meals/${meal.id}`} className="block h-full">
                <div className="relative aspect-[1.3/1] w-full overflow-hidden">
                    <Image
                        src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"}
                        fill
                        alt={meal.name}
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />

                    <div className="absolute top-3 right-3 z-20">
                        <div className="p-1.5 bg-background/80 backdrop-blur-xl rounded-lg border border-white/5 shadow-2xl text-primary">
                            <Heart className="h-3 w-3" />
                        </div>
                    </div>

                    <div className="absolute bottom-3 left-3 z-20">
                        <div className="flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-xl">
                            <Clock className="h-3 w-3 text-primary" />
                            25 MIN
                        </div>
                    </div>
                </div>

                <CardContent className="p-5 flex flex-col gap-3">
                    <div className="space-y-1">
                        <h3 className="font-black text-xl leading-tight uppercase italic tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">
                            {meal.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                {meal.provider?.storeName || "Premium Kitchen"}
                            </span>
                            <span className="text-[10px]">•</span>
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-primary text-primary" />
                                <span className="text-xs font-bold">4.8</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {(meal.dietary && meal.dietary.length > 0 ? meal.dietary : ["Standerd"]).slice(0, 3).map((tag) => (
                            <div key={tag} className="flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded-full border border-border/50">
                                <Sparkles className="h-2 w-2 text-primary" />
                                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{tag}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <span className="font-black text-xl text-primary tracking-tighter italic">
                            {meal.price} BDT
                        </span>
                    </div>
                </CardContent>
            </Link>
        </Card >
    );
};

export default FoodCard;



