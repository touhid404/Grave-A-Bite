import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Plus, ShoppingBag, Heart, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

interface FoodCardProps {
    meal: any;
}

const FoodCard = ({ meal }: FoodCardProps) => {
    return (
        <Card className="group relative overflow-hidden border border-border/30 bg-card/40 backdrop-blur-xl transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 rounded-[1.75rem] p-0 gap-0">
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] invert" />

            <div className="relative aspect-[1.8/1] w-full overflow-hidden">
                <Image
                    src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"}
                    fill
                    alt={meal.name}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    <div className="px-2 py-0.5 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-lg text-[8px] font-black flex items-center gap-1.5 shadow-2xl uppercase tracking-widest text-primary">
                        <TrendingUp className="h-2 w-2" />
                        Trending
                    </div>
                </div>

                <div className="absolute top-3 right-3 z-20">
                    <button className="p-1.5 bg-background/80 backdrop-blur-xl rounded-lg border border-white/5 shadow-2xl hover:bg-primary hover:text-black transition-all active:scale-90 group/heart">
                        <Heart className="h-3 w-3 transition-transform group-hover/heart:scale-125" />
                    </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-primary text-black rounded-md text-[8px] font-black uppercase tracking-widest shadow-xl">
                        <Star className="h-2 w-2 fill-current" />
                        4.8
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-900/95 text-white backdrop-blur-md rounded-md text-[8px] font-black uppercase tracking-widest border border-white/5 shadow-xl">
                        <Clock className="h-2 w-2 text-primary" />
                        25 MIN
                    </div>
                </div>
            </div>

            <CardContent className="p-4 relative">
                <div className="flex justify-between items-start mb-2">
                    <div className="space-y-0">
                        <p className="text-[7px] font-black text-primary/60 uppercase tracking-[0.4em]">
                            {meal.provider?.storeName || "Premium Kitchen"}
                        </p>
                        <h3 className="font-black text-lg leading-tight group-hover:text-primary transition-colors uppercase italic tracking-tighter">
                            {meal.name}
                        </h3>
                    </div>
                    <div className="text-right">
                        <span className="font-black text-lg text-primary tracking-tighter italic block leading-none">
                            ${meal.price}
                        </span>
                        <span className="text-[6px] font-black uppercase text-muted-foreground tracking-widest opacity-40">Inc. Tax</span>
                    </div>
                </div>

                <p className="text-[10px] text-muted-foreground line-clamp-2 mb-3 font-medium leading-relaxed italic opacity-60">
                    {meal.description || "Indulge in this chef-crafted masterpiece, made with the finest local ingredients."}
                </p>

                {/* Dietary Mosaic */}
                <div className="flex flex-wrap gap-1 mb-1">
                    {["Premium", "Organic"].map((tag) => (
                        <div key={tag} className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded-full border border-white/5">
                            <Sparkles className="h-1.5 w-1.5 text-primary" />
                            <span className="text-[6px] font-black uppercase tracking-widest text-muted-foreground">{tag}</span>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full h-10 rounded-xl bg-zinc-950 border border-white/5 text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-500 font-black text-sm gap-2 shadow-2xl hover:shadow-primary/30 active:scale-95 group/btn overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                    <ShoppingBag className="relative z-10 h-3.5 w-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span className="relative z-10 uppercase italic tracking-tighter">
                        Add to Order
                    </span>
                    <Plus className="relative z-10 h-3.5 w-3.5 opacity-50 group-hover/btn:rotate-90 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default FoodCard;



