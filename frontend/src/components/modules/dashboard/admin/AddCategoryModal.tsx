"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryModalProps {
    onAdd?: (data: any) => Promise<any>;
    onUpdate?: (id: string, data: any) => Promise<any>;
    category?: any;
    trigger?: React.ReactNode;
}

export function CategoryModal({ onAdd, onUpdate, category, trigger }: CategoryModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: category?.name || "",
        description: category?.description || "",
        image: category?.image || ""
    });
    const router = useRouter();

    const isEdit = !!category;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return toast.error("Category name is required");

        setLoading(true);
        try {
            let result;
            if (isEdit && onUpdate) {
                result = await onUpdate(category.id, formData);
            } else if (onAdd) {
                result = await onAdd(formData);
            }

            const { error } = result || {};
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(isEdit ? "Category updated successfully" : "Category added successfully");
                if (!isEdit) setFormData({ name: "", description: "", image: "" });
                setOpen(false);
                router.refresh();
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger || (
                    <Button className="rounded-2xl bg-primary text-black font-black uppercase italic tracking-tighter px-8 hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
                        <Plus className="mr-2 h-5 w-5" />
                        New Category
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px] rounded-l-3xl border-border/50 bg-card/80 backdrop-blur-2xl p-8">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <SheetHeader className="mb-8">
                        <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter">
                            {isEdit ? "EDIT" : "ADD"} <span className="text-primary not-italic tracking-normal">CATEGORY</span>
                        </SheetTitle>
                        <SheetDescription className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
                            {isEdit ? "Modify the existing flavor node." : "Create a new flavor architecture for the platform."}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 flex-1">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Italian Classics"
                                className="rounded-xl border-border/50 bg-background/50 focus:ring-primary h-12 font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Image URL (Optional)</Label>
                            <Input
                                id="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                                className="rounded-xl border-border/50 bg-background/50 focus:ring-primary h-12 font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What defines this category?"
                                className="rounded-xl border-border/50 bg-background/50 focus:ring-primary min-h-[100px] font-medium py-4"
                            />
                        </div>
                    </div>
                    <SheetFooter className="mt-auto pt-10">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-tighter h-14 transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : isEdit ? "UPDATE NODE" : "PUBLISH CATEGORY"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
