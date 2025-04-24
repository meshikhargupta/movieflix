"use client";
import MovieGrid from "@/components/MovieGrid";
import { CalendarClock } from "lucide-react";

export default function UpcomingPage() {
  return (
    <MovieGrid
      type="upcoming"
      heading={
        <span className="flex items-center justify-center gap-2">
          <CalendarClock className="w-6 h-6 sm:w-9 sm:h-9 text-yellow-400" />
          Upcoming Movies
        </span>
      }
    />
  );
}
