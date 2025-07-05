import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";

export default function SidebarFooterProfile() {
  const { data: session } = useSession();

  const user = session?.user;
  const router = useRouter();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-all duration-150">
          <div className="relative">
            <Avatar className="relative">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <AvatarFallback>{user?.name?.[0] ?? "?"}</AvatarFallback>
              )}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-background" />
            </Avatar>

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col items-start justify-center overflow-hidden">
            <span className="text-sm font-semibold truncate">{user?.name}</span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end" className="w-56 mb-2">
        <DropdownMenuLabel className="text-xs">Signed in as</DropdownMenuLabel>
        <div className="px-3 pb-2 text-sm font-medium truncate">
          rafaelsumanti01@gmail.com
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 hover:text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
