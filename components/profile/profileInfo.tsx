import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function ProfileInfo({
  user,
  loadingUser,
}: {
  user: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
  loadingUser?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12">
      {/* Avatar */}
      <div className="lg:order-2 flex justify-center lg:justify-end">
        <div className="relative group transition-transform">
          {loadingUser ? (
            <Skeleton className="h-44 w-44 sm:h-48 sm:w-48 rounded-full relative z-10" />
          ) : (
            <Avatar
              className="h-44 w-44 sm:h-48 sm:w-48 rounded-full relative border border-border shadow-2xl shadow-zinc-800 dark:shadow-zinc-900"
              data-slot="avatar"
            >
              <Image src={user?.image ?? ""} alt={user?.name ?? ""} fill />
              <AvatarFallback className="text-2xl font-bold bg-muted">
                RP
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6 text-center lg:text-left lg:items-start">
        <div>
          {loadingUser ? (
            <>
              <Skeleton className="h-8 w-48 sm:w-64 mb-2 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-64 sm:w-80 mx-auto lg:mx-0" />
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {user?.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-500 dark:text-zinc-400">
                {user?.email}
              </p>
            </>
          )}
        </div>

        {/* Badges */}
        {loadingUser ? (
          <>
            <Skeleton className="h-6 w-48 mx-auto lg:mx-0" />
          </>
        ) : (
          <>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Suka ngoding, ngopi, dan explore hal baru ✨. Mengembangkan ide
              jadi nyata lewat code & kolaborasi.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
