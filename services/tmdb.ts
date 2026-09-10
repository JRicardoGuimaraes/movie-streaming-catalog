    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
    const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

    export async function getTrendingMovies(page = 1) {
      const url = BASE_URL + '/trending/movie/week?api_key=' + API_KEY + '&language=pt-BR&page=' + page;
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      return { results: data.results || [], total_pages: data.total_pages || 1 };
    }

    export async function searchMovies(query: string) {
      const url = BASE_URL + '/search/movie?api_key=' + API_KEY + '&language=pt-BR&query=' + encodeURIComponent(query);
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      return data.results || [];
    }

    export async function getMoviesByProvider(providerId: string, page = 1) {
    const url = BASE_URL + '/discover/movie?api_key=' + API_KEY + '&language=pt-BR&region=BR&with_watch_providers=' +
    providerId + '&page=' + page;
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      return { results: data.results || [], total_//pages: data.total_pages || 1 };
    }