
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
                router.push("/login?callbackUrl=/checkout");
            } else if ((session.user as any).role !== "CUSTOMER") {
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
        <div className="container mx-auto px-4 py-32">
            <div className="flex flex-col gap-2 mb-12">
                <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">Secure Checkout</span>
                <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Finalize <span className="text-primary transparent-text-outline">Order</span></h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Section */}
                <div className="lg:col-span-7 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <Card className="border-2 rounded-[2rem] overflow-hidden bg-card/50 backdrop-blur-xl">
                            <CardHeader className="border-b bg-muted/30 pb-6">
                                <CardTitle className="flex items-center gap-3 font-black uppercase tracking-tight italic">
                                    <Truck className="h-6 w-6 text-primary" />
                                    Delivery Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="address" className="font-black uppercase tracking-widest text-[10px] text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-3 w-3" /> Delivery Address
                                    </Label>
                                    <Input
                                        id="address"
                                        placeholder="Enter your full street address"
                                        className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="phone" className="font-black uppercase tracking-widest text-[10px] text-muted-foreground flex items-center gap-2">
                                        <Phone className="h-3 w-3" /> Contact Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        placeholder="E.g. +880 1XXX XXXXXX"
                                        className="h-14 rounded-xl border-2 focus-visible:ring-primary"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="notes" className="font-black uppercase tracking-widest text-[10px] text-muted-foreground flex items-center gap-2">
                                        <MessageSquare className="h-3 w-3" /> Note to Provider (Optional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Extra spicy, no onions, leave at the door, etc."
                                        className="min-h-[120px] rounded-2xl border-2 focus-visible:ring-primary resize-none"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 rounded-[2rem] overflow-hidden bg-zinc-950 text-white shadow-2xl shadow-primary/10">
                            <CardHeader className="border-b border-white/10 pb-6">
                                <CardTitle className="flex items-center gap-3 font-black uppercase tracking-tight italic">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-black">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase italic tracking-tight">Cash on Delivery</h4>
                                        <p className="text-zinc-400 text-sm">Pay when you receive your delicious meal.</p>
                                    </div>
                                </div>
                                <p className="mt-6 text-xs text-zinc-500 font-bold uppercase tracking-widest text-center">
                                    Digital payment methods coming soon
                                </p>
                            </CardContent>
                        </Card>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-20 rounded-[1.5rem] bg-primary text-black font-black uppercase text-xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-3"
                        >
                            {loading ? "Placing Order..." : (
                                <>
                                    Place Order {formatCurrency(total)}
                                    <ArrowRight className="h-6 w-6" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-5">
                    <Card className="border-2 rounded-[2.5rem] overflow-hidden bg-card/30 backdrop-blur-2xl sticky top-32">
                        <CardHeader className="border-b bg-muted/20 pb-6">
                            <CardTitle className="font-black uppercase tracking-tight italic">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 border-2 border-border/50">
                                            <Image src={item.image} fill alt={item.name} className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="font-black uppercase italic tracking-tighter text-sm line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{item.providerName}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs font-bold text-muted-foreground">{item.quantity} × {formatCurrency(item.price)}</span>
                                                <span className="font-black text-sm">{formatCurrency(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t space-y-4">
                                <div className="flex justify-between text-muted-foreground">
                                    <span className="font-bold uppercase tracking-widest text-xs">Subtotal</span>
                                    <span className="font-black">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span className="font-bold uppercase tracking-widest text-xs">Delivery Fee</span>
                                    <span className="font-black">{formatCurrency(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-dashed">
                                    <span className="font-black uppercase tracking-widest text-sm">Grand Total</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 p-6 flex items-center gap-3 text-xs text-muted-foreground font-medium italic">
                            <ShoppingBag className="h-4 w-4 text-primary" />
                            All prices include VAT where applicable.
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutClient;
