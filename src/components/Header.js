"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Search } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href
      ? "text-yellow-400 font-semibold"
      : "text-white hover:text-yellow-300 transition";

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-4 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-white hover:text-yellow-400 transition"
        >
          <Clapperboard className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400" />
          <span>
            Movie<span className="text-yellow-400">Flix</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-base sm:text-lg font-medium">
          <Link href="/now-playing" className={`${isActive("/now-playing")}`}>
            Now Playing
          </Link>
          <Link href="/upcoming" className={`${isActive("/upcoming")}`}>
            Upcoming
          </Link>
          {/* Search Form */}
          <form action="/search" method="GET" className="relative">
            <input
              type="text"
              name="query"
              placeholder="Search Movies..."
              className="bg-gray-800 text-white py-2 pl-10 pr-4 rounded-lg w-44 sm:w-60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </form>
        </nav>
      </div>
    </header>
  );
}
