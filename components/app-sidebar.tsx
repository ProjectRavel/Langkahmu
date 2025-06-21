"use client";
import {
  Calendar,
  Home,
  Search,
  PlusSquare,
  Settings,
  User,
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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    active: true,
  },
  {
    title: "Todo's",
    url: "#",
    icon: Calendar,
    active: false,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    active: false,
  },
  {
    title: "Create",
    url: "#",
    icon: PlusSquare,
    active: false,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
    active: false,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    active: false,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="justify-center mt-4 mx-auto">
        <span className="font-bold text-2xl">Langkahmu.com</span>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size={"lg"} isActive={item.active} asChild>
                    <a href={item.url}>
                      <item.icon size={28} className="!w-7 !h-7" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => (window.location.href = "/settings")}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 hover:text-red-600"
              onClick={() => alert("Logging out...")}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
