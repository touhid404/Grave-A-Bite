import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/dashboard/admin-dashboard/analytics",
      },
      {
        title: "User Management",
        url: "/dashboard/admin-dashboard/users",
      },
      {
        title: "Category Management",
        url: "/dashboard/admin-dashboard/categories",
      },
      {
        title: "Order Management",
        url: "/dashboard/admin-dashboard/orders",
      },
    ],
  },
];
