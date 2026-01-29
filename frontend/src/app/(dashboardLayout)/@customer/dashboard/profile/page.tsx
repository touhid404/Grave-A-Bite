"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, User, Phone, Mail, Check, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCustomerProfileAction, updateCustomerProfileAction } from "@/actions/customer.action";

export default function CustomerProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await getCustomerProfileAction();
            if (error) {
                toast.error(error.message);
            } else if (data?.data) {
                const user = data.data;
                setFormData({
                    name: user.name || "",
                    phone: user.phone || "",
                    email: user.email || "",
                });
                setImagePreview(user.image || null);
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
            data.append("name", formData.name);
            data.append("phone", formData.phone);

            if (imageFile) {
                data.append("image", imageFile);
            }

            const { error } = await updateCustomerProfileAction(data);
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
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="space-y-2">
                <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                    Personal <span className="text-primary not-italic tracking-normal">Profile</span>
                </h1>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                    Manage your identity and contact information.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Visual Profile Card */}
                    <Card className="md:col-span-1 rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                        <CardHeader className="bg-primary/5 pb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Camera className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-sm font-black uppercase tracking-widest">Avatar</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="relative group mx-auto h-40 w-40 rounded-full bg-muted/50 border-4 border-dashed border-border/50 flex items-center justify-center overflow-hidden transition-all hover:border-primary/50">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white font-black text-[10px] uppercase tracking-widest">Update</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6 text-muted-foreground">
                                        <User className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Upload</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Details Card */}
                    <Card className="md:col-span-2 rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/5">
                        <CardHeader className="border-b border-border/50 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">Basic info</CardTitle>
                                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest mt-1">Your core identity details</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <User className="h-3 w-3" /> Full Name
                                </Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="rounded-xl bg-background/50 h-12 font-bold border-border/50 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Mail className="h-3 w-3" /> Email Address
                                    </Label>
                                    <Input
                                        value={formData.email}
                                        disabled
                                        className="rounded-xl bg-muted/50 h-12 font-bold border-border/50 opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Phone className="h-3 w-3" /> Phone Number
                                    </Label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 234 567 890"
                                        className="rounded-xl bg-background/50 h-12 font-bold border-border/50 focus:ring-primary"
                                    />
                                </div>
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
                                        SAVING...
                                    </>
                                ) : (
                                    <>
                                        <Check className="mr-2 h-5 w-5" />
                                        UPDATE PROFILE
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
