import { Clock, CheckCircle, Package, XCircle } from "lucide-react";

export const ORDER_STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
    PLACED: { label: "Placed", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Clock },
    PREPARING: { label: "Preparing", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Package },
    READY: { label: "Ready", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle },
    DELIVERED: { label: "Delivered", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle },
    CANCELLED: { label: "Cancelled", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle },
};

export const ORDER_STATUS_FLOW = ["PLACED", "PREPARING", "READY", "DELIVERED"];
