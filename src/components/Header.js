"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href
      ? "text-yellow-400 font-semibold"
      : "text-white hover:text-yellow-300";

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-2xl font-bold text-white">
          🎥 MovieFlix
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link href="/now-playing" className={isActive("/now-playing")}>
            Now Playing
          </Link>
          <Link href="/upcoming" className={isActive("/upcoming")}>
            Upcoming
          </Link>
        </nav>
      </div>
    </header>
  );
}
