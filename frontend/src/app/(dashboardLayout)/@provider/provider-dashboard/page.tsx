import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, ShoppingBag, DollarSign, Star } from "lucide-react";

export default function ProviderDashboardPage() {
    const stats = [
        { title: "Total Meals", value: "12", icon: Utensils, color: "text-blue-500" },
        { title: "Active Orders", value: "5", icon: ShoppingBag, color: "text-orange-500" },
        { title: "Total Revenue", value: "$1,250", icon: DollarSign, color: "text-green-500" },
        { title: "Rating", value: "4.8", icon: Star, color: "text-yellow-500" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Provider <span className="text-primary italic">Dashboard</span></h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening in your store today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
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
                <Card className="border-none shadow-sm h-[300px]">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-full pb-16">
                        No recent orders to show
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm h-[300px]">
                    <CardHeader>
                        <CardTitle>Popular Meals</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-full pb-16">
                        No popular meals to show
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
