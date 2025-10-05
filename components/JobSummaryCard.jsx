"use client";

const JobSummaryCard = ({ job, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "new":
        return "bg-blue-100 border-blue-400";
      case "in-progress":
        return "bg-yellow-100 border-yellow-400";
      case "complete":
        return "bg-green-100 border-green-400";
      default:
        return "bg-gray-100 border-gray-400";
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
    </div>
  );
};

export default JobSummaryCard;