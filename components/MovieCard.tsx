    import Link from 'next/link';

    export default function MovieCard({ movie }: { movie: any }) {
      const imageBase = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/w500';

      return (
        <Link href={`/movie/${movie.id}`} className="group">
    <div className="relative bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300
    group-hover:scale-105 group-hover:ring-2 ring-red-600 shadow-xl">
            <img
              src={`${imageBase}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto transition-opacity duration-300 group-hover:opacity-80"
            />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0
    group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-sm mb-1">{movie.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 text-xs font-bold">⭐ {movie.vote_average?.toFixed(1)}</span>
                <span className="text-zinc-300 text-[10px]">{movie.release_date?.split('-')[0]}</span>
              </div>
            </div>
          </div>
        </Link>
      );
    }