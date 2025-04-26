"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Star, Clapperboard } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    }

    async function fetchTrailer() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      const trailer = data.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    }

    fetchMovieDetails();
    fetchTrailer();
  }, [id]);

  if (!movie) {
    return (
      <main className="p-6 bg-gray-900 min-h-screen text-white flex justify-center items-center">
        <p>Loading movie details...</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <img
          src={
            movie.poster_path
              ? `${IMG_URL}${movie.poster_path}`
              : "/no-image.jpg"
          }
          alt={movie.title}
          className="rounded-lg object-cover w-full md:w-80 shadow-md"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-4">
            {movie.overview || "No description available."}
          </p>

          <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-6">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> {movie.release_date}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400" />{" "}
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 uppercase">
              <Clapperboard className="w-4 h-4" /> {movie.original_language}
            </span>
          </div>

          {/* Trailer */}
          {trailerKey ? (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <p className="text-gray-500">No trailer available.</p>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/" className="text-yellow-400 underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
