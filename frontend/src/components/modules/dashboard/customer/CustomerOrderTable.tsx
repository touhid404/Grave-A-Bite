"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Star } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Clock, CheckCircle, Package, Truck, XCircle } from "lucide-react";

interface CustomerOrderTableProps {
    orders: any[];
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    PLACED: { label: "Placed", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Clock },
    PREPARING: { label: "Preparing", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Package },
    READY: { label: "Ready", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle },
    DELIVERED: { label: "Delivered", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle },
    CANCELLED: { label: "Cancelled", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle },
};

export function CustomerOrderTable({ orders }: CustomerOrderTableProps) {
    return (
        <div className="rounded-2xl border border-border/50 overflow-hidden bg-white/5 backdrop-blur-xl">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Order ID</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Items</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Total</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Status</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Date</TableHead>
                        <TableHead className="text-right font-black uppercase tracking-tighter text-[10px] py-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="py-20 text-center text-muted-foreground font-bold italic uppercase tracking-widest opacity-30">
                                You haven't placed any orders yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => {
                            const config = statusConfig[order.status] || statusConfig.PLACED;
                            const StatusIcon = config.icon;

                            return (
                                <TableRow key={order.id} className="border-border/40 hover:bg-muted/20 transition-colors">
                                    <TableCell className="py-6">
                                        <span className="font-mono text-xs text-muted-foreground">
                                            #{order.id.slice(-8).toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col gap-1">
                                            {order.orderItems?.slice(0, 2).map((item: any) => (
                                                <span key={item.id} className="text-xs font-bold">
                                                    {item.quantity}x {item.meal?.name || "Unknown"}
                                                </span>
                                            ))}
                                            {order.orderItems?.length > 2 && (
                                                <span className="text-[10px] text-muted-foreground">
                                                    +{order.orderItems.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <span className="font-black italic text-sm tracking-tighter">
                                            ${order.totalAmount?.toFixed(2) || "0.00"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className={`rounded-full px-4 text-[10px] font-black uppercase tracking-widest italic shadow-none border ${config.color}`}>
                                            <StatusIcon className="h-3 w-3 mr-1.5" />
                                            {config.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-10 w-10 rounded-xl p-0 hover:bg-primary/20 hover:text-primary"
                                                >
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50 bg-card/80 backdrop-blur-2xl p-2">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/dashboard/orders/${order.id}`}
                                                        className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors flex items-center gap-3 font-bold text-xs"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                {order.status === "DELIVERED" && (
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/dashboard/orders/${order.id}`}
                                                            className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors flex items-center gap-3 font-bold text-xs"
                                                        >
                                                            <Star className="h-4 w-4" />
                                                            Rate Meals
                                                        </Link>
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
