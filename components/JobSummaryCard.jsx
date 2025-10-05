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
      className={`grid grid-cols-3 p-4 border rounded-lg h-[140px] ${getStatusColor()}`}>
      <div className="col-start-1 col-end-3 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-950">{job.jobAddress.jobNumber}</h2>
        <address className="text-[0.8rem] text-gray-700">
          {job.jobAddress.streetNumber} {job.jobAddress.streetName}, {job.jobAddress.surburb} <br />
          {job.jobAddress.city}
        </address>
        <p className="text-[0.8rem] font-semibold text-gray-900">{job.date}</p>
      </div>
      <div className="col-start-3 col-end-4 flex flex-col justify-between">
        <h2 className="text-xl font-bold text-gray-950">R {job.jobDetails.cost}</h2>
      </div>
    </div>
  );
};

export default JobSummaryCard;
