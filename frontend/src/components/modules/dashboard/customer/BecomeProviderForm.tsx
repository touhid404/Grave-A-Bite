"use client";

import { useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Store, MapPin, Utensils, MessageSquare } from "lucide-react";
import { requestBecomeProviderAction } from "@/actions/customer.action";
import * as z from "zod";

const formSchema = z.object({
    storeName: z.string().min(3, "Store name must be at least 3 characters"),
    cuisineType: z.string().min(2, "Please specify cuisine type"),
    address: z.string().min(5, "Address is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export function BecomeProviderForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            storeName: "",
            description: "",
            address: "",
            cuisineType: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            setLoading(true);
            const toastId = toast.loading("Submitting application...");
            try {
                const res = await requestBecomeProviderAction(value);
                if (res.success) {
                    toast.success("Request submitted successfully! Admin will review it.", { id: toastId });
                    router.push("/dashboard/profile");
                } else {
                    toast.error(res.message || "Failed to submit request", { id: toastId });
                }
            } catch (error) {
                toast.error("An error occurred", { id: toastId });
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-xl shadow-primary/5">
                    <Utensils className="h-8 w-8 text-primary -rotate-3" />
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">Start Your <span className="text-primary not-italic">Kitchen</span></h2>
                <p className="text-muted-foreground font-medium text-sm mt-2">Fill in your details to apply as a food provider.</p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6 bg-card/30 backdrop-blur-xl p-8 rounded-3xl border border-border/50"
            >
                <FieldGroup className="space-y-6">
                    <form.Field
                        name="storeName"
                        children={(field: any) => (
                            <Field className="space-y-2">
                                <FieldLabel className="font-black uppercase tracking-widest text-[10px] italic">Store Name</FieldLabel>
                                <div className="relative">
                                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Delicious Delights"
                                        className="pl-11 rounded-xl h-12 border-border/50 bg-background/50 focus:bg-background transition-all"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                </div>
                                <FieldError className="text-[10px] font-black uppercase italic" errors={field.state.meta.errors} />
                            </Field>
                        )}
                    />

                    <form.Field
                        name="cuisineType"
                        children={(field: any) => (
                            <Field className="space-y-2">
                                <FieldLabel className="font-black uppercase tracking-widest text-[10px] italic">Cuisine Type</FieldLabel>
                                <div className="relative">
                                    <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Home Style, Italian, etc."
                                        className="pl-11 rounded-xl h-12 border-border/50 bg-background/50 focus:bg-background transition-all"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                </div>
                                <FieldError className="text-[10px] font-black uppercase italic" errors={field.state.meta.errors} />
                            </Field>
                        )}
                    />

                    <form.Field
                        name="address"
                        children={(field: any) => (
                            <Field className="space-y-2">
                                <FieldLabel className="font-black uppercase tracking-widest text-[10px] italic">Address</FieldLabel>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="123 Foodie Street, Flavor Town"
                                        className="pl-11 rounded-xl h-12 border-border/50 bg-background/50 focus:bg-background transition-all"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                </div>
                                <FieldError className="text-[10px] font-black uppercase italic" errors={field.state.meta.errors} />
                            </Field>
                        )}
                    />

                    <form.Field
                        name="description"
                        children={(field: any) => (
                            <Field className="space-y-2">
                                <FieldLabel className="font-black uppercase tracking-widest text-[10px] italic">Description</FieldLabel>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                                    <Textarea
                                        placeholder="Tell us about your kitchen and specialties..."
                                        className="pl-11 rounded-2xl min-h-[120px] border-border/50 bg-background/50 focus:bg-background transition-all"
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                </div>
                                <FieldError className="text-[10px] font-black uppercase italic" errors={field.state.meta.errors} />
                            </Field>
                        )}
                    />
                </FieldGroup>

                <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl font-black italic uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                </Button>
            </form>
        </div>
    );
}
