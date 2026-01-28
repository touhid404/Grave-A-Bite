import { NextRequest, NextResponse } from "next/server";
import { customerService } from "./services/customer.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  const { data } = await customerService.getSession();

  if (data?.user) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  //* User is not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  //* Route protection based on user role
  const isAdminRoute = pathname.startsWith("/admin-dashboard");
  const isProviderRoute = pathname.startsWith("/provider-dashboard");
  const isCustomerRoute = pathname.startsWith("/dashboard");

  //* ADMIN can only access admin-dashboard
  if (userRole === Roles.admin) {
    if (isProviderRoute || isCustomerRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //* PROVIDER can only access provider-dashboard
  if (userRole === Roles.provider) {
    if (isAdminRoute || isCustomerRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //* CUSTOMER can only access dashboard
  if (userRole === Roles.customer) {
    if (isAdminRoute || isProviderRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
  ],
};
