    'use client';
    import { useRouter } from 'next/navigation';

    export default function GenreBar({ genres }: { genres: any[] }) {
      const router = useRouter();

      return (
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => router.push(`/?genre=${genre.id}`)}
    className="bg-zinc-800 text-zinc-400 px-4 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white
    transition-all whitespace-nowrap border border-zinc-700"
            >
              {genre.name}
            </button>
          ))}
        </div>
      );
    }