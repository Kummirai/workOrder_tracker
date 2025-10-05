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
  const paidJobs = jobs.filter((job) => job.paid);
  const unpaidJobs = jobs.filter((job) => !job.paid);

  const totalOutstandingAmount = unpaidJobs.reduce((sum, job) => {
    const outstandingForJob = (job.jobDetails.cost / 2) * 0.08;
    return sum + outstandingForJob;
  }, 0);

  return (
    <main className="p-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <div className="flex flex-wrap justify-center mb-4 md:mb-0">
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
            className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'complete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('complete')}
          >
            Complete
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('paid')}
          >
            Paid
          </button>
        </div>
        <div className="p-2 border rounded-lg bg-red-100 border-red-400 w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-lg font-bold text-red-800">Outstanding: R {totalOutstandingAmount.toFixed(2)}</h2>
        </div>
      </div>
      <div>
        {activeTab === 'new' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">New</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newJobs.map((job) => (
                <JobSummaryCard job={job} key={job._id} status="new" />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'in-progress' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">In Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressJobs.map((job) => (
                <JobSummaryCard job={job} key={job._id} status="in-progress" />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'complete' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">Complete</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completeJobs.map((job) => (
                <JobSummaryCard job={job} key={job._id} status="complete" />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'paid' && (
          <div>
            <h2 className="text-2xl font-bold mb-5">Paid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paidJobs.map((job) => (
                <JobSummaryCard job={job} key={job._id} status="paid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
