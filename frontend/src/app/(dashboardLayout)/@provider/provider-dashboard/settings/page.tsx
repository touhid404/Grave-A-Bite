"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Store, MapPin, AlignLeft, Info, Image as ImageIcon, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getProfileAction, updateProfileAction } from "@/actions/provider.action";

export default function ProviderSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        storeName: "",
        description: "",
        address: "",
        cuisineType: "",
    });

    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await getProfileAction();
            if (error) {
                toast.error(error.message);
            } else if (data?.data) {
                const profile = data.data;
                setFormData({
                    storeName: profile.storeName || "",
                    description: profile.description || "",
                    address: profile.address || "",
                    cuisineType: profile.cuisineType || "",
                });
                setImagePreview(profile.logo || null);
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

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
        setSaving(true);

        try {
            const data = new FormData();
            data.append("storeName", formData.storeName);
            data.append("description", formData.description);
            data.append("address", formData.address);
            data.append("cuisineType", formData.cuisineType);

            if (imageFile) {
                data.append("logo", imageFile);
            }

            const { error } = await updateProfileAction(data);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Profile updated successfully!");
                router.refresh();
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4">
            <header className="space-y-2">
                <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                    STORE <span className="text-primary not-italic tracking-normal">SETTINGS</span>
                </h1>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                    Architect your brand and operational parameters.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Visual Brand Card */}
                    <Card className="md:col-span-1 rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                        <CardHeader className="bg-primary/5 pb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <ImageIcon className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-sm font-black uppercase tracking-widest">Brand Visual</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="relative group aspect-square rounded-2xl bg-muted/50 border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden transition-all hover:border-primary/50">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Store Logo" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white font-black text-[10px] uppercase tracking-widest">Update Logo</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6 text-muted-foreground">
                                        <Store className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Upload Identity</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <p className="mt-4 text-[10px] text-muted-foreground font-bold uppercase text-center tracking-tighter">
                                Recommended: 512x512 HighRes PNG/JPG
                            </p>
                        </CardContent>
                    </Card>

                    {/* Store Metadata Card */}
                    <Card className="md:col-span-2 rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/5">
                        <CardHeader className="border-b border-border/50 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Info className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">Store DNA</CardTitle>
                                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest mt-1">Foundational store information</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Store className="h-3 w-3" /> Store Name
                                    </Label>
                                    <Input
                                        value={formData.storeName}
                                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                        placeholder="e.g. Celestial Delights"
                                        className="rounded-xl bg-background/50 h-12 font-bold border-border/50 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <AlignLeft className="h-3 w-3" /> Cuisine Type
                                    </Label>
                                    <Input
                                        value={formData.cuisineType}
                                        onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value })}
                                        placeholder="e.g. Italian-Fusion"
                                        className="rounded-xl bg-background/50 h-12 font-bold border-border/50 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <MapPin className="h-3 w-3" /> Physical Address
                                </Label>
                                <Input
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="e.g. 123 Galaxy Way, Food Sector"
                                    className="rounded-xl bg-background/50 h-12 font-bold border-border/50 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <AlignLeft className="h-3 w-3" /> Store Narrative
                                </Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe your store's mission and flavor profile..."
                                    className="rounded-xl bg-background/50 font-medium py-4 min-h-[120px] border-border/50 focus:ring-primary"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-primary/5 pt-8 pb-8 flex justify-end px-8 border-t border-border/10">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="rounded-2xl bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-tighter px-10 h-14 transition-all shadow-xl shadow-black/20"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        SYNCHRONIZING...
                                    </>
                                ) : (
                                    <>
                                        <Check className="mr-2 h-5 w-5" />
                                        SAVE CHANGES
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
}
