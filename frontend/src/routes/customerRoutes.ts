import { Route } from "@/types";
import { History, UserCircle, UtensilsCrossed } from "lucide-react";

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
        title: "Become a Provider",
        url: "/dashboard/become-provider",
        icon: UtensilsCrossed,
      },
    ],
  },
];
