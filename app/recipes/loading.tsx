
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function RecipesLoading() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-pulse">
      {/* HEADER SKELETON */}
      <div className="text-center py-20 px-4 relative overflow-hidden rounded-[4rem] bg-muted/20 border">
        <div className="h-20 w-80 bg-muted/40 mx-auto rounded-3xl mb-6 shadow-sm" />
        <div className="h-6 w-1/2 bg-muted/20 mx-auto rounded-full" />
      </div>

      {/* FILTER BAR SKELETON */}
      <div className="bg-muted/10 border-2 rounded-[3rem] p-8 space-y-8">
         <div className="h-16 w-full bg-muted/30 rounded-3xl" />
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-6">
            <div className="h-32 bg-muted/20 rounded-3xl shadow-inner" />
            <div className="h-32 bg-muted/20 rounded-3xl shadow-inner" />
            <div className="h-32 bg-muted/20 rounded-3xl shadow-inner" />
         </div>
      </div>

      {/* GRID SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted/10 border-2 rounded-[2.5rem] overflow-hidden shadow-sm h-[500px]">
             <div className="h-64 bg-muted/40 relative shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent shimmer-animate -translate-x-full" />
             </div>
             <div className="p-8 space-y-4">
                <div className="flex justify-between">
                   <div className="h-8 w-2/3 bg-muted/30 rounded-xl" />
                   <div className="h-5 w-16 bg-muted/20 rounded-lg" />
                </div>
                <div className="h-4 w-full bg-muted/10 rounded-full" />
                <div className="h-4 w-3/4 bg-muted/10 rounded-full" />
                <div className="mt-6 flex gap-2">
                   <div className="h-6 w-16 bg-muted/15 rounded-lg" />
                   <div className="h-6 w-16 bg-muted/15 rounded-lg" />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

