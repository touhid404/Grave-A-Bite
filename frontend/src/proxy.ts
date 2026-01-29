import { NextRequest, NextResponse } from "next/server";
import { customerService } from "@/services/customer.service";
import { Roles } from "@/constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isProvider = false;
  let isCustomer = false;

  const { data } = await customerService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isProvider = data.user.role === Roles.provider;
    isCustomer = data.user.role === Roles.customer;
  }

  // User is not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin can only visit admin-dashboard
  if (isAdmin && pathname.startsWith("/dashboard") || isAdmin && pathname.startsWith("/provider-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // Provider can only visit provider-dashboard
  if (isProvider && pathname.startsWith("/dashboard") || isProvider && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/provider-dashboard", request.url));
  }

  // Customer can only visit dashboard
  if (isCustomer && pathname.startsWith("/admin-dashboard") || isCustomer && pathname.startsWith("/provider-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
