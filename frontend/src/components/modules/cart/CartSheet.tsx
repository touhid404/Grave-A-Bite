
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useMounted } from "@/hooks/useMounted";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartSheet() {
    const { items, removeItem, updateQuantity, subtotal, isOpen, setIsOpen } = useCartStore();
    const mounted = useMounted();
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const handleCheckout = () => {
        setIsOpen(false);
        if (!session?.user) {
            toast.error("Please login to checkout", {
                action: {
                    label: "Login",
                    onClick: () => router.push("/login?callbackUrl=/checkout"),
                },
            });
            router.push("/login?callbackUrl=/checkout");
            return;
        }

        if ((session.user as any).role !== "CUSTOMER") {
            toast.error("Only customers can place orders. Your current account type is restricted from checkout.");
            return;
        }

        router.push("/checkout");
    };

    if (!mounted) return null;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                            {items.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[540px] flex flex-col p-6">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                        Your <span className="text-primary not-italic">Cart</span>
                        <span className="text-muted-foreground text-sm font-medium normal-case tracking-normal ml-auto">
                            ({items.length} items)
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto -mx-6 px-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground">
                            <ShoppingBag className="h-16 w-16 opacity-20" />
                            <p className="font-medium text-lg">Your cart is empty</p>
                            <Button variant="link" onClick={() => setIsOpen(false)} className="text-primary">
                                Browse Meals
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/50">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between gap-2">
                                            <div>
                                                <h4 className="font-bold line-clamp-1">{item.name}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    {item.providerName}
                                                </p>
                                            </div>
                                            <p className="font-black text-primary">
                                                {item.price * item.quantity} BDT
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-md hover:bg-background shadow-sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-xs font-bold w-4 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-md hover:bg-background shadow-sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="pt-6 border-t mt-auto space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-bold">{subtotal()} BDT</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Service Fee (5%)</span>
                                <span className="font-bold">{(subtotal() * 0.05).toFixed(2)} BDT</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-lg font-black uppercase italic tracking-tighter">
                                <span>Total</span>
                                <span className="text-primary">{(subtotal() * 1.05).toFixed(2)} BDT</span>
                            </div>
                        </div>

                        <Button className="w-full h-12 text-lg font-bold" onClick={handleCheckout}>
                            Checkout Securely
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
