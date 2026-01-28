"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface AllOrdersTableProps {
    orders: any[];
}

export function AllOrdersTable({ orders }: AllOrdersTableProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "PLACED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "PREPARING": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "CANCELLED": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-muted text-muted-foreground border-border";
        }
    };

    return (
        <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/30 backdrop-blur-xl">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="border-border/50">
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Order ID</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Date</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Items</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Total</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="py-20 text-center text-muted-foreground font-bold italic uppercase tracking-widest opacity-30">
                                No orders captured in the matrix.
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                                <TableCell className="py-6">
                                    <span className="font-black italic text-primary text-xs uppercase tracking-tighter">#{order.id.slice(-8)}</span>
                                </TableCell>
                                <TableCell className="py-6 text-xs font-bold text-muted-foreground">
                                    {format(new Date(order.createdAt), "MMM d, yyyy • HH:mm")}
                                </TableCell>
                                <TableCell className="py-6">
                                    <div className="flex flex-col gap-1">
                                        {order.orderItems.map((item: any, idx: number) => (
                                            <span key={idx} className="text-[10px] font-black uppercase tracking-tighter">
                                                {item.quantity}x {item.meal?.name || "Deleted Meal"}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <span className="font-black text-sm italic tracking-tighter">${order.totalAmount.toFixed(2)}</span>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Badge
                                        className={`rounded-full px-4 text-[10px] font-black uppercase tracking-widest italic shadow-none border ${getStatusColor(order.status)}`}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
