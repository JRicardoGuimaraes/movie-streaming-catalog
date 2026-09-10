    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

    async function apiFetch(endpoint: string) {
      const url = BASE_URL + endpoint + '&api_key=' + API_KEY + '&language=pt-BR';
      const res = await fetch(url, { cache: 'no-store' });
      return res.json();
    }

    export async function getTrendingMovies(page = 1) {
      const data = await apiFetch('/trending/movie/week?page=' + page);
      return { results: data.results || [], total_pages: 1 };
    }

    export async function searchMovies(query: string) {
      const data = await apiFetch('/search/movie?query=' + encodeURIComponent(query));
      return data.results || [];
    }

    export async function getMoviesByProvider(pId: string, page = 1) {
      const data = await apiFetch('/discover/movie?region=BR&with_watch_providers=' + pId + '&page=' + page);
      return { results: data.results || [], total_pages: 1 };
    }

    export async function getGenres() {
      const data = await apiFetch('/genre/movie/list');
      return data.genres || [];
    }

    export async function getMoviesByGenre(gId: string, page = 1) {
      const data = await apiFetch('/discover/movie?with_genres=' + gId + '&page=' + page);
      return { results: data.results || [], total_pages: 1 };
    }

    export async function getMovieDetails(id: string) {
      return apiFetch('/movie/' + id);
    }

    export async function getMovieWatchProviders(id: string) {
      const data = await apiFetch('/movie/' + id + '/watch/providers');
      return data.results?.BR?.flat() || [];
    }