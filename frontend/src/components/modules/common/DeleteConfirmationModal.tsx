"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DeleteConfirmationModalProps {
    onConfirm: () => Promise<void>;
    trigger?: React.ReactNode;
    title?: string;
    description?: string;
    loading?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteConfirmationModal({
    onConfirm,
    trigger,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete the data from our servers.",
    loading = false,
    open: externalOpen,
    onOpenChange: setExternalOpen
}: DeleteConfirmationModalProps) {
    const [internalOpen, setInternalOpen] = React.useState(false);

    // Support both controlled and uncontrolled modes
    const open = externalOpen !== undefined ? externalOpen : internalOpen;
    const onOpenChange = setExternalOpen || setInternalOpen;

    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault();
        await onConfirm();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className="rounded-3xl border-border/50 bg-card/80 backdrop-blur-2xl p-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-medium text-muted-foreground text-xs uppercase tracking-widest leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-8 gap-3">
                    <AlertDialogCancel className="rounded-2xl font-black uppercase italic tracking-tighter border-border/50 hover:bg-muted transition-all px-8">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-black uppercase italic tracking-tighter px-8 transition-all shadow-xl shadow-destructive/20"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                        DELETE PERMANENTLY
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
