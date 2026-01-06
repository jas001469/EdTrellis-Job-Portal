"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JobCard from "@/components/JobCard";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  description: string;
  experience: string;
  createdAt: string;
  employer: {
    name: string;
    email: string;
  };
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    location: "",
    search: "",
  });

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Design",
    "Sales",
    "Customer Service",
    "Operations",
    "Other",
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

  useEffect(() => {
    fetchUser();
    fetchJobs();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.type) queryParams.append("type", filters.type);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.search) queryParams.append("search", filters.search);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs?${queryParams.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        setJobs(data.jobs);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.category, filters.type, filters.location]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApplyClick = () => {
    if (!user) {
      router.push("/auth/login");
    } else if (user.role !== "CANDIDATE") {
      alert("Only candidates can apply for jobs. Please login as a candidate.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse All Jobs</h1>
          <p className="text-gray-600 text-lg">
            {user ? (
              user.role === "CANDIDATE" ? (
                "Find and apply to your dream job"
              ) : user.role === "EMPLOYER" ? (
                "Browse job market trends and opportunities"
              ) : (
                "Discover job opportunities from top companies"
              )
            ) : (
              "Discover job opportunities from top companies. Sign up to apply!"
            )}
          </p>
        </div>

        {/* Login Prompt for Non-Candidates */}
        {user && user.role !== "CANDIDATE" && user.role !== "EMPLOYER" && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-700 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-yellow-800">
                You are logged in as {user.role.toLowerCase()}. To apply for jobs, please{" "}
                <button onClick={() => {
                  router.push("/auth/logout");
                  router.push("/auth/register?role=CANDIDATE");
                }} className="font-medium underline hover:text-yellow-900">
                  register as a candidate
                </button>
                .
              </p>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search jobs by title, company, or keyword"
                className="flex-1 border border-gray-300 rounded-xl px-6 py-3 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
              />
              <button
                type="submit"
                className="bg-red-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-800 transition"
              >
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
              >
                <option value="">All Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                placeholder="Filter by location"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:border-red-700 focus:ring-1 focus:ring-red-700 outline-none"
              />
            </div>
          </form>
        </div>

        {/* Job Count and Apply Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold">{jobs.length}</span> jobs
          </p>
          {!user && (
            <div className="text-sm text-gray-600">
              <Link href="/auth/register?role=CANDIDATE" className="text-red-700 hover:underline font-medium">
                Sign up as candidate
              </Link>{" "}
              to apply for jobs
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-4 text-red-700 hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
            <button
              onClick={() => {
                setFilters({ category: "", type: "", location: "", search: "" });
                fetchJobs();
              }}
              className="mt-4 text-red-700 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}