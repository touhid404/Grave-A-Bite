"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Menu, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MealsFilterProps {
    categories: any[];
    searchParams: {
        search?: string;
        category?: string;
        dietary?: string;
        minPrice?: string;
        maxPrice?: string;
    };
}

export default function MealsFilter({ categories, searchParams }: MealsFilterProps) {
    const [showFloating, setShowFloating] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When inline toolbar is NOT intersecting (scrolled out of view), show floating button
                setShowFloating(!entry.isIntersecting);
            },
            { threshold: 0, rootMargin: "-80px 0px 0px 0px" } // Offset for navbar height
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

    const FilterContent = ({ vertical = false }: { vertical?: boolean }) => (
        <div className={cn("flex gap-4", vertical ? "flex-col w-full" : "flex-col lg:flex-row items-center justify-between py-2 w-full")}>

            {/* Categories */}
            <div className={cn("w-full transition-all", vertical ? "" : "lg:w-[70%] overflow-x-auto no-scrollbar mask-linear-fade")}>
                <div className={cn("flex gap-6 px-2", vertical ? "flex-wrap gap-3" : "items-center")}>
                    <Link href="/meals" className={`text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${!searchParams.category || searchParams.category === "All" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        All
                    </Link>
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/meals?category=${cat.name}${searchParams.search ? `&search=${searchParams.search}` : ""}`}
                            className={`text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${searchParams.category === cat.name ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Search & Filter */}
            <div className={cn("flex gap-2", vertical ? "w-full pt-4 border-t border-border/50" : "w-full lg:w-[30%] pl-2")}>
                <div className="relative flex-1 group">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <form action="/meals" method="GET" className="w-full">
                        <Input
                            name="search"
                            placeholder="Search..."
                            defaultValue={searchParams.search}
                            className="pl-8 h-8 rounded-none border-0 border-b border-muted-foreground/20 bg-transparent focus:border-primary px-0 font-medium text-sm w-full focus-visible:ring-0 placeholder:text-muted-foreground/50"
                        />
                        {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
                    </form>
                </div>
                {!vertical && (
                    <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0 hover:bg-transparent hover:text-primary transition-colors">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Inline Toolbar (Observed Target) */}
            <div ref={observerRef} className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/10 mb-8 transition-all duration-300">
                <FilterContent />
            </div>

            {/* Floating Menu Button (Top-Left) */}
            <div className={cn(
                "fixed top-4 left-4 z-50 transition-all duration-500 ease-in-out",
                showFloating ? "translate-y-20 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
            )}>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-12 w-12 rounded-full shadow-2xl bg-black text-white hover:bg-primary hover:text-black transition-all border border-white/10"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetHeader className="mb-8">
                            <SheetTitle className="flex items-center gap-2">
                                <Flame className="h-5 w-5 text-primary" />
                                <span className="text-xl font-black uppercase italic tracking-tighter">Filter Menu</span>
                            </SheetTitle>
                        </SheetHeader>

                        <FilterContent vertical={true} />

                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
