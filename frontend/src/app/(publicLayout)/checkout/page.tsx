
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import CheckoutClient from "./CheckoutClient";
import { headers } from "next/headers";

export default async function CheckoutPage() {
    // In server components with better-auth, we use headers for session if possible, 
    // but the easiest robust way is checking session status.
    // However, better-auth session check on server might need special handling.
    // For now, let's use the standard redirect pattern.

    // We'll rely on CheckoutClient to handle the UI, 
    // but we can do a preliminary check here if we have a robust server session method.

    return (
        <main className="min-h-screen">
            <CheckoutClient />
        </main>
    );
}
