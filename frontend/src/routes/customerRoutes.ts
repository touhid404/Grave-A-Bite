import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "Order History",
        url: "dashboard/orders",
      },
      {
        title: "My Profile",
        url: "dashboard/profile",
      },
      {
        title: "Rewards",
        url: "dashboard/rewards",
      },
    ],
  },
];
