"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">🎬 Now Playing</h1>
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
              <h2 className="text-xl font-semibold h-[56px] overflow-hidden">
                {movie.title}
              </h2>
              <p className="text-sm mt-2 line-clamp-3 text-gray-300">
                {movie.overview}
              </p>
              <p className="mt-2 font-bold text-yellow-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
