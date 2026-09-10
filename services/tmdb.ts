    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

    export async function getTrendingMovies(page = 1) {
      const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR&page=${page}`);
      const data = await res.json();
      return { results: data.results || [], total_pages: data.total_pages || 1 };
    }

    export async function searchMovies(query: string) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(que
    ry)}`);
      const data = await res.json();
      return data.results || [];
    }

    export async function getMoviesByProvider(providerId: string, page = 1) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&region=BR&with_watch_provide
    rs=${providerId}&page=${page}`);
      const data = await res.json();
      return { results: data.results || [], total_pages: data.total_pages || 1 };
    }

    export async function getGenres() {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
      const data = await res.json();
      return data.genres || [];
    }

    export async function getMoviesByGenre(genreId: string, page = 1) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=
    ${page}`);
      const data = await res.json();
      return { results: data.results || [], total_pages: data.total_pages || 1 };
    }

    export async function getMovieDetails(movieId: string) {
      const res = await fetch(`${BASE_URL}/movie/${movieId}?api_//key=${API_KEY}&language=pt-BR`);
      if (!res.ok) throw new Error('Erro ao buscar detalhes do filme');
      return res.json();
    }

    export async function getMovieWatchProviders(movieId: string) {
      const res = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
      const data = await res.json();
      return data.results?.BR?.flat() || [];
    }