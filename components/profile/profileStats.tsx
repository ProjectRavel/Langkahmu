import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileStats({
  projects,
  loading,
}: {
  projects: {
    _id: string;
    title: string;
    description: string;
    images?: { url: string; publicId: string }[];
  }[];
  loading: boolean;
}) {
  return (
    <div className="flex justify-around border-b pb-6 text-center text-zinc-700 dark:text-zinc-300">
      {/* Projects */}
      <div>
        {loading ? (
          <Skeleton className="h-8 w-10 mx-auto" />
        ) : (
          <p className="text-3xl font-bold">{projects.length}</p>
        )}
        <p className="text-sm mt-1">Projects</p>
      </div>

      {/* Posts */}
      <div>
        {loading ? (
          <Skeleton className="h-8 w-10 mx-auto" />
        ) : (
          <p className="text-3xl font-bold">14</p>
        )}
        <p className="text-sm mt-1">Posts</p>
      </div>

      {/* Teams */}
      <div>
        {loading ? (
          <Skeleton className="h-8 w-10 mx-auto" />
        ) : (
          <p className="text-3xl font-bold">10</p>
        )}
        <p className="text-sm mt-1">Teams</p>
      </div>
    </div>
  );
}
