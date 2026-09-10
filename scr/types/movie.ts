 export interface Movie {
      id: number;
      title: string;
      poster_path: string;
      vote_average: number;
      release_date: string;
      overview: string;
    }

    export interface WatchProvider {
      provider_id: number;
      provider_name: string;
      logo_path: string;
    }