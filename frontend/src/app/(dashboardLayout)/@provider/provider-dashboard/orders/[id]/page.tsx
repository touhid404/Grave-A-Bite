import { getProviderOrderDetailsAction, updateOrderStatusAction } from "@/actions/provider.action";
import { ProviderOrderDetails } from "@/components/modules/dashboard/provider/ProviderOrderDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProviderOrderDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data: order, error } = await getProviderOrderDetailsAction(id);

    if (error || !order) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex flex-col gap-6">
                <Link href="/provider-dashboard/orders">
                    <Button variant="ghost" className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-4 -ml-2 hover:bg-primary/10 hover:text-primary transition-all flex gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Orders
                    </Button>
                </Link>
                <header className="space-y-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                            Order <span className="text-primary not-italic tracking-normal">#{id.slice(-8).toUpperCase()}</span>
                        </h1>
                    </div>
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                        Detailed production manifest and logistical data.
                    </p>
                </header>
            </div>

            <ProviderOrderDetails order={order} onUpdateStatus={updateOrderStatusAction} />
        </div>
    );
}
