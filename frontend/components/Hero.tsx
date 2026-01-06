import Image from "next/image";
import {
  Search,
  ArrowRight,
  Briefcase,
  Building2,
  Users,
  PlusCircle,
  MapPin,
  Briefcase as JobIcon,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-zinc-100">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">

        {/* HERO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="md:mt-10">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-black mb-6">
              <span className="inline-flex items-center gap-4">
                Find Your
                <a
                  href="#about"
                  className="inline-flex items-center justify-center h-10 w-36 rounded-full border-2 border-red-700 hover:bg-red-700 transition group"
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

            {/* SEARCH BAR */}
            <div className="relative max-w-md">
              <div className="relative flex items-center bg-white shadow-lg rounded-full overflow-hidden">

                {/* Job Input */}
                <div className="flex items-center flex-1 px-5">
                  <JobIcon className="h-5 w-5 text-red-700 mr-3" />
                  <input
                    type="text"
                    placeholder="Job Title or Keyword"
                    className="w-full py-4 text-sm text-black placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>

                <div className="h-8 w-px bg-gray-300" />

                {/* Location Input */}
                <div className="flex items-center flex-1 px-5 pr-16">
                  <MapPin className="h-5 w-5 text-red-700 mr-3" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full py-4 text-sm text-black placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>

                {/* Search Button */}
                <button className="absolute right-1 top-1 bottom-1 w-12 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-800 transition">
                  <Search className="h-6 w-6 text-white" strokeWidth={2.8} />
                </button>

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">
            <Image
              src="/edheroimage3.png"
              alt="Job search illustration"
              width={500}
              height={600}
              priority
            />
          </div>

        </div>

        {/* 🔴 STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-28 mt-30">
          <StatCard
            icon={<Briefcase className="h-7 w-7 text-red-700" />}
            value="23,458"
            label="Live Jobs"
          />
          <StatCard
            icon={<Building2 className="h-7 w-7 text-red-700" />}
            value="60,453"
            label="Companies"
          />
          <StatCard
            icon={<Users className="h-7 w-7 text-red-700" />}
            value="3,45,870"
            label="Candidates"
          />
          <StatCard
            icon={<PlusCircle className="h-7 w-7 text-red-700" />}
            value="3,45,870"
            label="New Jobs"
          />
        </div>

      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-900 leading-tight">
          {value}
        </p>
        <p className="text-sm text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}
