"use client";

import Link from "next/link";
import { FaEye, FaPencilAlt, FaPrint, FaTrash } from 'react-icons/fa';

const JobSummaryCard = ({ job, status, onDelete }) => {
  const getStatusColor = () => {
    switch (status) {
      case "new":
        return "bg-blue-50 border-blue-300";
      case "in-progress":
        return "bg-yellow-50 border-yellow-300";
      case "complete":
        return "bg-green-50 border-green-300";
      case "paid":
        return "bg-purple-50 border-purple-300";
      default:
        return "bg-gray-50 border-gray-300";
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
      <div className="flex justify-between items-start mb-2 gap-2">
        <div className="min-w-0">
          <p className="font-bold text-gray-950 text-base sm:text-lg truncate" title={job.jobAddress.jobNumber}>{job.jobAddress.jobNumber}</p>
          <address className="text-sm text-gray-700 not-italic">
            {job.jobAddress.streetNumber} {job.jobAddress.streetName}, {job.jobAddress.surburb} <br />
            {job.jobAddress.city}
          </address>
        </div>
        <span className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${
            status === "new" ? "bg-blue-600 text-white" :
            status === "in-progress" ? "bg-yellow-600 text-white" :
            status === "complete" ? "bg-green-600 text-white" :
            status === "paid" ? "bg-purple-600 text-white" :
            "bg-gray-600 text-white"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex justify-between items-end mt-auto">
        <p className="text-sm font-semibold text-gray-900">{job.date}</p>
        <p className="font-bold text-gray-950 text-base sm:text-lg">R {job.jobDetails.cost.toFixed(2)}</p>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-300">
        <Link href={`/work_orders/${job._id}`} className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors duration-200" title="View">
          <FaEye className="w-5 h-5" />
        </Link>
        <Link href={`/work_orders/${job._id}/edit`} className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors duration-200" title="Edit">
          <FaPencilAlt className="w-5 h-5" />
        </Link>
        <Link href={`/work_orders/${job._id}/print`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors duration-200" title="Print">
          <FaPrint className="w-5 h-5" />
        </Link>
        <button onClick={handleDelete} className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors duration-200 cursor-pointer" title="Delete">
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JobSummaryCard;