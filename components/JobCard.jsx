const JobCard = () => {
  return (
    <div className="grid grid-cols-3 p-4 border border-gray-200 rounded-lg h-[140px] ">
      <div className="col-start-1 col-end-3 flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-gray-950">E402 444</h2>
        <address className="text-[0.8rem] text-gray-700">
          13 Illovo lane road, Illovo <br />
          Johannesburg
        </address>
        <p className="text-[0.8rem] font-semibold text-gray-900">
          22 November 2024
        </p>
      </div>
      <div className="col-start-3 col-end-4 flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-gray-950">R12 456,00</h2>
        <button className="bg-gray-950 text-white p-1 rounded-md hover:bg-gray-800 hover:cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
