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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { MoreHorizontal, ShieldCheck, UserCheck, AlertCircle, Store as StoreIcon, MapPin, Utensils, Phone, Mail, FileText, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ProviderTableProps {
    providers: any[];
    onApprove: (userId: string) => Promise<any>;
}

export function ProviderTable({ providers, onApprove }: ProviderTableProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<any>(null);
    const router = useRouter();

    const handleApprove = async (userId: string) => {
        setLoadingId(userId);
        try {
            const { data, error } = await onApprove(userId);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Provider approved successfully`);
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
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Provider</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Email</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Store Name</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-[10px] py-6">Status</TableHead>
                        <TableHead className="text-right font-black uppercase tracking-tighter text-[10px] py-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {providers.map((provider) => (
                        <TableRow key={provider.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                            <TableCell className="py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black uppercase italic">
                                        {provider.name?.charAt(0) || "P"}
                                    </div>
                                    <span className="font-bold text-sm">{provider.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium text-xs text-muted-foreground py-6">{provider.email}</TableCell>
                            <TableCell className="font-bold text-xs py-6">
                                {provider.providerProfile?.storeName || "N/A"}
                            </TableCell>
                            <TableCell className="py-6">
                                <Badge
                                    className={`rounded-full px-4 text-[10px] font-black uppercase tracking-widest italic shadow-none ${provider.role === "PROVIDER"
                                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                        }`}
                                >
                                    {provider.role === "PROVIDER" ? "APPROVED" : "PENDING"}
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

                                        {provider.role === "CUSTOMER" && (
                                            <DropdownMenuItem
                                                className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
                                                onClick={() => handleApprove(provider.id)}
                                                disabled={loadingId === provider.id}
                                            >
                                                <div className="flex items-center gap-3 font-bold text-xs">
                                                    <UserCheck className="h-4 w-4" />
                                                    APPROVE REQUEST
                                                </div>
                                            </DropdownMenuItem>
                                        )}

                                        <DropdownMenuItem
                                            className="rounded-xl px-4 py-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors"
                                            onClick={() => setSelectedProvider(provider)}
                                        >
                                            <div className="flex items-center gap-3 font-bold text-xs">
                                                <AlertCircle className="h-4 w-4" />
                                                VIEW DETAILS
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    {providers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic font-medium">
                                No providers or pending requests found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Dialog open={!!selectedProvider} onOpenChange={(open) => !open && setSelectedProvider(null)}>
                <DialogContent className="max-w-2xl rounded-[2.5rem] border-border/50 bg-card/90 backdrop-blur-2xl p-8 gap-8">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary text-2xl font-black italic">
                                {selectedProvider?.name?.charAt(0) || "P"}
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                                    Provider <span className="text-primary not-italic">Profile</span>
                                </DialogTitle>
                                <DialogDescription className="font-bold text-[10px] uppercase tracking-widest opacity-60 mt-2">
                                    End-to-end details from Auth and Business schemas
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Section 1: Authentication Schema */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                                <Shield className="h-4 w-4 text-primary" />
                                <h3 className="font-black uppercase tracking-tighter text-xs">Auth Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <Mail className="h-3 w-3" /> Email Address
                                    </p>
                                    <p className="font-bold text-sm">{selectedProvider?.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <Phone className="h-3 w-3" /> Phone Number
                                    </p>
                                    <p className="font-bold text-sm">{selectedProvider?.phone || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <Shield className="h-3 w-3" /> Current Role
                                    </p>
                                    <Badge variant="outline" className="rounded-full px-4 border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase italic mt-1">
                                        {selectedProvider?.role}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <Calendar className="h-3 w-3" /> Joined Date
                                    </p>
                                    <p className="font-bold text-sm">
                                        {selectedProvider?.createdAt ? format(new Date(selectedProvider.createdAt), "PPP") : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Business Schema */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                                <StoreIcon className="h-4 w-4 text-primary" />
                                <h3 className="font-black uppercase tracking-tighter text-xs">Business Profile</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <StoreIcon className="h-3 w-3" /> Store Name
                                    </p>
                                    <p className="font-bold text-sm text-primary">{selectedProvider?.providerProfile?.storeName || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <Utensils className="h-3 w-3" /> Cuisine Type
                                    </p>
                                    <p className="font-bold text-sm">{selectedProvider?.providerProfile?.cuisineType || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <MapPin className="h-3 w-3" /> Location
                                    </p>
                                    <p className="font-bold text-sm">{selectedProvider?.providerProfile?.address || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                        <FileText className="h-3 w-3" /> Description
                                    </p>
                                    <p className="font-medium text-xs text-muted-foreground leading-relaxed italic">
                                        "{selectedProvider?.providerProfile?.description || "No description provided."}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
