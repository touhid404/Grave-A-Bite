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
import { MoreHorizontal, ShieldAlert, ShieldCheck, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserTableProps {
    users: any[];
    onUpdateStatus: (userId: string, status: string) => Promise<any>;
}

export function UserTable({ users, onUpdateStatus }: UserTableProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleStatusUpdate = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
        setLoadingId(userId);
        try {
            const { data, error } = await onUpdateStatus(userId, newStatus);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`User ${newStatus.toLowerCase()} successfully`);
                router.refresh();
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/30 backdrop-blur-xl">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow className="border-border/50">
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">User</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Email</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Role</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Status</TableHead>
                        <TableHead className="text-right font-black uppercase tracking-tighter text-[10px] py-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                            <TableCell className="py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase italic">
                                        {user.name?.charAt(0) || "U"}
                                    </div>
                                    <span className="font-bold text-sm">{user.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-xs text-muted-foreground py-6">{user.email}</TableCell>
                            <TableCell className="py-6">
                                <Badge variant="outline" className="rounded-full px-4 border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest italic">
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell className="py-6">
                                <Badge
                                    className={`rounded-full px-4 text-[10px] font-black uppercase tracking-widest italic shadow-none ${user.status === "ACTIVE"
                                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                                        }`}
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right py-6">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-10 w-10 rounded-xl p-0 hover:bg-primary/20 hover:text-primary">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50 bg-card/80 backdrop-blur-2xl p-2">
                                        <DropdownMenuLabel className="font-black uppercase tracking-tighter text-[10px] text-muted-foreground px-4 py-3">Control Panel</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-border/50 mx-2" />
                                        <DropdownMenuItem
                                            className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
                                            onClick={() => handleStatusUpdate(user.id, user.status)}
                                            disabled={loadingId === user.id}
                                        >
                                            {user.status === "ACTIVE" ? (
                                                <div className="flex items-center gap-3 font-bold text-xs">
                                                    <UserX className="h-4 w-4" />
                                                    SUSPEND USER
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 font-bold text-xs">
                                                    <UserCheck className="h-4 w-4" />
                                                    ACTIVATE USER
                                                </div>
                                            )}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="rounded-xl px-4 py-3 focus:bg-destructive/10 focus:text-destructive cursor-pointer transition-colors">
                                            <div className="flex items-center gap-3 font-bold text-xs">
                                                <ShieldAlert className="h-4 w-4" />
                                                FLAG ACCOUNT
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
