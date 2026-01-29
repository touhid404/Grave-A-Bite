import { Route } from "@/types";
import { History, UserCircle } from "lucide-react";

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
    ],
  },
];
