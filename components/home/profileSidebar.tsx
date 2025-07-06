import Image from "next/image";
import Link from "next/link";

export default function ProfileSidebar({
  user,
}: {
  user: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
}) {
  return (
    <div className="hidden lg:block lg:w-1/3 max-w-sm sticky top-6 self-start bg-card border border-[var(--border)] rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={user?.image || "/profile.png"}
            alt="Profile"
            fill
            className="rounded-full object-cover border border-white/20 shadow-md"
          />
        </div>
        <h2 className="text-lg font-bold truncate w-full">{user?.name}</h2>
        <span className="bg-[var(--primary)] text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
          Fullstack Developer
        </span>
        <p className="text-sm text-[var(--foreground)]/50 mb-4 leading-relaxed">
          Passionate about youth projects, collaboration, and design. Let’s
          build something great together!
        </p>
        <div className="grid grid-cols-3 gap-4 w-full text-sm text-[var(--foreground)] mb-6">
          <div className="text-center">
            <p className="font-bold text-[var(--foreground)]">12</p>
            <p>Projects</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-[var(--foreground)]">5</p>
            <p>Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-[var(--foreground)]">3</p>
            <p>Teams</p>
          </div>
        </div>
        <button className="w-full border border-dashed border-[var(--primary)] text-[var(--primary)] rounded-xl py-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white transition text-sm font-medium mb-3">
          + Create New Post
        </button>
        <Link
          href="/profile"
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/80 cursor-pointer text-white rounded-xl py-2 transition text-sm font-medium"
        >
          View My Projects
        </Link>
      </div>
    </div>
  );
}
