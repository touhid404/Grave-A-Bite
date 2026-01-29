import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Search, Truck, Star, ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Discover",
        description: "Browse through hundreds of local providers and their unique menus.",
        icon: Search,
    },
    {
        number: "02",
        title: "Choose",
        description: "Select your favorite meals and customize them to your heart's content.",
        icon: Utensils,
    },
    {
        number: "03",
        title: "Order",
        description: "Place your order with ease and track it in real-time.",
        icon: Truck,
    },
    {
        number: "04",
        title: "Enjoy",
        description: "Receive your food hot and fresh, and experience the next level of culinary art.",
        icon: Star,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 md:py-40 bg-background relative overflow-hidden">
            {/* Background Architectural Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-foreground" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-foreground" />
            </div>

            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-[1px] bg-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">The Process</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9] italic">
                            ELEVATING THE <br />
                            <span className="text-primary italic">EXPERIENCE</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-xl font-medium max-w-md italic border-l-2 border-primary/20 pl-8">
                        GrabABite isn't just an app; it's a movement connecting visionary chefs with flavor explorers. Here's how we rewrite the rules of delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/10 -translate-y-1/2 hidden lg:block z-0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative group z-10">
                            <Card className="border-0 bg-transparent shadow-none rounded-none group-hover:-translate-y-4 transition-transform duration-700">
                                <CardContent className="p-0 space-y-8">
                                    <div className="relative">
                                        {/* Large Outlined Number */}
                                        <span className="absolute -top-12 -left-4 text-9xl font-black text-primary/[0.03] italic tracking-tighter select-none transition-all duration-700 group-hover:text-primary/[0.08] group-hover:-translate-x-4">
                                            {step.number}
                                        </span>

                                        <div className="w-20 h-20 bg-background border border-border/50 rounded-[2rem] flex items-center justify-center relative z-10 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-2xl shadow-black/5 group-hover:shadow-primary/40">
                                            <step.icon className="w-8 h-8 group-hover:text-black transition-colors duration-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pr-8">
                                        <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground text-base leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center gap-2 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Learn More</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
