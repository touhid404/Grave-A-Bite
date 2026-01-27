import { Route } from "@/types";

export const providerRoutes: Route[] = [
    {
        title: "Provider Management",
        items: [
            {
                title: "Dashboard Overview",
                url: "/dashboard",
            },
            {
                title: "Menu Selection",
                url: "/dashboard/menu",
            },
            {
                title: "Add New Meal",
                url: "/dashboard/add-meal",
            },
            {
                title: "Received Orders",
                url: "/dashboard/orders",
            }
        ],
    },
    {
        title: "Provider Profile",
        items: [
            {
                title: "Edit Provider Info",
                url: "/dashboard/provider-settings",
            }
        ]
    }
];
