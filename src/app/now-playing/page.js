"use client";
import MovieGrid from "@/components/MovieGrid";
import { PlaySquare } from "lucide-react";

export default function NowPlayingPage() {
  return (
    <MovieGrid
      type="now_playing"
      heading={
        <span className="flex items-center justify-center gap-2">
          <PlaySquare className="w-9 h-9 text-yellow-400" />
          Now Playing
        </span>
      }
    />
  );
}
