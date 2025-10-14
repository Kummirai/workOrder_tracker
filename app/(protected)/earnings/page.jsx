
"use client";

import { useState, useEffect } from "react";
import InputField from "@/components/InputField";

export default function EarningsPage() {
  const [workOrders, setWorkOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "paid", "unpaid"

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

  const handleMarkAsPaid = async (id) => {
    const response = await fetch(`/api/work_orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paid: true, status: 'paid' }),
    });

    if (response.ok) {
      setWorkOrders(workOrders.map(order => 
        order._id === id ? { ...order, paid: true, status: 'paid' } : order
      ));
    } else {
      console.error("Failed to mark as paid");
      alert("Failed to mark as paid. Please try again.");
    }
  };

  const calculateEarnings = (cost) => {
    if (typeof cost !== 'number') return 0;
    return (cost / 2) * 0.08;
  };

  const filteredWorkOrders = workOrders.filter(order => {
    const jobAddress = order.jobAddress || {};
    const orderDate = order.date ? new Date(order.date) : null;

    const matchesSearch = searchQuery ?
      (jobAddress.jobNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       jobAddress.streetName?.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    const matchesStartDate = startDate ? (orderDate && orderDate >= new Date(new Date(startDate).toDateString())) : true;
    const matchesEndDate = endDate ? (orderDate && orderDate <= new Date(new Date(endDate).toDateString())) : true;

    const matchesStatus = statusFilter === 'all' ? true :
      statusFilter === 'paid' ? order.paid === true :
      order.paid !== true;

    return matchesSearch && matchesStartDate && matchesEndDate && matchesStatus;
  });

  const totalEarnings = filteredWorkOrders.reduce((sum, order) => {
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
      
      <section className="mb-6 p-5 border rounded-xl bg-gray-50 border-gray-200 shadow-sm">
        <h2 className="font-semibold mb-4 text-gray-700">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            fieldtype="text"
            fieldLabel="Search by Job # or Street"
            htmlFor="search"
            placeholder="Enter search term..."
            handleChange={(e) => setSearchQuery(e.target.value)}
            inputValue={searchQuery}
          />
          <InputField
            fieldtype="date"
            fieldLabel="Start Date"
            htmlFor="startDate"
            handleChange={(e) => setStartDate(e.target.value)}
            inputValue={startDate}
          />
          <InputField
            fieldtype="date"
            fieldLabel="End Date"
            htmlFor="endDate"
            handleChange={(e) => setEndDate(e.target.value)}
            inputValue={endDate}
          />
        </div>
        <div className="mt-4">
          <span className="font-semibold text-gray-700 mr-4">Status:</span>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button type="button" onClick={() => setStatusFilter('all')} className={`px-4 py-2 text-sm font-medium ${statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'} border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700`}>
                All
            </button>
            <button type="button" onClick={() => setStatusFilter('unpaid')} className={`px-4 py-2 text-sm font-medium ${statusFilter === 'unpaid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'} border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700`}>
                Unpaid
            </button>
            <button type="button" onClick={() => setStatusFilter('paid')} className={`px-4 py-2 text-sm font-medium ${statusFilter === 'paid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'} border border-gray-200 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700`}>
                Paid
            </button>
          </div>
        </div>
      </section>

      <div className="mb-6 p-5 border rounded-xl bg-green-50 border-green-300 shadow-sm">
        <h2 className="font-bold text-green-800 text-2xl">
          Total Estimated Earnings: R {totalEarnings.toFixed(2)}
        </h2>
        <p className="text-green-700 mt-1">This is an estimation based on the formula (Cost / 2 * 0.08) for the filtered jobs.</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-600">Job Number</th>
              <th className="text-left p-3 font-semibold text-gray-600">Address</th>
              <th className="text-right p-3 font-semibold text-gray-600">Cost (excl. VAT)</th>
              <th className="text-right p-3 font-semibold text-gray-600">Earnings</th>
              <th className="text-left p-3 font-semibold text-gray-600">Status</th>
              <th className="text-center p-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkOrders.length > 0 ? (
              filteredWorkOrders.map((order) => {
                const cost = order.jobDetails?.cost || 0;
                const earnings = calculateEarnings(cost);
                return (
                  <tr key={order._id} className={`border-b border-gray-200 ${order.paid ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                    <td className="p-3 whitespace-nowrap">{order.jobAddress?.jobNumber || 'N/A'}</td>
                    <td className="p-3 whitespace-nowrap">{`${order.jobAddress?.streetNumber || ''} ${order.jobAddress?.streetName || ''}, ${order.jobAddress?.surburb || ''}`}</td>
                    <td className="p-3 whitespace-nowrap text-right">R {cost.toFixed(2)}</td>
                    <td className="p-3 whitespace-nowrap text-right font-semibold text-green-700">R {earnings.toFixed(2)}</td>
                    <td className="p-3 whitespace-nowrap">
                      {order.paid ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                              Paid
                          </span>
                      ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Unpaid
                          </span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      {!order.paid && (
                          <button
                              onClick={() => handleMarkAsPaid(order._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm font-semibold transition-colors duration-200"
                          >
                              Mark as Paid
                          </button>
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-10 text-gray-500">No work orders found for the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
