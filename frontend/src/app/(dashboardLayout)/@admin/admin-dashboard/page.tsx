import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, BarChart3, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const adminStats = [
    { title: "Total Users", value: "1,240", icon: Users, color: "text-blue-500" },
    { title: "Active Providers", value: "45", icon: Store, color: "text-primary" },
    { title: "Total Orders", value: "8,920", icon: BarChart3, color: "text-green-500" },
    { title: "Pending Approvals", value: "3", icon: ShieldCheck, color: "text-red-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Platform <span className="text-primary italic">Oversight</span></h1>
        <p className="text-muted-foreground">Manage users, approve providers, and monitor platform performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm bg-card/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Global Order Flow</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            Analytics chart placeholder
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Provider Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            Activity feed placeholder
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
