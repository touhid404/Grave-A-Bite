import { getAllProvidersAction, approveProviderAction } from "@/actions/admin.action";
import { ProviderTable } from "@/components/modules/dashboard/admin/ProviderTable";

export default async function ProvidersPage() {
    const { data, error } = await getAllProvidersAction();

    const handleApproveProvider = async (userId: string) => {
        "use server";
        return await approveProviderAction(userId);
    };

    if (error) {
        return (
            <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-3xl">
                <p className="text-destructive font-bold">{error.message}</p>
            </div>
        );
    }

    const providers = data?.data || [];
    const pendingCount = providers.filter((p: any) => p.role === "CUSTOMER").length;
    const approvedCount = providers.filter((p: any) => p.role === "PROVIDER").length;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase italic">
                        Provider <span className="text-primary tracking-tighter not-italic">Network</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Manage your food providers and approve new join requests.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50">
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Approved</p>
                        <p className="text-xl font-black italic tracking-tighter leading-none">{approvedCount}</p>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Pending</p>
                        <p className="text-xl font-black italic tracking-tighter leading-none text-amber-500">
                            {pendingCount}
                        </p>
                    </div>
                </div>
            </div>

            <ProviderTable providers={providers} onApprove={handleApproveProvider} />
        </div>
    );
}
