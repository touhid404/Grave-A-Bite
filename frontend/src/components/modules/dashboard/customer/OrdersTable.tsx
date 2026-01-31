"use client";

import { useRouter } from "next/navigation";
import { Eye, MapPin, Clock, CreditCard } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface OrderItem {
    mealId: string;
    quantity: number;
    meal: {
        name: string;
        price: number;
        image?: string;
    };
}

interface Order {
    id: string;
    totalPrice: number;
    status: "PENDING" | "DELIVERED" | "CANCELLED" | "PREPARING";
    address: string;
    createdAt: string;
    items: OrderItem[];
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
    const router = useRouter();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "PENDING":
                return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            case "PREPARING":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "CANCELLED":
                return "bg-destructive/10 text-destructive border-destructive/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="border rounded-2xl shadow-sm bg-card overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 border-none">
                        <TableHead className="font-bold py-5">Order Details</TableHead>
                        <TableHead className="font-bold">Date</TableHead>
                        <TableHead className="font-bold">Items</TableHead>
                        <TableHead className="font-bold">Total</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="text-right font-bold pr-6">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center py-24 text-muted-foreground"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                                        <CreditCard className="h-8 w-8 text-muted-foreground/50" />
                                    </div>
                                    <p className="text-xl font-black tracking-tight text-foreground">No orders yet</p>
                                    <p className="text-sm max-w-xs mx-auto">Looks like you haven&apos;t placed any orders yet. Discover delicious meals and start ordering!</p>
                                    <Button asChild className="mt-6 rounded-xl font-bold bg-primary text-black hover:bg-primary/90">
                                        <a href="/meals">Browse Menu</a>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow
                                key={order.id}
                                className="hover:bg-muted/30 transition-colors border-b border-muted group"
                            >
                                <TableCell className="py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-sm uppercase tracking-wider text-muted-foreground">#{order.id.slice(-8)}</span>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            <span className="line-clamp-1">{order.address}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Clock className="h-4 w-4 text-primary" />
                                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-bold text-sm">
                                        {order.items.length} {order.items.length === 1 ? "Item" : "Items"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-lg font-black text-primary">BDT {order.totalPrice}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`rounded-lg py-1 px-3 font-bold border ${getStatusColor(order.status)} shrink-0`}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                    <Button variant="outline" size="sm" className="rounded-xl font-bold border-2 hover:bg-primary hover:text-black hover:border-primary transition-all">
                                        <Eye className="mr-2 h-4 w-4" />
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
