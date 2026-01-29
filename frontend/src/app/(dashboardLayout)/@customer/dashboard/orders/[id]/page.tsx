import { getOrderDetailsAction } from "@/actions/order.action";
import { CustomerOrderDetails } from "@/components/modules/dashboard/customer/CustomerOrderDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data, error } = await getOrderDetailsAction(id);

    if (error || !data) {
        return notFound();
    }

    const order = data;

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6">
                <Link href="/dashboard/orders">
                    <Button variant="ghost" className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-4 -ml-2 hover:bg-primary/10 hover:text-primary transition-all flex gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Fleet
                    </Button>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight uppercase italic leading-none">
                            Order <span className="text-primary tracking-tighter not-italic">#{order.id.slice(-8).toUpperCase()}</span>
                        </h1>
                        <p className="text-muted-foreground font-medium text-sm mt-2">
                            Deployment Date: {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <CustomerOrderDetails order={order} />
        </div>
    );
}
