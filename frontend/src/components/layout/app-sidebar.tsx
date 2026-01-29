import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { userRoutes } from "@/routes/customerRoutes";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { UtensilsCrossed } from "lucide-react";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.provider:
      routes = providerRoutes;
      break;
    case Roles.customer:
      routes = userRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-border/50 px-6 py-2 h-12 flex justify-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-primary h-9 w-9 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
            <UtensilsCrossed className="h-5 w-5 text-black -rotate-3" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl italic tracking-tighter leading-none uppercase">GrabA<span className="text-primary not-italic">Bite</span></span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild tooltip={subItem.title} className="rounded-xl h-11 px-4 hover:bg-primary/10 hover:text-primary transition-all group">
                      <Link href={subItem.url} className="flex items-center gap-3">
                        {subItem.icon && <subItem.icon className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />}
                        <span className="font-bold text-xs uppercase italic tracking-tighter">{subItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
