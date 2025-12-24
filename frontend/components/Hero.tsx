import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-zinc-100">
      <div className="mx-auto max-w-7xl px-6 pt-30 pb-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-black mb-6">
            <span className="inline-flex items-center gap-4">
              Find Your

              {/* SCROLL ARROW */}
              <a
                href="#about"
                className="inline-flex items-center justify-center h-10 w-36 rounded-full border-2 border-red-700 cursor-pointer hover:bg-red-700 transition group"
              >
                <ArrowRight
                  className="h-5 w-5 text-red-700 group-hover:text-white"
                  strokeWidth={2.5}
                />
              </a>
            </span>

            <br />
            Dream Job With <br />
            <span className="text-red-700">EdTrellis</span>
          </h1>

          <p className="text-gray-600 mb-10 max-w-md">
            Find jobs, create trackable resumes and enrich your applications.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="relative flex items-center bg-white shadow-lg rounded-full overflow-hidden">

              <input
                type="text"
                placeholder="Job Title or Keyword"
                className="flex-1 px-6 py-4 text-sm text-black placeholder-gray-400 outline-none bg-transparent"
              />

              <div className="h-8 w-px bg-gray-300" />

              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-6 py-4 pr-20 text-sm text-black placeholder-gray-400 outline-none bg-transparent"
              />

              <button className="absolute right-1 top-1 bottom-1 w-12 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-800 transition">
                <Search className="h-6 w-6 text-white" strokeWidth={2.8} />
              </button>

            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          <div className="absolute -z-10 h-72 w-72 rounded-full bg-[#F4C430]/40 blur-3xl" />

          <Image
            src="/edheroimage3.png"
            alt="Job search illustration"
            width={500}
            height={600}
            priority
          />
        </div>

      </div>
    </section>
  );
}
