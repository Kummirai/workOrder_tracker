"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const [workOrders, setWorkOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/work_orders");
        if (response.ok) {
          const data = await response.json();
          setWorkOrders(data);
        } else {
          console.error("Failed to fetch work orders");
        }
      } catch (error) {
        console.error("Failed to fetch work orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkOrders();
  }, []);

  const handleSubmitJob = async (id) => {
    const response = await fetch(`/api/work_orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'submitted' }),
    });

    if (response.ok) {
      setWorkOrders(workOrders.map(order =>
        order._id === id ? { ...order, status: 'submitted' } : order
      ));
    } else {
      console.error("Failed to submit job");
    }
  };

  const calculateTotalWithVAT = (cost) => {
    return cost * 1.15;
  };

  const submittedJobs = workOrders.filter(order => order.status === 'submitted');
  const notSubmittedJobs = workOrders.filter(order => order.status !== 'submitted');

  const totalAmountAll = workOrders.reduce((sum, order) => sum + calculateTotalWithVAT(order.jobDetails.cost), 0);
  const totalAmountSubmitted = submittedJobs.reduce((sum, order) => sum + calculateTotalWithVAT(order.jobDetails.cost), 0);
  const totalAmountNotSubmitted = notSubmittedJobs.reduce((sum, order) => sum + calculateTotalWithVAT(order.jobDetails.cost), 0);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Loading Jobs...</p>
      </div>
    );
  }

  return (
    <main className="p-5 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-gray-800">Jobs</h1>
        <button
          onClick={() => router.push('/jobs/print-submitted')}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-semibold"
          disabled={submittedJobs.length === 0}
        >
          Print Submitted Jobs ({submittedJobs.length})
        </button>
      </div>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
          <h2 className="font-semibold text-blue-800">Total Amount (All Jobs)</h2>
          <p className="font-bold text-2xl text-blue-900">R {totalAmountAll.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
          <h2 className="font-semibold text-green-800">Submitted Jobs Amount</h2>
          <p className="font-bold text-2xl text-green-900">R {totalAmountSubmitted.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
          <h2 className="font-semibold text-yellow-800">Not Submitted Jobs Amount</h2>
          <p className="font-bold text-2xl text-yellow-900">R {totalAmountNotSubmitted.toFixed(2)}</p>
        </div>
      </section>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-600">Job Number</th>
              <th className="text-left p-3 font-semibold text-gray-600">Address</th>
              <th className="text-right p-3 font-semibold text-gray-600">Total Amount (incl. VAT)</th>
              <th className="text-center p-3 font-semibold text-gray-600">Status</th>
              <th className="text-center p-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 whitespace-nowrap">{order.jobAddress.jobNumber}</td>
                <td className="p-3 whitespace-nowrap">{`${order.jobAddress.streetNumber} ${order.jobAddress.streetName}, ${order.jobAddress.surburb}`}</td>
                <td className="p-3 whitespace-nowrap text-right">R {calculateTotalWithVAT(order.jobDetails.cost).toFixed(2)}</td>
                <td className="p-3 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'submitted' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap text-center">
                  {order.status !== 'submitted' && (
                    <button
                      onClick={() => handleSubmitJob(order._id)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 text-sm font-semibold"
                    >
                      Submit Job
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}