    import SkeletonCard from '@/components/SkeletonCard';

    export default function Loading() {
      return (
        <main className="min-h-screen bg-black p-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 bg-zinc-800 rounded w-64 mb-8 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </main>
      );
    }