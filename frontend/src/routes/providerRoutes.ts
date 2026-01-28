import { Route } from "@/types";

export const providerRoutes: Route[] = [
    {
        title: "Provider Management",
        items: [
            {
                title: "Dashboard Overview",
                url: "/provider-dashboard/overview",
            },
            {
                title: "Menu Selection",
                url: "/provider-dashboard/menu",
            },
            {
                title: "Add New Meal",
                url: "/provider-dashboard/add-meal",
            },
            {
                title: "Received Orders",
                url: "/provider-dashboard/orders",
            }
        ],
    },
    {
        title: "Provider Profile",
        items: [
            {
                title: "Edit Provider Info",
                url: "/provider-dashboard/provider-settings",
            }
        ]
    }
];
