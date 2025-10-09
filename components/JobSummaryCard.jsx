"use client";

import Link from "next/link";

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
        <Link href={`/work_orders/${job._id}/edit`} className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors duration-200" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18.75v-11.25A2.25 2.25 0 015.25 5.25h4.5" />
          </svg>
        </Link>
        <Link href={`/work_orders/${job._id}/print`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors duration-200" title="Print">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5V7.5A2.25 2.25 0 018.25 5.25h7.5A2.25 2.25 0 0118 7.5v9M16.5 19.5h-9V16.5h9V19.5zM18 7.5H6v9h12V7.5z" />
          </svg>
        </Link>
        <button onClick={handleDelete} className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors duration-200 cursor-pointer" title="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.74 5.653m1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.74 5.653m1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.74 5.653M12 3.75h.007v.008H12V3.75zm-6.375.007H5.25V3.75h.375v.007zm13.5 0h.375V3.75h-.375v.007z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default JobSummaryCard;