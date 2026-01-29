
import { foodService } from "@/services/food.service";
import ProviderCard from "@/components/modules/providers/ProviderCard";
import NewsletterFooter from "@/components/modules/homepage/NewsletterFooter";

export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
    const response = await foodService.getProviders();
    const providers = response.data?.data;
    const error = response.error;

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 mx-10">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">
                        Our <span className="text-primary transparent-text-outline">Partners</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Discover the culinary artists behind your favorite meals. From local gems to premium kitchens, explore our curated selection of providers.
                    </p>
                </div>

                {error ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-destructive/5 rounded-[40px] border-2 border-dashed border-destructive/20 text-center px-6">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-destructive">Unavailable</h3>
                        <p className="text-muted-foreground font-medium max-w-sm lowercase">Could not load partners network.</p>
                    </div>
                ) : !providers || providers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-muted/20 rounded-[40px] border-2 border-dashed border-border text-center px-6">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">No Partners Found</h3>
                        <p className="text-muted-foreground font-medium max-w-sm lowercase">We are currently expanding our network.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {providers.map((provider: any, index: number) => (
                            <div
                                key={provider.id}
                            >
                                <ProviderCard provider={provider} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-32">
                <NewsletterFooter />
            </div>
        </div>
    );
}
