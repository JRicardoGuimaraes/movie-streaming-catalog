 export default function SkeletonCard() {
      return (
        <div className="bg-zinc-900 rounded-lg overflow-hidden animate-pulse">
          <div className="bg-zinc-800 w-full h-[300px]" />
          <div className="p-3 space-y-3">
            <div className="h-4 bg-zinc-800 rounded w-3/4" />
            <div className="h-3 bg-zinc-800 rounded w-1/2" />
          </div>
        </div>
      );
    }