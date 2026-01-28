"use client";

import { useState, useEffect } from "react";
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

interface MealModalProps {
    onAdd?: (data: any) => Promise<any>;
    onUpdate?: (id: string, data: any) => Promise<any>;
    meal?: any;
    categories: any[];
    trigger?: React.ReactNode;
}

export function MealModal({ onAdd, onUpdate, meal, categories, trigger }: MealModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(meal?.image || null);
    const [formData, setFormData] = useState({
        name: meal?.name || "",
        description: meal?.description || "",
        price: meal?.price || "",
        categoryId: meal?.categoryId || "",
        dietary: meal?.dietary?.join(", ") || ""
    });
    const router = useRouter();

    const isEdit = !!meal;

    useEffect(() => {
        if (meal) {
            setFormData({
                name: meal.name,
                description: meal.description || "",
                price: meal.price,
                categoryId: meal.categoryId,
                dietary: meal.dietary?.join(", ") || ""
            });
            setImagePreview(meal.image || null);
        }
    }, [meal]);

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

        if (!formData.name) return toast.error("Meal name is required");
        if (!formData.price) return toast.error("Price is required");
        if (!formData.categoryId) return toast.error("Category is required");

        setLoading(true);
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price.toString());
            data.append("categoryId", formData.categoryId);

            const dietaryArray = formData.dietary ? formData.dietary.split(",").map((s: string) => s.trim()) : [];
            dietaryArray.forEach((tag: string) => data.append("dietary[]", tag));

            if (imageFile) {
                data.append("image", imageFile);
            }

            let result;
            if (isEdit && onUpdate) {
                result = await onUpdate(meal.id, data);
            } else if (onAdd) {
                result = await onAdd(data);
            }

            const { error } = result || {};
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(isEdit ? "Meal updated successfully" : "Meal added successfully");
                if (!isEdit) {
                    setFormData({ name: "", description: "", price: "", categoryId: "", dietary: "" });
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
                        Create Meal
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="sm:max-w-[500px] rounded-l-3xl border-border/50 bg-card/80 backdrop-blur-2xl p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <SheetHeader className="mb-8">
                        <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter">
                            {isEdit ? "REFINE" : "ARCHITECT"} <span className="text-primary not-italic tracking-normal">MEAL</span>
                        </SheetTitle>
                        <SheetDescription className="font-medium text-muted-foreground text-[10px] uppercase tracking-widest">
                            {isEdit ? "Update your culinary creation details." : "Define a new masterpiece for your menu."}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6 flex-1 pr-2">
                        {/* Image Preview / Upload Section */}
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Meal Visual</Label>
                            <div className="relative group overflow-hidden rounded-2xl aspect-video bg-muted/50 border-2 border-dashed border-border/50 flex items-center justify-center transition-all hover:border-primary/50">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white font-black text-[10px] uppercase tracking-widest">Change Image</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select a high-res image</p>
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
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Meal Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Truffle Infused Risotto"
                                className="rounded-xl border-border/50 bg-background/50 focus:ring-primary h-12 font-bold"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="25.00"
                                    className="rounded-xl border-border/50 bg-background/50 focus:ring-primary h-12 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</Label>
                                <select
                                    id="category"
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full rounded-xl border-border/50 bg-background/50 focus:ring-primary h-12 font-bold px-3 text-sm appearance-none outline-none"
                                >
                                    <option value="" disabled className="bg-card">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id} className="bg-card">
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dietary" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Dietary (Comma separated)</Label>
                            <Input
                                id="dietary"
                                value={formData.dietary}
                                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                                placeholder="Vegetarian, Gluten-Free, Spicy"
                                className="rounded-xl border-border/50 bg-background/50 focus:ring-primary h-12 font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the flavors and ingredients..."
                                className="rounded-xl border-border/50 bg-background/50 focus:ring-primary min-h-[100px] font-medium py-4"
                            />
                        </div>
                    </div>

                    <SheetFooter className="mt-8 pt-6 border-t border-border/50">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-tighter h-14 transition-all shadow-xl shadow-black/20"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : isEdit ? "UPDATE MASTERPIECE" : "PUBLISH TO MENU"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
