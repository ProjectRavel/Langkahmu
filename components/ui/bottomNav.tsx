// components/BottomNav.tsx
"use client";

import { Home, Search, PlusSquare, Inbox, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: Home },
  { href: "/search", icon: Search },
  { href: "/create", icon: PlusSquare },
  { href: "/todo", icon: Inbox },
  { href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <ul className="flex justify-around items-center h-14">
        {navItems.map(({ href, icon: Icon }) => {
          return (
            <li key={href}>
              <Link href={href}>
                <Icon
                  className={`w-6 h-6 ${
                    pathname.startsWith(href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
