    import { getMovieDetails, getMovieWatchProviders } from '@/services/tmdb';
    import Link from 'next/link';

    type Params = Promise<{ id: string }>;

    export default async function MovieDetailsPage(props: { params: Params }) {
      const { id } = await props.params;

      try {
        const [movie, providers] = await Promise.all([
          getMovieDetails(id),
          getMovieWatchProviders(id),
        ]);

        // Adicionamos o tipo ': string' para o TypeScript parar de reclamar
        const IMAGE_BASE: string = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/w500';

        return (
          <main className="min-h-screen bg-zinc-950 text-white">
            <div className="relative h-[50vh] w-full">
              <img
                src={`${IMAGE_BASE.replace('w500', 'original')}${movie.backdrop_path || ''}`}
                alt={movie.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            <div className="px-8 -mt-32 relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex justify-center">
                <img
                  src={`${IMAGE_BASE}${movie.poster_path || ''}`}
                  alt={// @ts-ignore
                  movie.title}
                  className="w-64 rounded-xl shadow-2xl border-4 border-zinc-800"
                />
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-2">{movie.title}</h1>
                  <p className="text-zinc-400 text-lg">{movie.tagline}</p>
                </div>

                <div className="flex gap-4 items-center text-sm">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-zinc-400">{movie.release_date}</span>
                  <span className="text-zinc-400">{movie.runtime} min</span>
                </div>

                <p className="text-zinc-300 text-lg leading-relaxed">{movie.overview}</p>

                <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                  <h2 className="text-xl font-semibold mb-4">📺 Onde assistir no Brasil</h2>
                  {providers && providers.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      {providers.map((provider: any) => (
                        <div key={provider.provider_id} className="flex flex-col items-center gap-2">
                          <img
                            src={`${IMAGE_BASE}${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                          />
                          <span className="text-xs text-zinc-500">{provider.provider_name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 italic">Não disponível em streamings no momento.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-8 text-center">
              <Link href="/" className="text-zinc-500 hover:text-white transition-colors underline">
                ← Voltar para a home
              </Link>
            </div>
          </main>
        );
      } catch (error) {
        return <div className="min-h-screen bg-black text-white p-8">Erro ao carregar filme.</div>;
      }
    }