
"use client";

import { useState, useEffect } from "react";

export default function EarningsPage() {
  const [workOrders, setWorkOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/work_orders");
        if (response.ok) {
          const data = await response.json();
          setWorkOrders(data);
        } else {
          console.error("Failed to fetch work orders, status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch work orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkOrders();
  }, []);

  const calculateEarnings = (cost) => {
    if (typeof cost !== 'number') return 0;
    return (cost / 2) * 0.08;
  };

  const totalEarnings = workOrders.reduce((sum, order) => {
    const cost = order.jobDetails?.cost || 0;
    return sum + calculateEarnings(cost);
  }, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Loading Earnings...</p>
      </div>
    );
  }

  return (
    <main className="p-5 max-w-7xl mx-auto">
      <h1 className="font-bold mb-5 text-gray-800">Earnings Report</h1>
      
      <div className="mb-6 p-5 border rounded-xl bg-green-50 border-green-300 shadow-sm">
        <h2 className="font-bold text-green-800 text-2xl">
          Total Estimated Earnings: R {totalEarnings.toFixed(2)}
        </h2>
        <p className="text-green-700 mt-1">This is an estimation based on the formula (Cost / 2 * 0.08).</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-600">Job Number</th>
              <th className="text-left p-3 font-semibold text-gray-600">Address</th>
              <th className="text-right p-3 font-semibold text-gray-600">Cost (excl. VAT)</th>
              <th className="text-right p-3 font-semibold text-gray-600">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.length > 0 ? (
              workOrders.map((order) => {
                const cost = order.jobDetails?.cost || 0;
                const earnings = calculateEarnings(cost);
                return (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap">{order.jobAddress?.jobNumber || 'N/A'}</td>
                    <td className="p-3 whitespace-nowrap">{`${order.jobAddress?.streetNumber || ''} ${order.jobAddress?.streetName || ''}, ${order.jobAddress?.surburb || ''}`}</td>
                    <td className="p-3 whitespace-nowrap text-right">R {cost.toFixed(2)}</td>
                    <td className="p-3 whitespace-nowrap text-right font-semibold text-green-700">R {earnings.toFixed(2)}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-10 text-gray-500">No work orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
