import { Route } from "@/types";
import { LayoutDashboard, Menu as MenuIcon, ShoppingBag, Settings } from "lucide-react";

export const providerRoutes: Route[] = [
    {
        title: "Provider Management",
        items: [
            {
                title: "Dashboard Overview",
                url: "/provider-dashboard/overview",
                icon: LayoutDashboard,
            },
            {
                title: "Menu Selection",
                url: "/provider-dashboard/menu",
                icon: MenuIcon,
            },
            {
                title: "Received Orders",
                url: "/provider-dashboard/orders",
                icon: ShoppingBag,
            }
        ],
    },
    {
        title: "Provider Profile",
        items: [
            {
                title: "Edit Provider Info",
                url: "/provider-dashboard/settings",
                icon: Settings,
            }
        ]
    }
];
