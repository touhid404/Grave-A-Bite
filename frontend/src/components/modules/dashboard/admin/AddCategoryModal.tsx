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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(category?.image || null);
    const [formData, setFormData] = useState({
        name: category?.name || "",
        description: category?.description || ""
    });
    const router = useRouter();

    const isEdit = !!category;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return toast.error("Category name is required");

        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            if (imageFile) {
                data.append("image", imageFile);
            }

            let result;
            if (isEdit && onUpdate) {
                result = await onUpdate(category.id, data);
            } else if (onAdd) {
                result = await onAdd(data);
            }

            const { error } = result || {};
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(isEdit ? "Category updated successfully" : "Category added successfully");
                if (!isEdit) {
                    setFormData({ name: "", description: "" });
                    setImageFile(null);
                    setImagePreview(null);
                }
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
            <SheetContent className="sm:max-w-[425px] rounded-l-3xl border-border/50 bg-card/80 backdrop-blur-2xl p-8 overflow-y-auto">
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
                        {/* Image Preview / Upload Section */}
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Icon</Label>
                            <div className="relative group overflow-hidden rounded-2xl aspect-square bg-muted/50 border-2 border-dashed border-border/50 flex items-center justify-center transition-all hover:border-primary/50">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white font-black text-[10px] uppercase tracking-widest text-center">Change Icon</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Upload Icon</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

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
