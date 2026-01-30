"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, User, Phone, Mail, Check, Shield, Settings2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCustomerProfileAction, updateCustomerProfileAction } from "@/actions/customer.action";

export default function CustomerProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        image: "",
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
                    image: user.image || "",
                });
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("phone", formData.phone);

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
        <div className="max-w-4xl mx-auto py-10">
            <div className="relative mb-12 text-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
                    Member <span className="text-primary not-italic">Profile</span>
                </h1>
                <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">
                    Signature Identity Management
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Identity Card */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2.5rem] border-border/50 bg-card/30 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-primary/5 border-b-4 border-b-primary">
                        <CardContent className="pt-12 pb-10 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative w-32 h-32 rounded-full bg-muted/50 border-4 border-background overflow-hidden flex items-center justify-center shadow-2xl">
                                    {formData.image ? (
                                        <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="h-16 w-16 text-muted-foreground opacity-30" />
                                    )}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight mb-1">{formData.name}</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary italic mb-4">Silver member</p>

                            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-muted/40 rounded-full w-fit mx-auto">
                                <Shield className="h-3 w-3 text-primary" />
                                <span className="text-[9px] font-black uppercase tracking-widest leading-none">Account Verified</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Form Details */}
                <div className="lg:col-span-8">
                    <Card className="rounded-[2.5rem] border-border/50 bg-card/30 backdrop-blur-2xl shadow-2xl shadow-primary/5 overflow-hidden">
                        <CardHeader className="p-8 border-b border-border/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-2xl">
                                        <Settings2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-black uppercase tracking-tighter italic">Basic Settings</CardTitle>
                                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">Update your reachable credentials</CardDescription>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="rounded-2xl bg-background/50 h-14 pl-12 font-bold border-border/50 focus:ring-primary focus:bg-background transition-all"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email (Static)</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                                        <Input
                                            value={formData.email}
                                            disabled
                                            className="rounded-2xl bg-muted/30 h-14 pl-12 font-bold border-border/50 opacity-60 cursor-not-allowed italic"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+1 234 567 890"
                                            className="rounded-2xl bg-background/50 h-14 pl-12 font-bold border-border/50 focus:ring-primary focus:bg-background transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-10 bg-muted/20 border-t border-border/50 justify-end">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="rounded-[1.2rem] bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-widest text-xs px-12 h-16 transition-all shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                        SYNCING...
                                    </>
                                ) : (
                                    <>
                                        <Check className="mr-3 h-5 w-5" />
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
