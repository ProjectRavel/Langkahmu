import Link from "next/link";
import clsx from "clsx";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Calendar, Search, User, Settings } from "lucide-react";

export default function SidebarItems() {
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

  return (
    <>
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
              <SidebarMenuButton size="default" className={buttonClasses}>
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span> 
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
