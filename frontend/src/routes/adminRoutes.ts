import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
      {
        title: "Provider Approvals",
        url: "/dashboard/approvals",
      },
      {
        title: "Customer Oversight",
        url: "/dashboard/customers",
      },
    ],
  },
];
