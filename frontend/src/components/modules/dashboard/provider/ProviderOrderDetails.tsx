"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Clock,
    CheckCircle,
    Package,
    Truck,
    XCircle,
    MapPin,
    Phone,
    MessageSquare,
    User,
    ChevronRight,
    Loader2
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OrderDetailsProps {
    order: any;
    onUpdateStatus: (orderId: string, status: string) => Promise<any>;
}

const statusConfig: Record<string, { label: string; color: string; icon: any; description: string }> = {
    PLACED: { label: "Placed", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Clock, description: "New order waiting to be confirmed" },
    PREPARING: { label: "Preparing", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Package, description: "Meal is being cooked" },
    READY: { label: "Ready", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle, description: "Order is ready for pickup/delivery" },
    DELIVERED: { label: "Delivered", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle, description: "Order has reached the customer" },
    CANCELLED: { label: "Cancelled", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle, description: "Order has been cancelled" },
};

const statusFlow = ["PLACED", "PREPARING", "READY", "DELIVERED"];

export function ProviderOrderDetails({ order, onUpdateStatus }: OrderDetailsProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getNextStatus = (currentStatus: string) => {
        const currentIndex = statusFlow.indexOf(currentStatus);
        if (currentIndex === -1 || currentIndex === statusFlow.length - 1) return null;
        return statusFlow[currentIndex + 1];
    };

    const nextStatus = getNextStatus(order.status);

    const handleUpdateStatus = async (status: string) => {
        setLoading(true);
        try {
            const { error } = await onUpdateStatus(order.id, status);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Order status updated to ${status}`);
                router.refresh();
            }
        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    const config = statusConfig[order.status] || statusConfig.PLACED;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Status Control Card */}
                <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                    <CardHeader className="border-b border-border/50 bg-primary/5 py-6">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-black uppercase tracking-widest">Operational Status</CardTitle>
                            <Badge className={`rounded-xl px-4 py-1 text-[10px] font-black uppercase tracking-widest italic ${config.color}`}>
                                {config.label}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 pb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <config.icon className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <p className="text-lg font-black italic uppercase tracking-tighter">{config.label}</p>
                                    <p className="text-xs font-medium text-muted-foreground">{config.description}</p>
                                </div>
                            </div>

                            {nextStatus && (
                                <Button
                                    onClick={() => handleUpdateStatus(nextStatus)}
                                    disabled={loading}
                                    className="rounded-2xl bg-black text-white hover:bg-primary hover:text-black font-black uppercase italic tracking-tighter px-8 h-14 transition-all shadow-xl shadow-black/20 group"
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            Move to {statusConfig[nextStatus]?.label}
                                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Ordered Items Manifest */}
                <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                    <CardHeader className="border-b border-border/50">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Production Manifest</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {order.orderItems?.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-6 group">
                                    <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-border/50 bg-muted shrink-0 shadow-lg">
                                        <Image
                                            src={item.meal?.image || "/placeholder-meal.jpg"}
                                            alt={item.meal?.name || "Meal"}
                                            width={96}
                                            height={96}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black italic uppercase tracking-tighter text-xl leading-none mb-1">{item.meal?.name}</h4>
                                        <div className="flex gap-4 items-center">
                                            <Badge variant="outline" className="rounded-lg font-black text-[10px] uppercase border-primary/30 text-primary px-3">
                                                QTY: {item.quantity}
                                            </Badge>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                                Unit Price: ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black italic text-2xl tracking-tighter">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 border-t border-border/50 p-6 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provider Subtotal (Excl. Delivery)</span>
                        <span className="font-black italic text-xl">${(order.orderItems?.reduce((acc: number, item: any) => acc + (item.quantity * item.price), 0) || 0).toFixed(2)}</span>
                    </CardFooter>
                </Card>
            </div>

            {/* Logistics and Customer Info */}
            <div className="space-y-8">
                <Card className="rounded-3xl border-border/50 bg-black text-white overflow-hidden shadow-2xl">
                    <CardHeader className="bg-primary/10 border-b border-white/10 py-6">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary italic">Logistics Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-70 mb-1">Destination</p>
                                <p className="text-sm font-bold leading-relaxed">{order.deliveryAddress}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-70 mb-1">Customer Phone</p>
                                <p className="text-sm font-bold italic">{order.deliveryPhone}</p>
                            </div>
                        </div>
                        {order.notes && (
                            <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-70 mb-1">Orders Notes</p>
                                    <p className="text-sm font-medium italic opacity-70">"{order.notes}"</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Date and ID Info */}
                <div className="p-8 rounded-3xl border border-border/50 bg-muted/20 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Order Timestamp</span>
                        <span className="text-xs font-bold">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System ID</span>
                        <span className="font-mono text-[10px] opacity-50 uppercase">{order.id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
