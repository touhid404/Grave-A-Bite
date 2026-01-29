
"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cart.store";
import { useMounted } from "@/hooks/useMounted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, CreditCard, Truck, MapPin, Phone, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { placeOrderAction } from "@/actions/order.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { Roles } from "@/constants/roles";

const CheckoutClient = () => {
    const mounted = useMounted();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const { items, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (mounted && !isPending) {
            if (!session?.user) {
                toast.error("Please login to checkout");
                router.push("/login");
            } else if ((session.user as any).role !== Roles.customer) {
                toast.error("Only customers can place orders. Admin and Providers cannot checkout.");
                router.push("/");
            }
        }
    }, [mounted, isPending, session, router]);

    if (!mounted || isPending || !session?.user || (session.user as any).role !== "CUSTOMER") return null;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 50; // Flat fee for demo
    const total = subtotal + deliveryFee;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setLoading(true);
        const orderData = {
            deliveryAddress: address,
            deliveryPhone: phone,
            notes: notes,
            items: items.map(item => ({
                mealId: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        const toastId = toast.loading("Processing your order...");
        try {
            const result = await placeOrderAction(orderData);
            if (result.success) {
                toast.success("Order placed successfully!", { id: toastId });
                clearCart();
                router.push("/dashboard");
            } else {
                toast.error(result.error || "Failed to place order", { id: toastId });
            }
        } catch (error) {
            toast.error("An error occurred", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added any delicious meals to your cart yet.</p>
                <Button asChild size="lg" className="font-black uppercase tracking-widest px-8 rounded-full">
                    <Link href="/meals">Browse Menu</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="flex flex-col gap-1 mb-8">
                <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Secure Checkout</span>
                <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Finalize <span className="text-primary transparent-text-outline">Order</span></h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Section */}
                <div className="lg:col-span-7 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                            <CardHeader className="border-b border-border/50 bg-primary/5 py-5 px-6">
                                <CardTitle className="flex items-center gap-3 text-sm font-black uppercase tracking-widest italic">
                                    <Truck className="h-5 w-5 text-primary" />
                                    Delivery Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="font-black uppercase tracking-widest text-[9px] text-muted-foreground flex items-center gap-2 ml-1">
                                        <MapPin className="h-3 w-3" /> Delivery Address
                                    </Label>
                                    <Input
                                        id="address"
                                        placeholder="Enter your full street address"
                                        className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary font-bold text-sm"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="font-black uppercase tracking-widest text-[9px] text-muted-foreground flex items-center gap-2 ml-1">
                                        <Phone className="h-3 w-3" /> Contact Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        placeholder="E.g. +880 1XXX XXXXXX"
                                        className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary font-bold text-sm"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="font-black uppercase tracking-widest text-[9px] text-muted-foreground flex items-center gap-2 ml-1">
                                        <MessageSquare className="h-3 w-3" /> Note to Provider (Optional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Extra spicy, no onions, leave at the door, etc."
                                        className="min-h-[100px] rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary resize-none font-bold text-sm"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-border/50 bg-black text-white overflow-hidden shadow-2xl">
                            <CardHeader className="border-b border-white/10 bg-white/5 py-5 px-6">
                                <CardTitle className="flex items-center gap-3 text-sm font-black uppercase tracking-widest italic text-primary">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-black">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase italic tracking-tight text-sm">Cash on Delivery</h4>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Pay upon safe arrival</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.3em]">
                                        Digital vaults opening soon
                                    </p>
                                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 rounded-2xl bg-primary text-black font-black uppercase text-lg shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            {loading ? "Initializing..." : (
                                <>
                                    Complete Payment {formatCurrency(total)}
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-5">
                    <Card className="rounded-3xl border-border/50 bg-card/30 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-primary/5 sticky top-8">
                        <CardHeader className="border-b border-border/50 bg-muted/30 py-5 px-6">
                            <CardTitle className="text-sm font-black uppercase tracking-widest italic">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group items-center">
                                        <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-border/50 shadow-lg">
                                            <Image src={item.image} fill alt={item.name} className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black uppercase italic tracking-tighter text-sm truncate">{item.name}</h4>
                                            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">{item.providerName}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-[10px] font-bold text-muted-foreground">{item.quantity} × {formatCurrency(item.price)}</span>
                                                <span className="font-black text-sm italic tracking-tighter">{formatCurrency(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                                <div className="flex justify-between text-muted-foreground">
                                    <span className="font-black uppercase tracking-widest text-[9px]">Subtotal</span>
                                    <span className="font-black text-sm italic">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span className="font-black uppercase tracking-widest text-[9px]">Logistics Fee</span>
                                    <span className="font-black text-sm italic">{formatCurrency(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-dashed border-border/50">
                                    <span className="font-black uppercase tracking-widest text-xs italic">Grand Total</span>
                                    <span className="text-2xl font-black text-primary tracking-tighter italic">{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t border-border/50 py-4 px-6 flex items-center gap-3 text-[9px] text-muted-foreground font-black uppercase tracking-widest italic">
                            <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                            VAT included where applicable.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutClient;
