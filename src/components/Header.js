"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href
      ? "text-yellow-400 font-semibold"
      : "text-white hover:text-yellow-300 transition";

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="MovieFlix Home"
          className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white hover:text-yellow-400 transition"
        >
          <Clapperboard className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
          <span>
            Movie<span className="text-yellow-400">Flix</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-4 sm:gap-6 text-base sm:text-lg font-medium">
          <Link
            href="/now-playing"
            className={`${isActive(
              "/now-playing"
            )} px-2 py-1 rounded cursor-pointer`}
          >
            Now Playing
          </Link>
          <Link
            href="/upcoming"
            className={`${isActive(
              "/upcoming"
            )} px-2 py-1 rounded cursor-pointer`}
          >
            Upcoming
          </Link>
        </nav>
      </div>
    </header>
  );
}
