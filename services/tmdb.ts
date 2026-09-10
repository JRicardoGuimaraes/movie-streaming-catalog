    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

    async function apiFetch(endpoint: string) {
      // Adicionamos { cache: 'no-store' } para forçar a Vercel a ignorar o cache
      const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&language=pt-BR`, {
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error(`Erro na API: ${res.status}`);
      }
      return res.json();
    }

    export async function getTrendingMovies(page = 1) {
      const data = await apiFetch(`/trending/movie/week?page=${page}`);
      return { results: data.results || [], total_pages: data.total_pages || 1 };
    }

    export async function searchMovies(query: string) {
      const data = await apiFetch(`/search/movie?query=${encodeURIComponent(query)}`);
      return data.results || [];
    }

    export async function getMoviesByProvider(providerId: string, page = 1) {
      const data = await apiFetch(`/discover/movie?region=BR&with_watch_providers=${providerId}&page=${page}`);
      return { results: data.results || [], total_//pages: data.total_pages || 1 };
    }

    export async function getGenres() {
      const data = await apiFetch(`/genre/movie/list`);
      return data.genres || [];
    }

    export async function getMoviesByGenre(genreId: string, page = 1) {
      const data = await apiFetch(`/discover/movie?with_genres=${genreId}&page=${page}`);
      return { results: data.//results || [], total_pages: data.total_pages || 1 };
    }

    export async function getMovieDetails(movieId: string) {
      return apiFetch(`/movie/${movieId}`);
    }

    export async function getMovieWatchProviders(movieId: string) {
      const data = await apiFetch(`/movie/${movieId}/watch/providers`);
      return data.results?.BR?.flat() || [];
    }