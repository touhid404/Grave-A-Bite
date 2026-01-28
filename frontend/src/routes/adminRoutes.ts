import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Analytics",
        url: "/admin-dashboard/analytics",
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Orders",
        url: "/admin-dashboard/orders",
      },
    ],
  },
];
