import { getStatsAction } from "@/actions/provider.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Utensils, Activity, ArrowUpRight, TrendingUp } from "lucide-react";

export default async function Overview() {
    const { data: stats, error } = await getStatsAction();

    if (error) {
        return (
            <div className="p-12 text-center bg-destructive/10 border border-destructive/20 rounded-[2.5rem]">
                <p className="text-destructive font-black uppercase tracking-widest text-xs">{(error as any).message}</p>
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Revenue",
            value: `BDT ${stats?.totalRevenue?.toFixed(2) || "0.00"}`,
            description: "Net earnings from delivered orders",
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            description: "Total lifetime orders received",
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            title: "Active Orders",
            value: stats?.activeOrders || 0,
            description: "Orders currently in progress",
            icon: Activity,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            title: "Meal Variety",
            value: stats?.mealsCount || 0,
            description: "Active items in your menu",
            icon: Utensils,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-700">


            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((card, idx) => (
                    <Card key={idx} className="group relative overflow-hidden rounded-[2.5rem] border-border/50 bg-card/30 backdrop-blur-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 active:scale-95 duration-500">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${card.bg} rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>
                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-center justify-between">
                                <div className={`p-3 ${card.bg} rounded-2xl transition-transform duration-500 group-hover:rotate-12`}>
                                    <card.icon className={`h-6 w-6 ${card.color}`} />
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <CardTitle className="text-4xl font-black italic tracking-tighter mb-1 transition-all group-hover:tracking-tight">
                                {card.value}
                            </CardTitle>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">{card.title}</p>
                            <p className="text-[10px] font-bold text-muted-foreground leading-relaxed">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Welcome/Promo section */}
            <div className="rounded-[3rem] bg-black text-white p-12 overflow-hidden relative group shadow-2xl shadow-black/20">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-50"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10 mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Excellence</span>
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-tight">
                            Scale your <span className="text-primary not-italic">culinary</span> empire with Grab-A-Bite
                        </h2>
                        <p className="text-white/60 font-medium text-sm leading-relaxed max-w-md">
                            Your performance is currently in the top 15% of regional partners. Keep updating your menu and maintaining fast preparation times to unlock "Gold Partner" status.
                        </p>
                    </div>
                    <div className="flex justify-end pr-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150"></div>
                            <div className="relative w-40 h-40 border-4 border-primary/30 rounded-[2rem] transform rotate-12 flex items-center justify-center bg-white/5 backdrop-blur-xl">
                                <Activity className="h-16 w-16 text-primary animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}