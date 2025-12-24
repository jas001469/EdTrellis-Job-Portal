import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/edfooter1.png"
            alt="EdTrellis Logo"
            width={48}
            height={48}
            priority
          />

          <span className="text-2xl font-bold">
            <span className="text-black">Ed</span>
            <span className="text-red-700">Trellis</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-800">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/about" className="hover:text-black">About Us</Link>
          <Link href="/categories" className="hover:text-black">Category</Link>
          <Link href="/employer/post-job" className="hover:text-black">
            Post a Job
          </Link>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="rounded-full border border-red-700 px-6 py-2.5 text-red-700 text-sm font-medium hover:bg-red-700 hover:text-white transition"
          >
            Log In
          </Link>

          <Link
            href="/auth/register"
            className="rounded-full bg-red-700 px-6 py-2.5 text-white text-sm font-medium hover:bg-red-800 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}
