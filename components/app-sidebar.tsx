"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Calendar, Home, Search, Settings, User } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import SidebarFormPost from "./sidebar/sidebarFormPost";
import SidebarFooterProfile from "./sidebar/sidebarFooterProfile";

export function AppSidebar() {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  const items = useMemo(
    () => [
      { title: "Home", url: "/home", icon: Home },
      { title: "Todo's", url: "/todos", icon: Calendar },
      { title: "Search", url: "/search", icon: Search },
      { title: "Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
    []
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="w-[240px] bg-muted animate-pulse h-screen" />;
  }

  return (
    <Sidebar variant="sidebar" className="bg-white border-r shadow-sm">
      <SidebarHeader className="justify-center mt-4 mx-auto">
        <span className="font-bold text-2xl text-foreground">Langkahmu</span>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                const buttonClasses = clsx(
                  "flex items-center gap-3 w-full px-4 py-2 text-base rounded-full transition-all hover:bg-muted hover:text-foreground cursor-pointer duration-150",
                  {
                    "text-foreground font-semibold": isActive,
                    "text-muted-foreground": !isActive,
                  }
                );

                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        size="default"
                        className={buttonClasses}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}

              <SidebarMenuItem>
                <SidebarFormPost />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-border bg-muted/40">
        <SidebarFooterProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
