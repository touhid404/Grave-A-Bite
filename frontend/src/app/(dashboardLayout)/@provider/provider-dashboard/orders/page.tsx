import { getOrdersAction, updateOrderStatusAction } from "@/actions/provider.action";
import { OrderTable } from "@/components/modules/dashboard/provider/OrderTable";

export default async function OrdersPage() {
    const { data, error } = await getOrdersAction();

    const handleUpdateStatus = async (orderId: string, status: string) => {
        "use server";
        return await updateOrderStatusAction(orderId, status);
    };

    if (error) {
        return (
            <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-3xl">
                <p className="text-destructive font-bold">{error.message}</p>
            </div>
        );
    }

    const orders = data?.data || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase italic">
                        Received <span className="text-primary tracking-tighter not-italic">Orders</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Track and manage incoming customer orders.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50">
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total</p>
                        <p className="text-xl font-black italic tracking-tighter leading-none">{orders.length}</p>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">New</p>
                        <p className="text-xl font-black italic tracking-tighter leading-none text-yellow-500">
                            {orders.filter((o: any) => o.status === "PLACED").length}
                        </p>
                    </div>
                </div>
            </div>

            <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
        </div>
    );
}
