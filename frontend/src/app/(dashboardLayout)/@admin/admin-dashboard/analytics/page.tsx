import { getAdminStatsAction } from "@/actions/admin.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, BarChart3, ShieldCheck, DollarSign, Activity } from "lucide-react";

export default async function AdminDashboard() {
  const { data: stats, error } = await getAdminStatsAction();

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground font-bold uppercase tracking-widest italic opacity-50">
          Failed to load intelligence data.
        </p>
      </div>
    );
  }

  const adminStats = [
    { title: "Total Operatives", value: stats.userCount.toLocaleString(), icon: Users, color: "text-blue-500", desc: "Total registered users" },
    { title: "Active Providers", value: stats.providerCount.toLocaleString(), icon: Store, color: "text-primary", desc: "Approved merchant nodes" },
    { title: "Global Revenue", value: `BDT ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", desc: "Total platform turnover" },
    { title: "Total Extractions", value: stats.orderCount.toLocaleString(), icon: BarChart3, color: "text-purple-500", desc: "Total completed orders" },
    { title: "Pending Clearance", value: stats.pendingApprovals.toLocaleString(), icon: ShieldCheck, color: "text-red-500", desc: "Providers awaiting approval" },
    { title: "System Status", value: "Operational", icon: Activity, color: "text-cyan-500", desc: "All systems online" },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black tracking-tight uppercase italic leading-none">
          Command <span className="text-primary transparent-text-outline not-italic">Intelligence</span>
        </h1>
        <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">
          Real-time strategic oversight of GrabABite operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminStats.map((stat, index) => (
          <Card key={index} className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5 group hover:border-primary/50 transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 p-8">
              <div className="space-y-1">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">{stat.title}</CardTitle>
                <p className="text-[9px] font-bold opacity-40 uppercase">{stat.desc}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-10 pt-0">
              <div className="text-4xl font-black italic tracking-tighter">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
