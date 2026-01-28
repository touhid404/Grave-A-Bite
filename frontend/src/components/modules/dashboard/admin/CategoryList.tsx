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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, ImageIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CategoryModal } from "./AddCategoryModal";

interface CategoryListProps {
    categories: any[];
    onDelete: (id: string) => Promise<any>;
    onUpdate: (id: string, data: any) => Promise<any>;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop";

export function CategoryList({ categories, onDelete, onUpdate }: CategoryListProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category? This might affect existing meals.")) return;

        setLoadingId(id);
        try {
            const { error } = await onDelete(id);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Category deleted successfully");
                router.refresh();
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="rounded-2xl border border-border/50 overflow-hidden bg-white/5 backdrop-blur-xl">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Image</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Name</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Description</TableHead>
                        <TableHead className="text-right font-black uppercase tracking-tighter text-[10px] py-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="py-20 text-center text-muted-foreground font-bold italic uppercase tracking-widest opacity-30">
                                No categories architected yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id} className="border-border/40 hover:bg-muted/20 transition-colors">
                                <TableCell className="py-6">
                                    <div className="w-16 h-10 rounded-xl overflow-hidden bg-muted flex items-center justify-center relative border border-border/50 shadow-inner">
                                        <Image
                                            src={category.image || FALLBACK_IMAGE}
                                            alt={category.name}
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
                                    <span className="font-black uppercase italic tracking-tighter text-sm">{category.name}</span>
                                </TableCell>
                                <TableCell className="py-6 font-medium text-xs text-muted-foreground max-w-md truncate">
                                    {category.description || "No description provided."}
                                </TableCell>
                                <TableCell className="text-right py-6">
                                    <div className="flex justify-end gap-2">
                                        <CategoryModal
                                            category={category}
                                            onUpdate={onUpdate}
                                            trigger={
                                                <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-primary/20 hover:text-primary transition-all">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-primary/20 hover:text-primary transition-all">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50 bg-card/80 backdrop-blur-2xl p-2">
                                                <DropdownMenuLabel className="font-black uppercase tracking-tighter text-[10px] text-muted-foreground px-4 py-3">Category Controls</DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-border/50 mx-2" />
                                                <DropdownMenuItem
                                                    className="rounded-xl px-4 py-3 focus:bg-destructive/10 focus:text-destructive cursor-pointer transition-colors"
                                                    onClick={() => handleDelete(category.id)}
                                                    disabled={loadingId === category.id}
                                                >
                                                    <div className="flex items-center gap-3 font-bold text-xs">
                                                        <Trash2 className="h-4 w-4" />
                                                        DELETE PERMANENTLY
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
