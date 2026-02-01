"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, Package, Truck, XCircle, MapPin, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";
import { ReviewDialog } from "./ReviewDialog";

interface OrderDetailsProps {
    order: any;
}

const statusConfig: Record<string, { label: string; color: string; icon: any; description: string }> = {
    PLACED: { label: "Placed", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Clock, description: "Waiting for provider confirmation" },
    PREPARING: { label: "Preparing", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Package, description: "Your meal is being prepared with care" },
    READY: { label: "Ready", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle, description: "Your order is ready for delivery" },
    DELIVERED: { label: "Delivered", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle, description: "Enjoy your delicious meal!" },
    CANCELLED: { label: "Cancelled", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle, description: "This order has been cancelled" },
};

const steps = ["PLACED", "PREPARING", "READY", "DELIVERED"];

export function CustomerOrderDetails({ order }: OrderDetailsProps) {
    const activeStepIndex = steps.indexOf(order.status);
    const config = statusConfig[order.status] || statusConfig.PLACED;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Tracking and Items */}
            <div className="lg:col-span-2 space-y-8">
                {/* Tracking Stepper */}
                <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                    <CardHeader className="border-b border-border/50 pb-6">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Live Tracking</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <div className="relative">
                            <div className="absolute top-5 left-6 right-6 h-0.5 bg-muted hidden md:block" />
                            <div
                                className="absolute top-5 left-6 h-0.5 bg-primary transition-all duration-1000 hidden md:block"
                                style={{ width: `${(activeStepIndex / (steps.length - 1)) * 100}%` }}
                            />

                            <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-0">
                                {steps.map((step, index) => {
                                    const stepConfig = statusConfig[step];
                                    const StepIcon = stepConfig.icon;
                                    const isCompleted = index <= activeStepIndex;
                                    const isActive = index === activeStepIndex;

                                    return (
                                        <div key={step} className="flex flex-row md:flex-col items-center gap-4 md:gap-3 text-center z-10">
                                            <div className={`h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${isCompleted ? "bg-primary border-primary text-black shadow-lg shadow-primary/30 rotate-3" : "bg-muted/50 border-border/50 text-muted-foreground"
                                                }`}>
                                                <StepIcon className={`h-5 w-5 ${isActive ? "animate-pulse" : ""}`} />
                                            </div>
                                            <div className="text-left md:text-center">
                                                <p className={`text-[10px] font-black uppercase tracking-tighter ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                                                    {stepConfig.label}
                                                </p>
                                                {isActive && (
                                                    <Badge className="mt-1 bg-primary/20 text-primary border-none text-[8px] font-black uppercase">Active</Badge>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ordered Items */}
                <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                    <CardHeader className="border-b border-border/50">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Meal Manifest</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {order.orderItems?.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-6 group">
                                    <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-border/50 bg-muted shrink-0 shadow-lg group-hover:border-primary/50 transition-colors">
                                        <Image
                                            src={item.meal?.image || "/placeholder-meal.jpg"}
                                            alt={item.meal?.name || "Meal"}
                                            width={80}
                                            height={80}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-black italic uppercase tracking-tighter text-lg">{item.meal?.name}</h4>
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                                    {item.quantity} x BDT {item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            {/* Review button removed as per user request */}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black italic text-xl tracking-tighter">BDT {(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Order Info */}
            <div className="space-y-8">
                {/* Summary Card */}
                <Card className="rounded-3xl border-border/50 bg-black text-white overflow-hidden shadow-2xl">
                    <CardHeader className="bg-primary/10 border-b border-white/10">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary italic">Financial Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6">
                        <div className="flex justify-between items-center text-sm font-bold opacity-60 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>BDT {(order.totalAmount - 50).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold opacity-60 uppercase tracking-widest">
                            <span>Delivery Fee</span>
                            <span>BDT 50.00</span>
                        </div>
                        <Separator className="bg-white/10" />
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Grand Total</p>
                                <p className="text-4xl font-black italic tracking-tighter leading-none">BDT {order.totalAmount.toFixed(2)}</p>
                            </div>
                            <Badge className="bg-white/10 text-white border-white/20 text-[10px] font-black uppercase italic tracking-widest px-4">COD PAID</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Logistics Card */}
                <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                    <CardHeader className="border-b border-border/50">
                        <CardTitle className="text-sm font-black uppercase tracking-widest">Logistics DNA</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Dropoff Point</p>
                                <p className="text-sm font-bold leading-relaxed">{order.deliveryAddress}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Tactical Contact</p>
                                <p className="text-sm font-bold italic">{order.deliveryPhone}</p>
                            </div>
                        </div>
                        {order.notes && (
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Missions Notes</p>
                                    <p className="text-sm font-medium italic opacity-70">"{order.notes}"</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
