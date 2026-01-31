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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Clock, CheckCircle, Package, Truck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrderTableProps {
    orders: any[];
    onUpdateStatus: (orderId: string, status: string) => Promise<any>;
}

import { ORDER_STATUS_CONFIG, ORDER_STATUS_FLOW } from "@/constants/order";

export function OrderTable({ orders, onUpdateStatus }: OrderTableProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        setLoadingId(orderId);
        try {
            const { error } = await onUpdateStatus(orderId, newStatus);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Order updated to ${ORDER_STATUS_CONFIG[newStatus]?.label || newStatus}`);
                router.refresh();
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setLoadingId(null);
        }
    };

    const getNextStatus = (currentStatus: string) => {
        const currentIndex = ORDER_STATUS_FLOW.indexOf(currentStatus);
        if (currentIndex === -1 || currentIndex === ORDER_STATUS_FLOW.length - 1) return null;
        return ORDER_STATUS_FLOW[currentIndex + 1];
    };

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
                                No orders received yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => {
                            const config = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.PLACED;
                            const StatusIcon = config.icon;
                            const nextStatus = getNextStatus(order.status);

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
                                            BDT {order.totalAmount?.toFixed(2) || "0.00"}
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
                                                    disabled={loadingId === order.id}
                                                >
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50 bg-card/80 backdrop-blur-2xl p-2">
                                                <DropdownMenuLabel className="font-black uppercase tracking-tighter text-[10px] text-muted-foreground px-4 py-3">
                                                    Order Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-border/50 mx-2" />
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/provider-dashboard/orders/${order.id}`}
                                                        className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors flex items-center gap-3 font-bold text-xs"
                                                    >
                                                        View Full Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-border/50 mx-2" />
                                                <DropdownMenuLabel className="font-black uppercase tracking-tighter text-[10px] text-muted-foreground px-4 py-3">
                                                    Update Status
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-border/50 mx-2" />
                                                {nextStatus && (
                                                    <DropdownMenuItem
                                                        className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
                                                        onClick={() => handleStatusUpdate(order.id, nextStatus)}
                                                    >
                                                        <div className="flex items-center gap-3 font-bold text-xs">
                                                            Move to {ORDER_STATUS_CONFIG[nextStatus]?.label}
                                                        </div>
                                                    </DropdownMenuItem>
                                                )}
                                                {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
                                                    <DropdownMenuItem
                                                        className="rounded-xl px-4 py-3 focus:bg-destructive/10 focus:text-destructive cursor-pointer transition-colors"
                                                        onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                                                    >
                                                        <div className="flex items-center gap-3 font-bold text-xs">
                                                            <XCircle className="h-4 w-4" />
                                                            Cancel Order
                                                        </div>
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
