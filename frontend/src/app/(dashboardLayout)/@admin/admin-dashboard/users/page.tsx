import { getAllUsersAction, updateUserStatusAction } from "@/actions/admin.action";
import { UserTable } from "@/components/modules/dashboard/admin/UserTable";
import { Roles } from "@/constants/roles";
import { Customer } from "@/types";

export default async function UsersPage() {
    const { data, error } = await getAllUsersAction();

    const handleUpdateStatus = async (userId: string, status: string) => {
        "use server";
        return await updateUserStatusAction(userId, status);
    };

    if (error) {
        return (
            <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-3xl">
                <p className="text-destructive font-bold">{error.message}</p>
            </div>
        );
    }

    const allUsers = data?.data || [];
    const users = allUsers.filter((u:Customer) => u.role === Roles.customer);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase italic">
                        User <span className="text-primary tracking-tighter not-italic">Oversight</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Monitor and manage the status of all platform members.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border border-border/50">
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total</p>
                        <p className="text-xl font-black italic tracking-tighter leading-none">{users.length}</p>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="px-4 py-2 text-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active</p>
                        <p className="text-xl font-black italic tracking-tighter leading-none text-green-500">
                            {users.filter((u: any) => u.status === "ACTIVE").length}
                        </p>
                    </div>
                </div>
            </div>

            <UserTable users={users} onUpdateStatus={handleUpdateStatus} />
        </div>
    );
}
