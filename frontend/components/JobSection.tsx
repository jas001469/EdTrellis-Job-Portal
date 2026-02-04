"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "./JobCard";

interface Job {
  _id: string;
}

export default function JobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/jobs?limit=9`
      );
      const data = await res.json();

      if (data?.success && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        setError("Failed to load jobs");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-zinc-100">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our curated list of job openings from top companies.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-12 w-12 border-b-2 border-red-700 rounded-full" />
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12 text-red-600">
            {error}
          </div>
        )}

        {/* Jobs */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job as any} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-red-700 text-white px-8 py-4 rounded-full font-medium hover:bg-red-800 transition"
              >
                View All Jobs →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
