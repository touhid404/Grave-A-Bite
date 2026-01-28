import { Route } from "@/types";
import { History, UserCircle, Gift } from "lucide-react";

export const userRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "Order History",
        url: "/dashboard/orders",
        icon: History,
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        icon: UserCircle,
      },
      {
        title: "Rewards",
        url: "/dashboard/rewards",
        icon: Gift,
      },
    ],
  },
];
