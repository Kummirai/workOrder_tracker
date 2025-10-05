"use client";

import { useState, useEffect } from 'react';
import JobSummaryCard from "@/components/JobSummaryCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('/api/work_orders');
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const newJobs = jobs.filter((job) => job.status === "new");
  const inProgressJobs = jobs.filter((job) => job.status === "in-progress");
  const completeJobs = jobs.filter((job) => job.status === "complete");

  return (
    <main className="p-5">
      <div className="flex mb-5">
        <button
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('new')}
        >
          New
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('in-progress')}
        >
          In Progress
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'complete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('complete')}
        >
          Complete
        </button>
      </div>
      <div>
        {activeTab === 'new' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">New</h2>
            {newJobs.map((job) => (
              <JobSummaryCard job={job} key={job._id} status="new" />
            ))}
          </div>
        )}
        {activeTab === 'in-progress' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">In Progress</h2>
            {inProgressJobs.map((job) => (
              <JobSummaryCard job={job} key={job._id} status="in-progress" />
            ))}
          </div>
        )}
        {activeTab === 'complete' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">Complete</h2>
            {completeJobs.map((job) => (
              <JobSummaryCard job={job} key={job._id} status="complete" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
