import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MOCK_CONFIGURATION,
  MOCK_GENRES,
  MOCK_MOVIES,
  MOCK_MOVIE_DETAIL,
} from "src/mock/data";

const mockBaseQuery: BaseQueryFn<
  {
    url: string;
    method?: string;
    body?: any;
    params?: any;
  },
  unknown,
  unknown
> = async (args) => {
  const url = typeof args === "string" ? args : args.url;

  console.log("Mocking Request for:", url);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (url.includes("/configuration")) {
    return { data: MOCK_CONFIGURATION };
  }

  if (url.includes("/genre/") && url.includes("/list")) {
    return { data: { genres: MOCK_GENRES } };
  }

  if (url.includes("/similar")) {
    const segments = url.split("/");
    const id = Number(segments[segments.length - 2]);
    let results = MOCK_MOVIES;

    if (!isNaN(id)) {
      const index = MOCK_MOVIES.findIndex((m) => m.id === id);
      if (index !== -1) {
        const target = MOCK_MOVIES[index];
        const others = MOCK_MOVIES.filter((m) => m.id !== id);
        results = [target, ...others];
      }
    }

    return {
      data: {
        page: 1,
        results: results,
        total_pages: 5,
        total_results: MOCK_MOVIES.length * 5,
      },
    };
  }

  // Specific movie detail (regex matches /movie/123 or /tv/123, avoiding /popular etc)
  // But be careful, /movie/popular matches this regex if we aren't careful.
  // We can check if the last segment is a number.
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];
  const isId = !isNaN(Number(lastSegment));

  if (isId) {
    const id = Number(lastSegment);
    const foundMovie = MOCK_MOVIES.find((m) => m.id === id);

    if (foundMovie) {
      // Map genre_ids to genres objects
      const genres = foundMovie.genre_ids?.map((gid) => {
        const foundGenre = MOCK_GENRES.find((g) => g.id === gid);
        return foundGenre || { id: gid, name: "unknown" };
      }) || [];

      return {
        data: {
          ...MOCK_MOVIE_DETAIL,
          ...foundMovie,
          genres, // Override genres
          id,
          videos: { results: [] },
        },
      };
    }

    // Return detail
    // We can clone the mock detail and just set the ID to match valid types
    return { data: { ...MOCK_MOVIE_DETAIL, id } };
  }




  // Fallback for discover, etc.
  let results = MOCK_MOVIES;
  if (url.includes("/popular")) {
    results = MOCK_MOVIES.slice(0, 10);
  } else if (url.includes("/top_rated")) {
    results = MOCK_MOVIES.slice(10, 17);
  } else if (url.includes("/now_playing")) {
    results = MOCK_MOVIES.slice(17, 24);
  }

  return {
    data: {
      page: 1,
      results: results,
      total_pages: 1,
      total_results: results.length,
    },
  };
};

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: mockBaseQuery,
  endpoints: (build) => ({}),
});
