export const TMDB_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response: any = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies", response.statusText);
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async ({
  movie_id,
}: {
  movie_id: string;
}): Promise<IMovieDetails> => {
  try {
    const res = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
