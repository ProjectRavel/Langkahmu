"use client";

import {
  Calendar,
  Home,
  Search,
  PlusSquare,
  Settings,
  User,
  LogOut,
} from "lucide-react";

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Todo's", url: "/todos", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Create", url: "/create", icon: PlusSquare },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // atau bisa return loading skeleton;

  return (
    <Sidebar variant="sidebar" className="bg-white border-r shadow-sm">
      <SidebarHeader className="justify-center mt-4 mx-auto">
        <span className="font-bold text-2xl">Langkahmu</span>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-border bg-muted/40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-all duration-150">
              <div className="relative">
                <Avatar className="h-10 w-10 ring-1 ring-ring/20">
                  <AvatarImage src="/profile.png" alt="@ravels" />
                  <AvatarFallback>RV</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div className="flex flex-col items-start justify-center overflow-hidden">
                <span className="text-sm font-semibold truncate">Ravels</span>
                <span className="text-xs text-muted-foreground truncate">
                  rafaelsumanti01@gmail.com
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="end" className="w-56 mb-2">
            <DropdownMenuLabel className="text-xs">
              Signed in as
            </DropdownMenuLabel>
            <div className="px-3 pb-2 text-sm font-medium truncate">
              rafaelsumanti01@gmail.com
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (window.location.href = "/profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => (window.location.href = "/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 hover:text-red-600"
              onClick={() => alert("Logging out...")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
