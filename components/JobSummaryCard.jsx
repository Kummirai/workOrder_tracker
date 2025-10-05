"use client";

const JobSummaryCardButton = () => {
  return (
    <button className="bg-gray-950 text-white p-1 rounded-md hover:bg-gray-800 hover:cursor-pointer">
      View Details
    </button>
  );
};

const JobSummaryCard = ({ job }) => {
  return (
    <div className="grid grid-cols-3 p-4 border border-gray-200 rounded-lg h-[140px]">
      <div className="col-start-1 col-end-3 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-950">{job.jobNumber}</h2>
        <address className="text-[0.8rem] text-gray-700">
          {job.streetNumber} {job.streetName}, {job.surburb} <br />
          {job.city}
        </address>
      </div>
      <div className="col-start-3 col-end-4 flex flex-col justify-between">
        <JobSummaryCardButton />
      </div>
    </div>
  );
};

export default JobSummaryCard;
