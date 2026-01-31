import { getAllOrdersAction } from "@/actions/admin.action";
import { AllOrdersTable } from "@/components/modules/dashboard/admin/AllOrdersTable";

export default async function OrdersPage() {
    const { data, error } = await getAllOrdersAction();

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
                        Order <span className="text-primary tracking-tighter not-italic">Matrix</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Total system oversight of every transaction and delivery flow.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50">
                    <div className="px-6 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Revenue</p>
                        <p className="text-2xl font-black italic tracking-tighter leading-none text-primary">
                            BDT {orders.reduce((acc: number, o: any) => acc + (o.status !== "CANCELLED" ? o.totalAmount : 0), 0).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Orders", value: orders.filter((o: any) => ["PLACED", "PREPARING", "READY"].includes(o.status)).length, bg: "bg-blue-500/5" },
                    { label: "Completion Rate", value: `${Math.round((orders.filter((o: any) => o.status === "DELIVERED").length / (orders.length || 1)) * 100)}%`, bg: "bg-green-500/5" },
                    { label: "Total Matrix Size", value: orders.length, bg: "bg-zinc-500/5" },
                ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} border border-border/50 rounded-2xl p-6`}>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-2">{stat.label}</p>
                        <p className="text-3xl font-black italic tracking-tighter leading-none">{stat.value}</p>
                    </div>
                ))}
            </div>

            <AllOrdersTable orders={orders} />
        </div>
    );
}
