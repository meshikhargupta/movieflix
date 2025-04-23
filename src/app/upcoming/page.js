"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchUpcoming = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=IN&page=1`
      );
      const data = await res.json();
      const rawMovies = data.results || [];

      const sortedHindiMovies = rawMovies
        .filter((movie) => movie.original_language === "hi")
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

      setMovies(sortedHindiMovies);
    } catch (err) {
      console.error("Error fetching upcoming:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, [sortOrder]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">
        📽️ Upcoming Movies
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
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
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm mt-2 text-gray-300">{movie.overview}</p>
              <p className="mt-2 text-sm text-gray-400">
                📅 Released on: {formatDate(movie.release_date)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
