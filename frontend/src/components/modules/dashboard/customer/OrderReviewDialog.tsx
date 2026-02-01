"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Loader2, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { submitReviewAction } from "@/actions/customer.action";
import Image from "next/image";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

interface OrderReviewDialogProps {
    order: any;
}

interface MealRating {
    rating: number;
    comment: string;
}

export function OrderReviewDialog({ order }: OrderReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [ratings, setRatings] = useState<Record<string, MealRating>>({});
    const [loading, setLoading] = useState(false);
    const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

    const handleRatingChange = (mealId: string, rating: number) => {
        setRatings((prev) => ({
            ...prev,
            [mealId]: {
                ...prev[mealId],
                rating,
            },
        }));
    };

    const handleCommentChange = (mealId: string, comment: string) => {
        setRatings((prev) => ({
            ...prev,
            [mealId]: {
                ...prev[mealId],
                comment,
            },
        }));
    };

    const toggleComment = (mealId: string) => {
        setExpandedComments((prev) => ({
            ...prev,
            [mealId]: !prev[mealId],
        }));
    };

    const handleSubmitAll = async () => {
        const mealsToReview = Object.entries(ratings).filter(([_, data]) => data.rating > 0);

        if (mealsToReview.length === 0) {
            toast.error("Please rate at least one meal");
            return;
        }

        setLoading(true);
        try {
            const results = await Promise.all(
                mealsToReview.map(([mealId, data]) =>
                    submitReviewAction({
                        mealId,
                        rating: data.rating,
                        comment: data.comment,
                        orderId: order.id
                    })
                )
            );

            const errors = results.filter((r) => r.error);
            if (errors.length > 0) {
                toast.error(`Failed to submit ${errors.length} reviews`);
            } else {
                toast.success("All reviews submitted successfully!");
                setOpen(false);
                setRatings({});
            }
        } catch (err) {
            toast.error("Something went wrong during submission");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenuItem
                onSelect={(e: Event) => e.preventDefault()}
                onClick={() => setOpen(true)}
                className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors flex items-center gap-3 font-bold text-xs"
            >
                <Star className="h-4 w-4" />
                Rate Meals
            </DropdownMenuItem>
            <DialogContent className="rounded-3xl border-border/50 bg-card/80 backdrop-blur-2xl shadow-2xl max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                <DialogHeader className="p-8 pb-4">
                    <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">
                        Rate Your <span className="text-primary not-italic">Flavor</span>
                    </DialogTitle>
                    <DialogDescription className="text-xs font-bold uppercase tracking-widest opacity-60">
                        Deployment #{order.id.slice(-8).toUpperCase()} • Feedback Portal
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 scrollbar-hide">
                    {order.orderItems?.map((item: any) => {
                        const mealId = item.mealId;
                        const currentRating = ratings[mealId]?.rating || 0;
                        const isCommentExpanded = expandedComments[mealId];

                        return (
                            <div
                                key={item.id}
                                className="space-y-4 p-5 rounded-2xl bg-muted/20 border border-border/40 group hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="h-14 w-14 rounded-xl overflow-hidden border border-border/50 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                        <Image
                                            src={item.meal?.image || "/placeholder-meal.jpg"}
                                            alt={item.meal?.name || "Meal"}
                                            width={56}
                                            height={56}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-black italic uppercase tracking-tighter text-sm truncate">
                                            {item.meal?.name}
                                        </h4>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => handleRatingChange(mealId, star)}
                                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                                >
                                                    <Star
                                                        className={`h-5 w-5 transition-all duration-300 ${
                                                            currentRating >= star 
                                                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                                                                : "text-muted-foreground/20 hover:text-amber-400/50"
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleComment(mealId)}
                                        className={`rounded-xl transition-all ${
                                            isCommentExpanded ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
                                        }`}
                                    >
                                        <MessageSquareText className="h-4 w-4" />
                                    </Button>
                                </div>

                                {isCommentExpanded && (
                                    <div className="pt-2 animate-in slide-in-from-top-2 duration-300">
                                        <Textarea
                                            placeholder="Transmission detail (optional)..."
                                            value={ratings[mealId]?.comment || ""}
                                            onChange={(e) => handleCommentChange(mealId, e.target.value)}
                                            className="rounded-xl bg-muted/40 border-border/50 font-medium text-xs resize-none min-h-[80px] focus:ring-primary/50"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <DialogFooter className="p-8 pt-4 border-t border-border/20 bg-muted/5">
                    <div className="flex w-full gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 border border-border/50 hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitAll}
                            disabled={loading}
                            className="flex-2 rounded-2xl bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-tighter h-14 transition-all shadow-xl shadow-black/20"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "SUBMIT ALL EVALUATIONS"
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
