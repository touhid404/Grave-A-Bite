"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { MealModal } from "./MealModal";
import { DeleteConfirmationModal } from "../../common/DeleteConfirmationModal";

interface MealListProps {
    meals: any[];
    categories: any[];
    onDelete: (id: string) => Promise<any>;
    onUpdate: (id: string, data: any) => Promise<any>;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop";

export function MealList({ meals, categories, onDelete, onUpdate }: MealListProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        setLoadingId(id);
        try {
            const { error } = await onDelete(id);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Meal removed from menu successfully");
                router.refresh();
            }
        } catch (err) {
            toast.error("An error occurred during removal");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="rounded-2xl border border-border/50 overflow-hidden bg-white/5 backdrop-blur-xl">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Plate</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Identity</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Taxonomy</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Value</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Status</TableHead>
                        <TableHead className="text-right font-black uppercase tracking-tighter text-[10px] py-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meals.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="py-20 text-center text-muted-foreground font-bold italic uppercase tracking-widest opacity-30">
                                Your culinary repertoire is empty.
                            </TableCell>
                        </TableRow>
                    ) : (
                        meals.map((meal) => (
                            <TableRow key={meal.id} className="border-border/40 hover:bg-muted/20 transition-colors">
                                <TableCell className="py-6">
                                    <div className="w-16 h-10 rounded-xl overflow-hidden bg-muted flex items-center justify-center relative border border-border/50 shadow-inner">
                                        <Image
                                            src={meal.image || FALLBACK_IMAGE}
                                            alt={meal.name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                            onError={(e: any) => {
                                                e.target.src = FALLBACK_IMAGE;
                                            }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <div className="flex flex-col">
                                        <span className="font-black uppercase italic tracking-tighter text-sm">{meal.name}</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {meal.dietary?.map((tag: string) => (
                                                <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-primary/70">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Badge variant="outline" className="rounded-full px-4 border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest italic leading-none py-1.5 flex w-fit">
                                        {meal.category?.name || "Uncategorized"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-6">
                                    <span className="font-black italic text-sm tracking-tighter">${meal.price.toFixed(2)}</span>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Badge
                                        className={`rounded-full px-4 text-[10px] font-black uppercase tracking-widest italic shadow-none ${meal.isAvailable
                                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                                            }`}
                                    >
                                        {meal.isAvailable ? "Available" : "Unavailable"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right py-6">
                                    <div className="flex justify-end gap-2">
                                        <MealModal
                                            meal={meal}
                                            categories={categories}
                                            onUpdate={onUpdate}
                                            trigger={
                                                <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-primary/20 hover:text-primary transition-all">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                        <DeleteConfirmationModal
                                            onConfirm={() => handleDelete(meal.id)}
                                            loading={loadingId === meal.id}
                                            title="Remove from Menu?"
                                            description="This will permanently remove this meal from your active repertory. This cannot be undone."
                                            trigger={
                                                <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-destructive/20 hover:text-destructive transition-all">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
