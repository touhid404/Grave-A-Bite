"use client";

import React from "react";
import { Menu, LogOut, User, UtensilsCrossed } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import CartSheet from "../modules/cart/CartSheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://raw.githubusercontent.com/shadcn-ui/ui/main/public/favicon.ico", // Better placeholder
    alt: "GrabABite",
    title: "GrabABite",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Providers", url: "/providers" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout", { id: toastId });
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.url;
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          asChild
          className={cn(
            "relative inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition-all duration-300",
            isActive ? "text-primary" : "text-foreground"
          )}
        >
          <Link href={item.url}>
            {item.title}
            <span className={cn(
              "absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-transform duration-300 origin-left",
              isActive ? "scale-x-100" : "scale-x-0"
            )} />
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <section className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-2",
      scrolled ? "bg-background/60 backdrop-blur-3xl border-b border-border/40 shadow-sm py-1.5" : "bg-transparent",
      className
    )}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-primary/20">
                <UtensilsCrossed className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter">
                GrabA<span className="text-primary italic">Bite</span>
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <CartSheet />
            <ModeToggle />
            {isPending ? (
              <div className="h-8 w-16 animate-pulse bg-muted rounded-md" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || undefined} alt={session.user.name || "Customer"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform">
                <UtensilsCrossed className="h-6 w-6 text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                GrabA<span className="text-primary italic">Bite</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <CartSheet />
              <ModeToggle />
              {session?.user && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image || undefined} alt={session.user.name || "Customer"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(session.user.name)}
                  </AvatarFallback>
                </Avatar>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                          <UtensilsCrossed className="h-5 w-5 text-black" />
                        </div>
                        <span className="text-xl font-black tracking-tighter">
                          GrabA<span className="text-primary italic">Bite</span>
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      {session?.user ? (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded-md bg-muted">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={session.user.image || undefined} alt={session.user.name || "Customer"} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(session.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{session.user.name}</span>
                              <span className="text-xs text-muted-foreground">{session.user.email}</span>
                            </div>
                          </div>
                          <Button onClick={handleLogout} variant="destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline">
                            <Link href={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button asChild>
                            <Link href={auth.signup.url}>{auth.signup.title}</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold font-black uppercase tracking-tight italic transition-colors">
      {item.title}
    </Link>
  );
};

export { Navbar };

