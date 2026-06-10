"use client";
import { useEffect, useState } from "react";
import { CalendarDays, Star } from "lucide-react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ type = "now_playing", heading }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const pagesToFetch = 5;
      const promises = [];

      for (let i = 1; i <= pagesToFetch; i++) {
        promises.push(
          fetch(
            `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&region=IN&page=${i}`
          ).then((res) => res.json())
        );
      }

      const results = await Promise.all(promises);
      const allMovies = results.flatMap((result) => result.results || []);

      const filteredMovies = allMovies
        .filter((movie) => movie.original_language === "hi")
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      setMovies(filteredMovies);
    } catch (err) {
      console.error(`Error fetching ${type} movies:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <main className="p-4 sm:p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400 drop-shadow">
        {heading}
      </h1>

      {loading ? (
        <p className="text-center animate-pulse text-gray-400">
          Loading movies...
        </p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500">
          No movies found in selected language.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition-all block"
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMG_URL}${movie.poster_path}`
                    : "/no-image.jpg"
                }
                alt={movie.title}
                className="rounded mb-3 object-cover w-full h-[400px]"
              />
              <h2 className="text-lg font-semibold line-clamp-2 md:min-h-[3rem]">
                {movie.title}
              </h2>
              <p className="text-sm mt-2 text-gray-300 line-clamp-3">
                {movie.overview || "No description available."}
              </p>
              <p className="mt-2 text-sm text-gray-400 flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />{" "}
                {formatDate(movie.release_date)}
              </p>
              {movie.vote_average > 0 && (
                <p className="mt-2 font-bold text-yellow-400 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400" />{" "}
                  {movie.vote_average.toFixed(1)}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
