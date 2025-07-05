"use client";

import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import SidebarFormPost from "./sidebar/sidebarFormPost";
import SidebarFooterProfile from "./sidebar/sidebarFooterProfile";
import SidebarItems from "./sidebar/sidebarItems";

export function AppSidebar() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="w-[240px] bg-muted animate-pulse h-screen" />;
  }

  return (
    <Sidebar variant="sidebar" className="border-r shadow-sm">
      <SidebarHeader className="justify-center mt-4 mx-auto">
        <span className="font-bold text-2xl text-foreground">Langkahmu</span>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarItems />
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
