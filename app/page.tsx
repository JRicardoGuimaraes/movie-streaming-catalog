    import { getTrendingMovies, searchMovies, getMoviesByProvider, getGenres, getMoviesByGenre } from '@/services/tmdb';
    import MovieCard from '@/components/MovieCard';
    import Navbar from '@/components/Navbar';
    import GenreBar from '@/components/GenreBar';
    import Link from 'next/link';

    type SearchParams = Promise<{ q?: string, provider?: string, genre?: string, page?: string }>;

    export default async function Home(props: { searchParams: SearchParams }) {
      const searchParams = await props.searchParams;
      const { q, provider, genre, page = '1' } = searchParams;
      const currentPage = parseInt(page);

      let movies: any[] = [];
      let totalPages = 1;
      let title = "Filmes em Alta";

      try {
        if (q) {
          movies = await searchMovies(q);
          title = `Resultados para: ${q}`;
        } else if (provider) {
          const data = await getMoviesByProvider(provider, currentPage);
          movies = data.results;
          totalPages = data.total_pages;
          title = "Filmes no Streaming";
        } else if (genre) {
          const data = await getMoviesByGenre(genre, currentPage);
          movies = data.results;
          totalPages = data.total_pages;
          title = "Filmes por Gênero";
        } else {
          const data = await getTrendingMovies(currentPage);
          movies = data.results;
          totalPages = data.total_pages;
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }

      const genres = await getGenres();

      return (
        <main className="min-h-screen bg-black text-white">
          <Navbar />
          <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            {!q && <GenreBar genres={genres} />}
            {movies && movies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {movies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
                {currentPage < totalPages && (
                  <div className="flex justify-center mt-12">
                    <Link
    href={`/?page=${currentPage + 1}${q ? `&q=${q}` : ''}${provider ? `&provider=${provider}` :
    ''}${genre ? `&genre=${genre}` : ''}`}
    className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-200
    transition-colors"
                    >
                      Carregar Mais Filmes ↓
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 text-zinc-500 text-xl">Nenhum filme encontrado 🍿</div>
            )}
          </div>
        </main>
      );
    }