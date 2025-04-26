"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => res.json())
        .then((data) => setMovies(data.results || []));
    }
  }, [query]);

  if (!query) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Enter a movie name to search...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Search Results for "{query}"
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="bg-gray-800 p-2 rounded-lg hover:shadow-yellow-400/30 transition">
                <img
                  src={
                    movie.poster_path
                      ? `${IMG_URL}${movie.poster_path}`
                      : "/no-image.jpg"
                  }
                  alt={movie.title}
                  className="rounded object-cover w-full h-64"
                />
                <h2 className="text-sm font-semibold mt-2 line-clamp-1">
                  {movie.title}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <Suspense
        fallback={
          <p className="text-center text-gray-400">Loading search...</p>
        }
      >
        <SearchContent />
      </Suspense>
    </main>
  );
}
