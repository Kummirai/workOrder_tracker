"use client";

import Link from "next/link";

const JobSummaryCard = ({ job, status, onDelete }) => {
  const getStatusColor = () => {
    switch (status) {
      case "new":
        return "bg-blue-100 border-blue-400";
      case "in-progress":
        return "bg-yellow-100 border-yellow-400";
      case "complete":
        return "bg-green-100 border-green-400";
      case "paid":
        return "bg-purple-100 border-purple-400";
      default:
        return "bg-gray-100 border-gray-400";
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this work order?")) {
      onDelete(job._id);
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow-md ${getStatusColor()} flex flex-col justify-between h-full`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-950">{job.jobAddress.jobNumber}</h2>
          <address className="text-sm text-gray-700 not-italic">
            {job.jobAddress.streetNumber} {job.jobAddress.streetName}, {job.jobAddress.surburb} <br />
            {job.jobAddress.city}
          </address>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === "new" ? "bg-blue-500 text-white" :
            status === "in-progress" ? "bg-yellow-500 text-white" :
            status === "complete" ? "bg-green-500 text-white" :
            status === "paid" ? "bg-purple-500 text-white" :
            "bg-gray-500 text-white"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex justify-between items-end mt-auto">
        <p className="text-sm font-semibold text-gray-900">{job.date}</p>
        <h2 className="text-lg font-bold text-gray-950">R {job.jobDetails.cost.toFixed(2)}</h2>
      </div>

      <div className="flex flex-wrap justify-end gap-2 mt-4 pt-4 border-t border-gray-300">
        <Link href={`/work_orders/${job._id}`} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm flex-grow text-center">
          View
        </Link>
        <Link href={`/work_orders/${job._id}/edit`} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm flex-grow text-center">
          Edit
        </Link>
        <Link href={`/work_orders/${job._id}/print`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm flex-grow text-center">
          Print
        </Link>
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm flex-grow text-center">
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobSummaryCard;