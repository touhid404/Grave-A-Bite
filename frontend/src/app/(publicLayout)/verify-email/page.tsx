"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MailCheck, XCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmailVerificationPage() {
    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(212,255,51,0.05)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(212,255,51,0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 w-full max-w-md">
                <React.Suspense fallback={
                    <Card className="border-2 rounded-[2.5rem] shadow-2xl overflow-hidden bg-card/40 backdrop-blur-md border-white/5 text-center min-h-[300px] flex items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </Card>
                }>
                    <VerificationContent />
                </React.Suspense>
            </div>
        </div>
    );
}

function VerificationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        async function verify() {
            if (!token) {
                setStatus("error");
                setMessage("Missing verification token.");
                return;
            }

            try {
                const { error } = await authClient.verifyEmail({
                    query: { token },
                });

                if (error) {
                    setStatus("error");
                    setMessage(error.message || "Failed to verify email.");
                } else {
                    setStatus("success");
                    setMessage("Your email has been successfully verified.");
                }
            } catch (err) {
                setStatus("error");
                setMessage("Something went wrong. Please try again later.");
            }
        }

        verify();
    }, [token]);

    return (
        <Card className="border-2 rounded-[2.5rem] shadow-2xl overflow-hidden bg-card/40 backdrop-blur-md border-white/5 text-center">
            <CardHeader className="pt-12 pb-6">
                <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 relative">
                    {status === "loading" && (
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    )}
                    {status === "success" && (
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                            <MailCheck className="h-12 w-12 text-primary relative z-10" />
                        </div>
                    )}
                    {status === "error" && (
                        <XCircle className="h-12 w-12 text-destructive animate-pulse" />
                    )}
                </div>

                <CardTitle className="text-4xl font-black tracking-tighter uppercase leading-none">
                    {status === "loading" && "Verifying..."}
                    {status === "success" && (
                        <>Email <span className="text-primary italic">Verified</span></>
                    )}
                    {status === "error" && (
                        <>Verification <span className="text-destructive italic">Failed</span></>
                    )}
                </CardTitle>

                <CardDescription className="text-muted-foreground font-bold text-sm mt-4 max-w-[300px] mx-auto">
                    {status === "loading" && "Hold tight! We are validating your account security."}
                    {message}
                </CardDescription>
            </CardHeader>

            <CardContent className="px-10 pb-12">
                {status === "success" && (
                    <div className="space-y-4">
                        <p className="text-xs font-medium text-muted-foreground">
                            You can now access all features of FoodHub. Welcome to the community!
                        </p>
                        <Button asChild className="w-full h-14 rounded-2xl font-black text-xl bg-primary text-black hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-[0.97] uppercase italic tracking-tighter">
                            <Link href="/login" className="flex items-center justify-center gap-2">
                                Go to Login <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-4">
                        <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-2 border-border/50 font-black text-lg hover:bg-muted transition-all active:scale-[0.97] uppercase tracking-tighter">
                            <Link href="/register">Back to Register</Link>
                        </Button>
                    </div>
                )}
            </CardContent>

            <CardFooter className="bg-muted/10 py-4 flex justify-center border-t border-border/50 text-[10px] uppercase tracking-widest font-black opacity-50">
                FoodHub Security Protocol
            </CardFooter>
        </Card>
    );
}
