"use client";

import { useState, useEffect } from "react";
import JobSummaryCard from "@/components/JobSummaryCard";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("new");
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`/api/work_orders?search=${searchQuery}`);
      const data = await response.json();
      setJobs(data);
    };

    const debounceTimeout = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/work_orders/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setJobs(jobs.filter((job) => job._id !== id));
      router.refresh(); // Refresh the page to reflect changes
    } else {
      console.error("Failed to delete work order");
    }
  };

  const newJobs = jobs.filter((job) => job.status === "new");
  const inProgressJobs = jobs.filter((job) => job.status === "in-progress");
  const completeJobs = jobs.filter((job) => job.status === "complete");
  const paidJobs = jobs.filter((job) => job.paid);
  const unpaidJobs = jobs.filter((job) => !job.paid);

  const totalOutstandingAmount = unpaidJobs.reduce((sum, job) => {
    const outstandingForJob = (job.jobDetails.cost / 2) * 0.08;
    return sum + outstandingForJob;
  }, 0);

  const renderJobCards = (jobList, statusType) => {
    if (jobList.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500 text-lg">
          No work orders found for this category.
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobList.map((job) => (
          <JobSummaryCard job={job} key={job._id} status={statusType} onDelete={handleDelete} />
        ))}
      </div>
    );
  };

  return (
    <main className="p-5">
      <div className="mb-5">
        <InputField
          fieldtype={"text"}
          fieldLabel={"Search by Work Order # or Street Name"}
          htmlFor={"workOrderSearch"}
          placeholder={"Enter search term..."}
          handleChange={(e) => setSearchQuery(e.target.value)}
          inputValue={searchQuery}
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <div className="flex flex-wrap justify-center mb-4 md:mb-0 gap-2">
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              activeTab === "new" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("new")}
          >
            New
          </button>
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              activeTab === "in-progress"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("in-progress")}
          >
            In Progress
          </button>
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              activeTab === "complete"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("complete")}
          >
            Complete
          </button>
          <button
            className={`px-3 py-1 rounded-md cursor-pointer ${
              activeTab === "paid" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("paid")}
          >
            Paid
          </button>
        </div>
        <div className="p-2 border rounded-lg bg-red-100 border-red-400 w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-lg font-bold text-red-800">
            Outstanding: R {totalOutstandingAmount.toFixed(2)}
          </h2>
        </div>
      </div>
      <div>
        {activeTab === "new" && renderJobCards(newJobs, "new")}
        {activeTab === "in-progress" && renderJobCards(inProgressJobs, "in-progress")}
        {activeTab === "complete" && renderJobCards(completeJobs, "complete")}
        {activeTab === "paid" && renderJobCards(paidJobs, "paid")}
      </div>
    </main>
  );
}
