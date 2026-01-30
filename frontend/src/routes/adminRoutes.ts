import { Route } from "@/types";
import { BarChart2, Users, Grid, ShoppingBag } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Analytics",
        url: "/admin-dashboard/analytics",
        icon: BarChart2,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Providers",
        url: "/admin-dashboard/providers",
        icon: Users,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: Grid,
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
        icon: ShoppingBag,
      },
    ],
  },
];
