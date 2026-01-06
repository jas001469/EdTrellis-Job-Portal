"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EmployerJobApplications() {
  const { jobId } = useParams();

  const [job, setJob] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [jobRes, appRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/employer/applications/${jobId}`,
          { credentials: "include" }
        ),
      ]);

      const jobData = await jobRes.json();
      const appData = await appRes.json();

      if (jobData.success) setJob(jobData.job);
      if (appData.success) setApps(appData.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Job Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-4">{job.company}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><b>Location:</b> {job.location}</div>
            <div><b>Type:</b> {job.type}</div>
            <div><b>Salary:</b> {job.salary}</div>
            <div><b>Status:</b> {job.status}</div>
          </div>

          <p className="mt-4 text-gray-700">{job.description}</p>
        </div>

        {/* Applicants */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Applications ({apps.length})
          </h2>

          {apps.length === 0 ? (
            <p>No one has applied yet.</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Candidate</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Applied</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3 font-medium">
                      {a.candidate.name}
                    </td>
                    <td className="p-3">
                      {a.candidate.email}
                    </td>
                    <td className="p-3">
                      {new Date(a.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
