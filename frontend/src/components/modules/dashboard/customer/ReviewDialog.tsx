"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "../../../ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitReviewAction } from "@/actions/customer.action";

interface ReviewDialogProps {
    mealId: string;
    mealName: string;
}

export function ReviewDialog({ mealId, mealName }: ReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const mounted = useMounted();

    if (!mounted) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setLoading(true);
        try {
            const { error } = await submitReviewAction({
                mealId,
                rating,
                comment,
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Thank you for your review!");
                setOpen(false);
            }
        } catch (err) {
            toast.error("Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="rounded-xl h-8 px-3 text-[10px] font-black uppercase italic tracking-widest hover:bg-primary/20 hover:text-primary transition-all flex gap-2">
                    <Star className="h-3 w-3" />
                    Review
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl border-border/50 bg-card/80 backdrop-blur-2xl shadow-2xl max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
                        Rate <span className="text-primary not-italic">Flavor</span>
                    </DialogTitle>
                    <DialogDescription className="text-xs font-bold uppercase tracking-widest opacity-60">
                        Sharing your experience helps the community detect deliciousness.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-8 space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">{mealName}</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none transition-transform hover:scale-125 duration-300"
                                >
                                    <Star
                                        className={`h-10 w-10 transition-colors ${(hover || rating) >= star ? "fill-primary text-primary" : "text-muted opacity-30"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                            {rating === 5 ? "Life-Changing!" : rating === 4 ? "Delicious!" : rating === 3 ? "Decent" : rating === 2 ? "Could be better" : rating === 1 ? "Not for me" : "Select your rating"}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Detailed Narrative (Optional)</label>
                        <Textarea
                            placeholder="Tell us about the texture, balance, and presentation..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="rounded-2xl bg-muted/30 border-border/50 font-medium min-h-[120px] focus:ring-primary"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-2xl bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-tighter h-14 transition-all shadow-xl shadow-black/20"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "SUBMIT EVALUATION"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
