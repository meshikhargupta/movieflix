"use client";
import { useEffect, useState } from "react";
import { CalendarDays, Star } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ type = "now_playing", heading }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState("all");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&region=IN&page=${page}`
      );
      const data = await res.json();
      const rawMovies = data.results || [];

      setTotalPages(data.total_pages || 1);

      const filteredMovies = rawMovies
        .filter((movie) =>
          language === "all" ? true : movie.original_language === language
        )
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

      setMovies(filteredMovies);
    } catch (err) {
      console.error(`Error fetching ${type} movies:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, language]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <main className="p-4 sm:p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-yellow-400 drop-shadow">
        {heading}
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-end mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <select
            value={language}
            onChange={(e) => {
              setPage(1);
              setLanguage(e.target.value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-gray-800 text-white py-2 pl-3 pr-10 rounded-lg appearance-none border border-gray-700 w-full cursor-pointer"
          >
            <option value="all">All Languages</option>
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
            <option value="kn">Kannada</option>
            <option value="mr">Marathi</option>
            <option value="bn">Bengali</option>
          </select>

          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center animate-pulse text-gray-400">
          Loading movies...
        </p>
      ) : movies.length === 0 ? (
        <p className="text-center text-gray-500">
          No movies found in selected language.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition-all"
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
              <h2 className="text-lg font-semibold line-clamp-2 min-h-[3rem]">
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
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center items-center flex-wrap gap-2 sm:gap-3 text-sm sm:text-base">
        {/* Previous Button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="p-2 bg-gray-700 hover:bg-yellow-500 hover:text-black transition disabled:opacity-30 rounded-full cursor-pointer disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= page - 2 && pageNum <= page + 2)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-10 h-10 rounded-full transition font-semibold cursor-pointer ${
                  pageNum === page
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 text-white hover:bg-gray-600"
                }`}
              >
                {pageNum}
              </button>
            );
          }
          if (
            (pageNum === page - 3 && pageNum !== 1) ||
            (pageNum === page + 3 && pageNum !== totalPages)
          ) {
            return (
              <span key={`dots-${pageNum}`} className="text-gray-400 px-2">
                ...
              </span>
            );
          }
          return null;
        })}

        {/* Next Button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 bg-gray-700 hover:bg-yellow-500 hover:text-black transition disabled:opacity-30 rounded-full cursor-pointer disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
