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
      className={`p-4 border rounded-lg ${getStatusColor()} flex flex-col md:grid md:grid-cols-3 gap-4`}
    >
      {/* Main content */}
      <div className="md:col-start-1 md:col-end-3 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-950">{job.jobAddress.jobNumber}</h2>
        <address className="text-sm text-gray-700 not-italic">
          {job.jobAddress.streetNumber} {job.jobAddress.streetName}, {job.jobAddress.surburb} <br />
          {job.jobAddress.city}
        </address>
        <p className="text-sm font-semibold text-gray-900 mt-2 md:mt-0">{job.date}</p>
      </div>

      {/* Cost and maybe other details */}
      <div className="md:col-start-3 md:col-end-4 flex flex-col md:justify-between items-start md:items-end">
        <h2 className="text-xl font-bold text-gray-950">R {job.jobDetails.cost.toFixed(2)}</h2>
      </div>
      <div className="md:col-span-3 flex flex-wrap justify-end gap-2 mt-2">
        <Link href={`/work_orders/${job._id}`} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
          View
        </Link>
        <Link href={`/work_orders/${job._id}/edit`} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm">
          Edit
        </Link>
        <Link href={`/work_orders/${job._id}/print`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm">
          Print
        </Link>
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobSummaryCard;
